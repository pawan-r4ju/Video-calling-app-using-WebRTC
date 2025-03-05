import React, { useCallback, useEffect } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/PeerContext";

function Room() {
  const { socket } = useSocket();
  const { peer, createOffer } = usePeer();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("new user joined room", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );
  const handleIncomingCall = useCallback((data)=>{
    const {from,offer} = data
    console.log('incoming call from ',from,offer);
    

  },[])
  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call",handleIncomingCall)
  }, [socket]);
  return <div>this is room</div>;
}

export default Room;
