"use client"

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const LegAPeer =  ({ peerInstance, onStreamReceived }: {peerInstance: Peer | null, onStreamReceived: any}) => {
  const myVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(stream => {
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      console.log("legA started")
      console.log("legA peer " + peerInstance);

      peerInstance?.on('call', call => {
        call.answer(stream);
        console.log("answered stream")
        call.on('stream', userVideoStream => {
          // Send the user's video stream to LegB using a callback function
          console.log("streaming to leg B")
          onStreamReceived(userVideoStream);
        });
        
      });
    });
  }, [peerInstance]);

  return (
    <div>
      <video className='w-72' playsInline ref={myVideoRef} autoPlay muted/>
    </div>
  );
};

export default LegAPeer;
