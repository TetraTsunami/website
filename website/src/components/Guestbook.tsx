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
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  // Current drawing
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [grid, setGrid] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drawingStatus, setDrawingStatus] = useState<null | 'drawing' | 'submitting' | 'success' | 'error' | 'complete'>(null);
  const [isCanvasVisible, setIsCanvasVisible] = useState(false);
  const [canvasAttached, setCanvasAttached] = useState(false);
  // Submitted drawings
  const [drawings, setDrawings] = useState<{ id: string; data: Uint8Array }[]>([]);
  const [drawingImages, setDrawingImages] = useState<{ id: string; image: string }[]>([]);

  const GRID_SIZE = 8;
  const CELL_SIZE = 300 / GRID_SIZE; // Canvas is 300x300

  // Initialize the grid with a random color
  const initializeGrid = () => {
    const randomColorIndex = Math.floor(Math.random() * colorList.length);
    const newGrid: number[] = Array(GRID_SIZE * GRID_SIZE).fill(randomColorIndex);
    setGrid(newGrid);
    return newGrid;
  };

  // Draw the grid on both main and preview canvases
  const drawGrid = (gridData: number[]) => {
    const canvas = canvasRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const previewCtx = previewCanvas?.getContext('2d');
    if (!ctx) return;
    setDrawingStatus('drawing');
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const index = y * GRID_SIZE + x;
        const colorIndex = gridData[index];
        const fillColor = colorList[colorIndex];
        // Draw on main canvas
        ctx.fillStyle = fillColor;
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE + 1, CELL_SIZE + 1); // +1 to avoid gaps
        // Draw on preview canvas if available
        if (previewCtx) {
          previewCtx.fillStyle = fillColor;
          previewCtx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE + 1, CELL_SIZE + 1);
        }
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
    initializeGrid();
  };

  // Submit the drawing
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setDrawingStatus('submitting');

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
        setDrawingStatus('success');
        // Clear the canvas after successful submission
        setTimeout(() => {
          handleClear();
          setDrawingStatus('complete');
          setIsCanvasVisible(false);
        }, 2000);
      } else {
        setDrawingStatus('error');
      }
    } catch (error) {
      setDrawingStatus('error');
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
    } else {
      setDrawingStatus(cur => (cur !== 'complete' ? null : cur));
    }
  }, [isCanvasVisible]);
  // Initialize preview when it becomes visible
  useEffect(() => {
    if (drawingStatus === 'drawing' && previewCanvasRef.current) {
      drawGrid(grid);
    }
  }, [drawingStatus]);

  // Update canvas when grid changes
  useEffect(() => {
    drawGrid(grid);
  }, [grid]);

  // fetch drawings from the server
  const fetchDrawings = async () => {
    fetch('/api/guestbook')
      .then(res => res.arrayBuffer())
      .then(buf => {
        const data = new Uint8Array(buf);
        const drawings: Array<{ id: string; data: Uint8Array }> = [];
        let startIndex = 0;

        for (let i = 0; i < data.length; i++) {
          if (data[i] === 255) {
            // Found a delimiter, extract the drawing
            const drawing = data.slice(startIndex, i);
            drawings.push({ id: `drawing-${startIndex}`, data: drawing });
            startIndex = i + 1;
          }
        }

        setDrawings(drawings.reverse());
      })
      .catch(err => {
        console.error('Error fetching drawings:', err);
      });
  };
  // Fetch drawings on component mount
  useEffect(() => {
    fetchDrawings();
  }, []);

  // Convert a drawing's data to an image URL
  const drawingToImageUrl = (drawingData: Uint8Array): string => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
      offscreenCanvasRef.current.width = GRID_SIZE * CELL_SIZE;
      offscreenCanvasRef.current.height = GRID_SIZE * CELL_SIZE;
    }
    const canvas = offscreenCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    // Draw the grid to the offscreen canvas
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const index = y * GRID_SIZE + x;
        const colorIndex = drawingData[index];
        ctx.fillStyle = colorList[colorIndex];
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE + 1, CELL_SIZE + 1);
      }
    }

    // Convert canvas to image URL
    return canvas.toDataURL('image/png');
  };

  // Convert all drawings to image URLs
  useEffect(() => {
    const images = drawings.map(drawing => ({ id: drawing.id, image: drawingToImageUrl(drawing.data) }));
    setDrawingImages(images);
  }, [drawings]);

  const submitButtonTranslateY = drawingStatus === 'submitting' ? '-2rem' : drawingStatus === 'error' || drawingStatus === 'success' ? '-4rem' : '0';
  const startingCol = 7 - (drawings.length % 8) + 1;

  return (
    <div className="mx-auto max-w-[1024px]">
      {isCanvasVisible && (
        <div className="animate-in fade-in mx-auto my-16 w-max duration-500">
          <div className={`fill-mode-forwards fade-out flex w-max gap-4`}>
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
              className={`bg-accent relative h-8 w-max cursor-pointer items-center overflow-clip rounded-full text-white transition-transform active:translate-y-0 disabled:bg-violet-300 ${drawingStatus === null && 'hover:-translate-y-1.5 hover:bg-violet-600'}`}
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
                  {drawingStatus === 'success' ? (
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
      <div className="grid grid-cols-8 items-stretch gap-2 px-8">
        <div className="relative overflow-clip" style={{ gridColumnStart: startingCol.toString() }}>
          {drawingStatus !== null && (
            <canvas
              className={`absolute inset-0 aspect-square w-full transition duration-500 ${drawingStatus !== 'success' && drawingStatus !== 'complete' ? 'blur-xs' : ''}`}
              width={300}
              height={300}
              ref={previewCanvasRef}
            />
          )}
          {drawingStatus !== 'complete' && (
            <div
              id="new-drawing"
              className={`bg-bkg fade-out fill-mode-forwards flex aspect-square h-full w-full cursor-pointer items-center justify-center transition-opacity duration-500 hover:bg-gray-100 dark:hover:bg-gray-800 ${drawingStatus === 'success' || drawingStatus === 'complete' ? 'animate-out' : ''}`}
              style={{
                opacity: drawingStatus !== null ? 0.6 : 1,
              }}
              onClick={() => setIsCanvasVisible(cur => !cur)}
            >
              <span className="text-2xl font-bold">+</span>
            </div>
          )}
        </div>
        {drawingImages.map(({ id, image }) => (
          <div className="bg-bkg aspect-square" key={id}>
            <img src={image} alt={`Drawing ${id}`} className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
