import React, { useState, useEffect, useCallback } from "react";
import { useSocket } from "../providers/Socket";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const { socket } = useSocket();
  // Initialize state with empty strings instead of undefined
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const joinedRoom = useCallback(
    ({ roomId }) => {
      navigate(`/room/${roomId}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("joined-room", joinedRoom);
    return () => {
      socket.off("joined-room", joinedRoom);
    };
  }, [joinedRoom, socket]);

  const handleJoinRoom = () => {
    if (!email || !roomId) return; // Add validation
    socket.emit("join-room", { emailId: email, roomId });
  };

  return (
    <div className="flex justify-center items-center border-amber-500 border w-[50%] p-2 h-48 rounded-2xl">
      <div className="flex flex-col items-center justify-center gap-5 w-[100%]">
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg border-amber-400 p-2 text-center w-[70%] focus:outline-none focus:ring-2 focus:ring-amber-300"
          required
        />
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border rounded-lg border-amber-400 p-2 text-center w-[70%] focus:outline-none focus:ring-2 focus:ring-amber-300"
          required
        />
      </div>
      <div className="w-[40%] mr-12">
        <button
          className="text-amber-100 border-amber-400 border rounded-sm h-12 w-[100%] hover:bg-amber-400 hover:text-black transition-colors duration-200"
          onClick={handleJoinRoom}
          disabled={!email || !roomId}
        >
          Enter Room
        </button>
      </div>
    </div>
  );
}

export default Homepage;