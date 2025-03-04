import React, { useState, useEffect } from "react";
import { useSocket } from "../providers/Socket";
import { useNavigate } from "react-router-dom";
function Homepage() {
  const { socket } = useSocket();
  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();
  const navigate = useNavigate();

  const joinedRoom = ({ roomId }) => {
    navigate(`/room/${roomId}`);
  };

  useEffect(() => {
    socket.on("joined-room", joinedRoom);
  }, [socket]);
  const handleJoinRoom = () => {
    socket.emit("join-room", { emailId: email, roomId: roomId });
  };
  return (
    <div className=" flex justify-center items-center border-amber-500 border w-[50%] p-2 h-48 rounded-2xl">
      <div className="flex flex-col items-center justify-center gap-5 w-[100%]">
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg border-amber-400 p-2 text-center w-[70%]"
        />
        <input
          type="text"
          placeholder="Enter Room Code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border rounded-lg border-amber-400 p-2 text-center w-[70%]"
        />
      </div>
      <div className="w-[40%] mr-12">
        <button
          className=" text-amber-100 border-amber-400 border rounded-sm h-12 w-[100%] hover:bg-amber-400 hover:text-black "
          onClick={handleJoinRoom}
        >
          Enter Room
        </button>
      </div>
    </div>
  );
}

export default Homepage;
