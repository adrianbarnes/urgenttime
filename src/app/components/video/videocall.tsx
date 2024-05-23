// PeerPage.tsx
import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import LegAPeer from './legA';
import LegBPeer from './legB';

interface VideoCallProps {
    roomId: string;
    isCaller: boolean;
  }

const VideoCall: React.FC<VideoCallProps> = ({ roomId, isCaller }) => {
  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);
  const [myUniqueId, setMyUniqueId] = useState<string>("");
  const [idToCall, setIdToCall] = useState('');

  const [incomingStream, setIncomingStream] = useState<MediaStream | null>(null);
  const handleStreamReceived = (stream: MediaStream) => {
    setIncomingStream(stream);
  };
  // ... (other code remains unchanged)
  const generateRandomString = () => Math.random().toString(36).substring(2);

  useEffect(() => {
    // ... (code for generating unique ID remains unchanged)
    //setMyUniqueId(generateRandomString);
    if(!isCaller){
     setMyUniqueId(generateRandomString);
    }

    if(isCaller){
        setMyUniqueId(roomId); 
    }
  }, []);

  useEffect(() => {
        console.log("is caller "+ isCaller)
            
        if(!isCaller){
        //     console.log("setting call id ")
            setIdToCall(roomId)
        }       

        if(myUniqueId){
            let peer: Peer;
            if (typeof window !== 'undefined') {
              peer = new Peer(myUniqueId, {});
              setPeerInstance(peer);
            }
            return () => {
              if (peer) {
                peer.destroy();
              }
            };

          }
   
        
    // if(isCaller){
    //     if(myUniqueId){
    //         let peer: Peer;
    //         if (typeof window !== 'undefined') {
    //           peer = new Peer(myUniqueId, {});
    //           setPeerInstance(peer);
    //         }
    //         return () => {
    //           if (peer) {
    //             peer.destroy();
    //           }
    //         };
    //       }       
    // }else{
    //     setIdToCall(myUniqueId)
    // }
    // if(myUniqueId){
    //   let peer: Peer;
    //   if (typeof window !== 'undefined') {
    //     peer = new Peer(myUniqueId, {});
    //     setPeerInstance(peer);
    //   }
    //   return () => {
    //     if (peer) {
    //       peer.destroy();
    //     }
    //   };
    // }
  }, [myUniqueId]);

  return (
    <div className='flex flex-col justify-center items-center p-12'>
      <p>Your ID: {myUniqueId}</p>
      <LegAPeer peerInstance={peerInstance} onStreamReceived={handleStreamReceived} /> {/* Render the LegAComponent for "legA" */}
      {/* <input className='text-black' placeholder="ID to call" value={idToCall} onChange={e => setIdToCall(e.target.value)} /> */}
      {/* <button onClick={() => handleCall()}>Call</button> */}
      <LegBPeer peerInstance={peerInstance} idToCall={idToCall}  incomingStream={incomingStream}/> {/* Render the LegBComponent for "legB" */}
    </div>
  );
};

export default VideoCall;
