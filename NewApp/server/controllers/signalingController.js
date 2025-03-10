// server/controllers/signalingController.js
import { io } from '../app.js';

// Handle WebSocket connections
export const handleSignaling = () => {
  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Join a room
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);

      // Notify others in the room
      socket.to(roomId).emit('user-connected', userId);

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User ${userId} disconnected`);
        socket.to(roomId).emit('user-disconnected', userId);
      });
    });

    // Relay signaling data (offer, answer, ICE candidates)
    socket.on('signal', (data) => {
      const { roomId, signalData, senderId } = data;
      socket.to(roomId).emit('signal', { signalData, senderId });
    });
  });
};