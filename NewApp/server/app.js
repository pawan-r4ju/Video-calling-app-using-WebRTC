// server/app.js
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (update this for production)
    methods: ['GET', 'POST'],
  },
});

// Export app and io for use in other files
export { app, io };

export default server;