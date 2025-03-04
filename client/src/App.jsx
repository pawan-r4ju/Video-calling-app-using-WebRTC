import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { SocketProvider } from "./providers/Socket";
import Room from "./pages/Room";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/room/:roomId" element={<Room/>} />
          
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
