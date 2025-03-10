import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../providers/Socket";
import { usePeer } from "../providers/PeerContext";
import ReactPlayer from "react-player";

function Room() {
  const { socket } = useSocket();
  const {
    peer,
    createOffer,
    createAnswer,
    setRemoteAns,
    sendStream,
    remoteStream,
  } = usePeer();
  const [myStream, setMyStream] = useState(null);
  const [remoteEmailId, setRemoteEmailId] = useState(null);

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("new user joined room", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
      setRemoteEmailId(emailId);
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log("incoming call from ", from, offer);
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { emailId: from, ans });
      setRemoteEmailId(from);
    },
    [createAnswer, socket]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("call got accepted", ans);

      await setRemoteAns(ans);
    },
    [setRemoteAns]
  );

  const handleNegotiation = useCallback(() => {
    const localOffer = peer.localDescription;
    socket.emit("call-user", { emailId: remoteEmailId, offer: localOffer });
  }, [peer.localDescription, remoteEmailId, socket]);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);
    // return () => {
    //   socket.off("user-joined", handleNewUserJoined);
    //   socket.off("incoming-call", handleIncomingCall);
    //   socket.off("call-accepted", handleCallAccepted);
    // };
  }, [socket, handleNewUserJoined, handleIncomingCall, handleCallAccepted]);
  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegotiation);

    return () => {
      peer.removeEventListener("negotiationneeded", handleNegotiation);
    };
  }, [handleNegotiation]);

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, [sendStream]);
  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#242424] p-4">
      <div className="bg-[#2a2a2a] rounded-lg shadow-xl p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-white mb-4">Video Room</h1>
        {remoteEmailId && (
          <h2 className="text-lg text-gray-300 mb-6 truncate">
            Connected to: <span className="font-semibold">{remoteEmailId}</span>
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative rounded-lg overflow-hidden bg-black aspect-video min-h-[200px] shadow-md">
            <ReactPlayer
              url={myStream}
              playing
              muted
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              className="absolute top-0 left-0"
            />
            <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-gray-200 text-sm">
              You
            </span>
          </div>

          <div className="relative rounded-lg overflow-hidden bg-black aspect-video min-h-[200px] shadow-md">
            <ReactPlayer
              url={remoteStream}
              playing
              width="100%"
              height="100%"
              style={{ objectFit: "cover" }}
              className="absolute top-0 left-0"
            />
            <span className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-gray-200 text-sm">
              Remote
            </span>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={e => sendStream(myStream)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              <path d="M14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            Send Video
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
