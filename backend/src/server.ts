import express from "express";
import 'dotenv/config';
import path from "path";
import fs from "fs";
import http from "http";

const port: number = Number(process.env.PORT) || 3000;
const app = express();
const server = http.createServer(app);

const drawingsFilePath = path.join(__dirname, '../drawings.bin');
const delimiter = new Uint8Array([255]);

const saveDrawing = async (drawing: Uint8Array) => {
  // Ensure drawings.bin exists, create if not (appendFile does this)
  await fs.promises.appendFile(drawingsFilePath, drawing);
  await fs.promises.appendFile(drawingsFilePath, delimiter);
}

const submitDrawing = async (req: express.Request, res: express.Response) => {
  try {
    const drawing: Uint8Array = await req.body;
    await saveDrawing(drawing);
    res.status(200).send('Drawing received');
  } catch (error) {
    console.error('Error saving drawing:', error);
    res.status(500).send('Error saving drawing');
  }
}

const getDrawings = async (req: express.Request, res: express.Response) => {
  try {
    const fileContent = await fs.promises.readFile(drawingsFilePath);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(fileContent);
  } catch (error) {
    console.error('Error retrieving drawings:', error);
    res.status(500).send('Error retrieving drawings');
  }
}

const deleteDrawing = async (req: express.Request, res: express.Response) => {
  const clientKey = req.headers['secret-key'] as string;
  const drawingIndexToDelete = parseInt(req.headers['drawing-index'] as string, 10);

  if (!clientKey || isNaN(drawingIndexToDelete) || drawingIndexToDelete < 0) {
    return res.status(400).send('Missing or invalid secret key or drawing index.');
  }

  const serverKey = process.env.GUESTBOOK_SECRET_KEY;
  if (!serverKey) {
    console.error('GUESTBOOK_SECRET_KEY is not set on the server.');
    return res.status(500).send('Server configuration error.');
  }

  if (clientKey !== serverKey) {
    return res.status(403).send('Invalid secret key.');
  }

  try {
    let fileContent;
    try {
      fileContent = await fs.promises.readFile(drawingsFilePath);
    } catch (readError: any) {
      if (readError.code === 'ENOENT') {
        return res.status(404).send('No drawings found to delete.');
      }
      throw readError; // Re-throw other read errors
    }

    if (fileContent.length === 0) {
      return res.status(404).send('Drawings file is empty.');
    }

    const drawingsData: Uint8Array[] = [];
    let startIndex = 0;
    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i] === delimiter[0]) {
        if (i > startIndex) { // Ensure non-empty drawing
          drawingsData.push(fileContent.slice(startIndex, i));
        }
        startIndex = i + 1;
      }
    }
    // Check for any data after the last delimiter, though saveDrawing should prevent this
    // if (startIndex < fileContent.length) {
    // drawingsData.push(fileContent.slice(startIndex));
    // }

    // Drawings are stored chronologically. Frontend displays newest first.
    // So, reverse to match frontend, remove, then reverse back for storage.
    const displayedDrawings = drawingsData.reverse();

    if (drawingIndexToDelete >= displayedDrawings.length) {
      return res.status(400).send('Drawing index out of bounds.');
    }

    displayedDrawings.splice(drawingIndexToDelete, 1);

    const newRawDrawings = displayedDrawings.reverse(); // Reverse back to chronological order

    if (newRawDrawings.length === 0) {
      // If all drawings are deleted, write an empty file or delete the file.
      // Writing an empty file is simpler.
      await fs.promises.writeFile(drawingsFilePath, new Uint8Array(0));
    } else {
      const newFileContentParts: Uint8Array[] = [];
      newRawDrawings.forEach((drawing, index) => {
        newFileContentParts.push(drawing);
        if (index < newRawDrawings.length) { // Add delimiter after each drawing
          newFileContentParts.push(delimiter);
        }
      });
      const finalNewContent = Buffer.concat(newFileContentParts);
      await fs.promises.writeFile(drawingsFilePath, finalNewContent);
    }

    res.status(200).send('Drawing deleted successfully.');
  } catch (error) {
    console.error('Error deleting drawing:', error);
    res.status(500).send('Error deleting drawing.');
  }
};

app.post('/api/guestbook', express.raw({ type: 'application/octet-stream' }), submitDrawing);
app.get('/api/guestbook', express.raw({ type: 'application/octet-stream' }), getDrawings);
app.delete('/api/guestbook', deleteDrawing);

if (process.env.NODE_ENV === "development") {
  const httpProxy = require("http-proxy");
  const router = express.Router();
  const astroDevServerAddr = process.env.ASTRO_DEV_SERVER || "http://localhost:4321";
  const proxy = httpProxy.createProxyServer({
      target: astroDevServerAddr,
      changeOrigin: true,
      ws: true,
    });
  router.use('/', (req, res) => proxy.web(req, res));
  server.on("upgrade", (req: any, socket: any, head: any) => {
    proxy.ws(req, socket, head);
  });
  app.use(router);
} else {
  app.use(express.static(path.join(__dirname, '../website/dist')));
}
server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
