"use client"

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const LegAPeer =  ({ peerInstance, onStreamReceived }: {peerInstance: Peer | null, onStreamReceived: any}) => {
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const [receivedFeed, setReceivedFeed] = useState(false);

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
        call.on('stream', userVideoStream => {
          // Send the user's video stream to LegB using a callback function
          onStreamReceived(userVideoStream);
          // Set receivedFeed to true when the stream is received
          setReceivedFeed(true);
        });


          
          call.on('close', () => {
           // Set receivedFeed to true when the stream is received
           setReceivedFeed(false);           
            console.log("call media streaming closed retrying in leg A");
            // Attempt to reconnect
            //peerInstance.reconnect();
          });   
          
          call.on('error', () => {
            // Set receivedFeed to true when the stream is received
            setReceivedFeed(false);           
             console.log("call streaming has error retrying in leg A");
             // Attempt to reconnect
             //peerInstance.reconnect();
           });          
        
      });

      // peerInstance?.on('disconnected', () => {
      //   console.log("peer disconneted retrying");
      //   // Attempt to reconnect
      //   peerInstance.reconnect();
      // });          
    });
  }, [peerInstance]);

  return (
    <div className={receivedFeed ? 'w-32 absolute bottom-0 right-0 leg-a' : 'w-full leg-a'}>
      <video className='w-full rounded-l-lg' playsInline ref={myVideoRef} autoPlay muted/>
    </div>
  );
};

export default LegAPeer;
