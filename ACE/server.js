import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

// Resolve __dirname safely across platforms
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Static files
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Basic routes
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/room/:roomId', (req, res) => {
  res.sendFile(path.join(publicDir, 'room.html'));
});

// Create HTTP(S) server
let server;
if (NODE_ENV === 'production') {
  // Use HTTPS in production
  const keyPath = process.env.TLS_KEY_PATH || 'certs/key.pem';
  const certPath = process.env.TLS_CERT_PATH || 'certs/cert.pem';
  let options;
  try {
    options = {
      key: fs.readFileSync(path.resolve(__dirname, keyPath)),
      cert: fs.readFileSync(path.resolve(__dirname, certPath)),
    };
  } catch (e) {
    console.warn('HTTPS certs not found, falling back to HTTP. Set TLS_KEY_PATH and TLS_CERT_PATH.');
  }
  server = options ? https.createServer(options, app) : http.createServer(app);
} else {
  server = http.createServer(app);
}

const io = new SocketIOServer(server, {
  cors: { origin: '*'}
});

// In-memory room tracking (minimal)
const rooms = new Map(); // roomId -> Set(socketId)

io.on('connection', (socket) => {
  let joinedRoomId = null;
  let displayName = null;

  socket.on('join-room', ({ roomId, name }) => {
    joinedRoomId = String(roomId);
    displayName = String(name || 'Guest');
    socket.join(joinedRoomId);

    if (!rooms.has(joinedRoomId)) rooms.set(joinedRoomId, new Set());
    const roomSet = rooms.get(joinedRoomId);

    // Send existing peers to the new client
    const existingPeers = Array.from(roomSet);
    socket.emit('existing-peers', { peers: existingPeers });

    // Add self to room and notify others
    roomSet.add(socket.id);
    socket.to(joinedRoomId).emit('peer-joined', { socketId: socket.id, name: displayName });
  });

  // Relay SDP/candidates
  socket.on('signal', ({ to, data }) => {
    if (!to) return;
    io.to(to).emit('signal', { from: socket.id, data });
  });

  // Chat relay
  socket.on('chat-message', ({ roomId, name, message, ts }) => {
    if (!roomId || !message) return;
    io.to(String(roomId)).emit('chat-message', { from: socket.id, name, message, ts: ts || Date.now() });
  });

  socket.on('disconnect', () => {
    if (joinedRoomId && rooms.has(joinedRoomId)) {
      const set = rooms.get(joinedRoomId);
      set.delete(socket.id);
      socket.to(joinedRoomId).emit('peer-left', { socketId: socket.id });
      if (set.size === 0) rooms.delete(joinedRoomId);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${NODE_ENV === 'production' ? 'https' : 'http'}://localhost:${PORT}`);
});
