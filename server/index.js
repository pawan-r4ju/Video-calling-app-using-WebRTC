import express from "express";
import bodyParser from "body-parser";
import { Server, Socket } from "socket.io";

const io = new Server({
  cors: true,
});
const app = express();

app.use(bodyParser.json());
const emaimToSocketMap = new Map();
const socketToEmailmap = new Map()

io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("join-room", (data) => {
    const { emailId, roomId } = data;
    console.log(`user joined ${emailId} to room ${roomId}`);
    emaimToSocketMap.set(emailId, socket.id);
    socketToEmailmap.set(socket.id,emailId)
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
  });
  socket.on('call-user',(data)=>{
    const {emailId,offer} = data
    const fromEmail = socketToEmailmap.get(socket.id)
    const socketId = emaimToSocketMap.get(emailId);
    socket.to(socketId).emit('incoming-call',{from : fromEmail,offer})
  })
});

app.listen(8000, () => {
  console.log("server runinig at port 8000");
});
io.listen(8001, () => {
  console.log("io server running at 8001");
});
