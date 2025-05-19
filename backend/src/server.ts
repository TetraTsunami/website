import express from "express";
import 'dotenv/config';
import path from "path";
import fs from "fs";
import http from "http";

const port: number = Number(process.env.PORT) || 3000;
const app = express();
const server = http.createServer(app);

const drawingsFilePath = path.join(__dirname, '../drawings.bin');
const drawingsFileHandle = fs.promises.open(drawingsFilePath, 'a+');
const delimiter = new Uint8Array([255]);
const saveDrawing = async (drawing: Uint8Array) => {
  await fs.promises.appendFile(await drawingsFileHandle, drawing);
  await fs.promises.appendFile(await drawingsFileHandle, delimiter);
}

const submitDrawing = async (req: express.Request, res: express.Response) => {
  const drawing: Uint8Array = await req.body;
  await saveDrawing(drawing);
  res.status(200).send('Drawing received');
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

app.post('/api/guestbook', express.raw({ type: 'application/octet-stream' }), submitDrawing);
app.get('/api/guestbook', express.raw({ type: 'application/octet-stream' }), getDrawings);

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
