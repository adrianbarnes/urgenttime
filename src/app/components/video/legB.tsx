
import Peer from 'peerjs';
import React, { useEffect, useRef, useState } from 'react';

const LegBPeer = ({ peerInstance, idToCall, incomingStream }: { peerInstance: Peer | null, idToCall: string, incomingStream: any }) => {
  const callingVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    if (peerInstance && idToCall) {
      // Code for handling call and retrieving video stream
      const handleCall = () => {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        }).then(stream => {
          const call = peerInstance?.call(idToCall, stream);
          if (call) {
            call.on('stream', userVideoStream => {
              if (callingVideoRef.current) {
                callingVideoRef.current.srcObject = userVideoStream;
              }
            });
          }
        });
      };
      
      handleCall();
    }

    if (incomingStream && callingVideoRef.current) {
        callingVideoRef.current.srcObject = incomingStream;
      }

  }, [peerInstance, idToCall]);

  return (
    <div>
      <video className='w-72' playsInline ref={callingVideoRef} autoPlay muted/>
    </div>
  );
};

export default LegBPeer;
