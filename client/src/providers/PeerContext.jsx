import React,{useMemo,useContext} from "react";

const PeerContext = React.createContext(null);
export const usePeer = () => {
    const context = useContext(PeerContext);
    if (!context) {
      throw new Error("usePeer must be used within a PeerProvider");
    }
    return context;
  };

export const PeerProvider = (props) => {
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
            ],
          },
        ],
      }),
    []
  );

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };
  return (
    <PeerContext.Provider value={{peer,createOffer}}>{props.children}</PeerContext.Provider>
  );
};
