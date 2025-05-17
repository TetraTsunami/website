import { Check, CircleX, LoaderCircle, RefreshCw, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import colors from '@/assets/dnot-froget.hex?raw';

export default function Guestbook() {
  const colorList = colors
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => `#${line}`);

  // Canvas state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [grid, setGrid] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'submitting' | 'success' | 'error'>(null);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);

  const GRID_SIZE = 8;
  const CELL_SIZE = 300 / GRID_SIZE; // Canvas is 300x300

  // Initialize the grid with a random color
  const initializeGrid = () => {
    const randomColorIndex = Math.floor(Math.random() * colorList.length);
    const newGrid: number[] = Array(GRID_SIZE * GRID_SIZE).fill(randomColorIndex);
    setGrid(newGrid);
    setSelectedColorIndex(0); // Default to first color for drawing
    return newGrid;
  };

  // Draw the grid on the canvas
  const drawGrid = (gridData: number[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const index = y * GRID_SIZE + x;
        const colorIndex = gridData[index];

        ctx.fillStyle = colorList[colorIndex];
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE + 1, CELL_SIZE + 1); // +1 to avoid gaps
      }
    }
  };

  // Get grid coordinates from mouse/touch position
  const getCellFromPosition = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    const cellX = Math.floor(canvasX / CELL_SIZE);
    const cellY = Math.floor(canvasY / CELL_SIZE);

    // Ensure coordinates are within canvas bounds
    if (cellX >= 0 && cellX < GRID_SIZE && cellY >= 0 && cellY < GRID_SIZE) {
      return { x: cellX, y: cellY };
    }

    return null;
  };

  // Handle mouse/touch drawing events
  const handleDrawStart = (e: MouseEvent | TouchEvent) => {
    setIsDrawing(true);

    // Get position from event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const cell = getCellFromPosition(clientX, clientY);
    if (cell) {
      const index = cell.y * GRID_SIZE + cell.x;
      const newGrid = [...grid];
      newGrid[index] = selectedColorIndex;
      setGrid(newGrid);
      drawGrid(newGrid);
    }
  };

  const handleDrawMove = (e: MouseEvent | TouchEvent) => {
    if (!isDrawing) return;

    // Prevent scrolling on touch devices
    if ('touches' in e) e.preventDefault();

    // Get position from event
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const cell = getCellFromPosition(clientX, clientY);
    if (cell) {
      const index = cell.y * GRID_SIZE + cell.x;

      // Only update if the color is different
      if (grid[index] !== selectedColorIndex) {
        const newGrid = [...grid];
        newGrid[index] = selectedColorIndex;
        setGrid(newGrid);
        drawGrid(newGrid);
      }
    }
  };

  const handleDrawEnd = () => {
    setIsDrawing(false);
  };

  // Clear the canvas to a random color
  const [clearAngle, setClearAngle] = useState(0);
  const handleClear = () => {
    setClearAngle(prev => prev + 180);
    const newGrid = initializeGrid();
    // optimization: draw one big rectangle of the new color
    const color = newGrid[0];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = colorList[color];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSubmitStatus(null);
  };

  // Submit the drawing
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('submitting');

    try {
      // Convert grid to Uint8Array
      const drawingData = new Uint8Array(grid);

      // Send to backend
      const response = await fetch('/api/guestbook', {
        method: 'POST',
        body: drawingData,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Clear the canvas after successful submission
        setTimeout(() => {
          handleClear();
          setSubmitStatus(null);
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting drawing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize canvas when it becomes visible
  useEffect(() => {
    canvasRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (isCanvasVisible) {
      handleClear();
    }

    // Clean up event listeners on unmount
    return () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.removeEventListener('mousedown', handleDrawStart as any);
        canvas.removeEventListener('touchstart', handleDrawStart as any);
        document.removeEventListener('mouseup', handleDrawEnd);
        document.removeEventListener('touchend', handleDrawEnd);
      }
    };
  }, [isCanvasVisible]);

  // Update canvas when grid changes
  useEffect(() => {
    drawGrid(grid);
  }, [grid]);
  // theoretical list of guestbook entries
  const submitButtonTranslateY = submitStatus === null ? '0' : submitStatus === 'submitting' ? '-2rem' : '-4rem';
  const drawings = Array(10).fill(0);
  const startingCol = 7 - (drawings.length % 8);

  return (
    <div className="mx-auto max-w-[1024px]">
      {isCanvasVisible && (
        <div className="animate-in fade-in mx-auto my-16 w-max duration-500">
          <div className="flex w-max gap-4">
            <canvas
              id="canvas"
              ref={canvasRef}
              width="300"
              height="300"
              className="border-content cursor-crosshair rounded-md border-2"
              onMouseDown={handleDrawStart}
              onMouseMove={handleDrawMove}
              onMouseUp={handleDrawEnd}
              onMouseLeave={handleDrawEnd}
              onTouchStart={handleDrawStart}
              onTouchMove={handleDrawMove}
              onTouchEnd={handleDrawEnd}
            ></canvas>

            <div className="flex flex-col justify-center gap-2">
              <button
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={handleClear}
                disabled={isSubmitting}
              >
                <RefreshCw size={16} className="transition-transform duration-300" style={{ rotate: `${clearAngle}deg` }} />
              </button>
              {colorList.map((color, index) => (
                <button
                  key={color}
                  className={`h-8 w-8 cursor-pointer rounded-full border-2 ${selectedColorIndex === index ? 'border-black dark:border-white' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColorIndex(index)}
                  aria-label={`Select color ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            className="group relative mx-auto mt-4 block h-8"
            style={{ gridColumnStart: startingCol.toString() }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <div className="bg-accent absolute inset-0 h-8 w-full rounded-full" />
            <div
              className={`bg-accent relative h-8 w-max cursor-pointer items-center overflow-clip rounded-full text-white transition-transform active:translate-y-0 disabled:bg-violet-300 ${submitStatus === null && 'hover:-translate-y-1.5 hover:bg-violet-600'}`}
            >
              <div
                className="grid place-items-center gap-2 px-4 py-1 transition-transform"
                style={{ transform: `translateY(${submitButtonTranslateY})` }}
              >
                <div className="flex items-center gap-2">
                  <Send size={16} />
                  Submit
                </div>
                <div className="flex items-center gap-2">
                  <LoaderCircle size={16} className="animate-spin" />
                  Loading
                </div>
                <div className="flex items-center gap-2">
                  {submitStatus === 'success' ? (
                    <>
                      <Check size={16} />
                      Success!
                    </>
                  ) : (
                    <>
                      <CircleX size={16} />
                      Error
                    </>
                  )}
                </div>
              </div>
            </div>
          </button>
        </div>
      )}
      <div className="grid grid-cols-8 gap-2 px-8">
        <div
          id="new-drawing"
          className="bg-bkg flex aspect-square cursor-pointer items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
          style={{ gridColumnStart: startingCol.toString() }}
          onClick={() => setIsCanvasVisible(cur => !cur)}
        >
          <span className="text-2xl font-bold">+</span>
        </div>
        {drawings.map((_, i) => (
          <div className="bg-bkg aspect-square" key={i}>
            <span>Drawing {i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
