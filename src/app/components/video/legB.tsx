
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
              console.log("is streaming in Leg B")
              if (callingVideoRef.current) {
                callingVideoRef.current.srcObject = userVideoStream;
              }

              // if (incomingStream && callingVideoRef.current) {
              //   callingVideoRef.current.srcObject = incomingStream;
              // }                
             
            });
            //call.

            call.on('close', () => {
          
               console.log("call media streaming closed retrying in leg B");
               // Attempt to reconnect
               //peerInstance.reconnect();
             });   
             
             call.on('error', () => {
       
                console.log("call streaming has error retrying in leg B");
                // Attempt to reconnect
                //peerInstance.reconnect();
              });                
          }
        });    
      };
      
      handleCall();
    }

    // if (incomingStream && callingVideoRef.current) {
    //     callingVideoRef.current.srcObject = incomingStream;
    //   }    

  }, [peerInstance, idToCall]);

  return (
    <div className='w-full leg-b'>
      <video className='w-full rounded-l-lg' playsInline ref={callingVideoRef} autoPlay muted/>
    </div>
  );
};

export default LegBPeer;
