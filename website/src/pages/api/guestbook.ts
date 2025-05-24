import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

const drawingsFilePath = path.join(process.cwd(), '../backend/drawings.bin');
const delimiter = new Uint8Array([255]);

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const content = await fs.readFile(drawingsFilePath);
    const uintContent = new Uint8Array(content);
    return new Response(uintContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    console.error('Error retrieving drawings:', e);
    return new Response('Error retrieving drawings', { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const buffer = new Uint8Array(await request.arrayBuffer());
    await fs.appendFile(drawingsFilePath, buffer);
    await fs.appendFile(drawingsFilePath, delimiter);
    return new Response('Drawing received', { status: 200 });
  } catch (e) {
    console.error('Error saving drawing:', e);
    return new Response('Error saving drawing', { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  const clientKey = request.headers.get('secret-key');
  const indexHeader = request.headers.get('drawing-index');
  const drawingIndexToDelete = indexHeader ? parseInt(indexHeader, 10) : NaN;
  if (!clientKey || isNaN(drawingIndexToDelete) || drawingIndexToDelete < 0) {
    return new Response('Missing or invalid secret key or drawing index.', { status: 400 });
  }
  const serverKey = import.meta.env.GUESTBOOK_SECRET_KEY;
  if (!serverKey) {
    console.error('GUESTBOOK_SECRET_KEY not set');
    return new Response('Server configuration error.', { status: 500 });
  }
  if (clientKey !== serverKey) {
    return new Response('Invalid secret key.', { status: 403 });
  }
  try {
    let fileContent: Buffer;
    try {
      fileContent = await fs.readFile(drawingsFilePath);
    } catch (err: any) {
      if (err.code === 'ENOENT') {
        return new Response('No drawings found to delete.', { status: 404 });
      }
      throw err;
    }
    if (fileContent.length === 0) {
      return new Response('Drawings file is empty.', { status: 404 });
    }

    const drawingsData: Buffer[] = [];
    let startIndex = 0;
    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i] === delimiter[0]) {
        if (i > startIndex) {
          drawingsData.push(fileContent.slice(startIndex, i));
        }
        startIndex = i + 1;
      }
    }
    const displayed = drawingsData.slice().reverse();
    if (drawingIndexToDelete >= displayed.length) {
      return new Response('Drawing index out of bounds.', { status: 400 });
    }
    displayed.splice(drawingIndexToDelete, 1);
    const newRaw = displayed.reverse();

    if (newRaw.length === 0) {
      await fs.writeFile(drawingsFilePath, Buffer.alloc(0));
    } else {
      const parts: Buffer[] = [];
      newRaw.forEach(d => {
        parts.push(d);
        parts.push(Buffer.from(delimiter));
      });
      const finalBuffer = Buffer.concat(parts);
      await fs.writeFile(drawingsFilePath, finalBuffer);
    }
    return new Response('Drawing deleted successfully.', { status: 200 });
  } catch (e) {
    console.error('Error deleting drawing:', e);
    return new Response('Error deleting drawing.', { status: 500 });
  }
};
