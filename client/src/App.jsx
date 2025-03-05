import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { SocketProvider } from "./providers/Socket";
import Room from "./pages/Room";
import { PeerProvider } from "./providers/PeerContext";

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
