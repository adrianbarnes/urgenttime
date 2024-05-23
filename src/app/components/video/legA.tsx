"use client"

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const LegAPeer =  ({ peerInstance }: {peerInstance: Peer | null}) => {
  const myVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(stream => {
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      peerInstance?.on('call', call => {
        call.answer(stream);
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
