
import Peer from 'peerjs';
import React, { useEffect, useRef, useState } from 'react';

const LegBPeer = ({ peerInstance, idToCall, incomingStream }: { peerInstance: Peer | null, idToCall: string, incomingStream: any }) => {
  const callingVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log("loaded LegB")
    console.log("callId "+ idToCall);
    console.log("peer instance "+ peerInstance);

    if (peerInstance && idToCall) {
        console.log("starting call for B");
      // Code for handling call and retrieving video stream
      const handleCall = () => {
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        }).then(stream => {
          const call = peerInstance?.call(idToCall, stream);
          console.log("listening stream on call for B");
          if (call) {
            console.log("listen starting call for B");
            call.on('stream', userVideoStream => {
              if (callingVideoRef.current) {
                callingVideoRef.current.srcObject = userVideoStream;
              }
            });
          }
        });
      };
      console.log("Leg B working");
      
      handleCall();
    }

    console.log("incoming stream is " + incomingStream)

    if (incomingStream && callingVideoRef.current) {
        console.log("Receiving Stream from A");
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
