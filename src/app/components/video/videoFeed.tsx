"use client"

import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { CallStatus, formatEnumValue } from '@/enum/callStatus';
import Call from '@/models/call';
import VideoCtrl from '@/app/components/video/videoCtrl';

type VideoFeedProps = {
  peerInstance: Peer | null,
  idToCall: string,
  triggerCallStatus: any,
  isCaller: boolean,
  updateCall: any,
  currentCall: Call | null;
  
}

const VideoFeed: React.FC<VideoFeedProps> = ({ peerInstance, idToCall, triggerCallStatus, isCaller, updateCall, currentCall }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const callingVideoRef = useRef<HTMLVideoElement>(null);
  const [receivedFeed, setReceivedFeed] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const [legAVideoConstraints, setLegAVideoConstraints] = useState(true);

  const mediaStreamRef = useRef<MediaStream | null>(null);

  const updateVideoConstraints = (newConstraints: any) => {
    setLegAVideoConstraints(newConstraints);
  };  

  const startStream = async (mediaStream: MediaStream | null) => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop()); // Stop the previous media stream tracks
    }

    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: legAVideoConstraints,
        // audio: true, // Include this line if needed
      });
      
      // Set up the media stream for the local video element
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
      
      // Set up the event listener for incoming call
      peerInstance?.on('call', call => {
        console.log("listen for call");
        if(mediaStream){
          call.answer(mediaStream); // Answer the call by sending the new media stream
        
          const [videoTrack] = mediaStream.getVideoTracks(); // Get the updated video track from the new media stream
  
          console.log("get videoTrack" + videoTrack);
          
          // Replace the video track being sent to the peer using the peerConnection
          call.peerConnection.getSenders()[0].replaceTrack(videoTrack);
          
          console.log("replaced track");
        }

        call.on('stream', userVideoStream => {
          
          if(callingVideoRef.current){
            callingVideoRef.current.srcObject = userVideoStream;

            callingVideoRef.current.onloadedmetadata = () => {
              callingVideoRef.current?.play();
            };
          }

          // Set receivedFeed to true when the stream is received
          setReceivedFeed(true);
        });
      });

      if (idToCall && mediaStream) {
        // Code for handling call and retrieving video stream
            const call = peerInstance?.call(idToCall, mediaStream);
            if (call) {
  
              if(videoRef.current){
                videoRef.current.srcObject = mediaStream;
                videoRef.current.onloadedmetadata = () => {
                  videoRef.current?.play();
                };
              }
  
              call.on('stream', userVideoStream => {
                
                console.log("is streaming in Leg B")
    
                // Set receivedFeed to true when the stream is received
                setReceivedFeed(true);
    
                if (callingVideoRef.current) {
                  callingVideoRef.current.srcObject = userVideoStream;
    
                  callingVideoRef.current.onloadedmetadata = () => {
                    callingVideoRef.current?.play();
                  };
                }                
               
              });
    
    
              call.on('close', () => {
                console.log("call media streaming closed, retrying in leg B");
                if (!reconnecting) {
                  setReconnecting(true);
                  setTimeout(() => {
                    //handleCall(); // Attempt to reconnect
                    setReconnecting(false);
                  }, 3000); // Example: Retry after 3 seconds
                }
              });
    
              call.on('error', () => {
                console.log("call streaming has error, retrying in leg B");
                if (!reconnecting) {
                  setReconnecting(true);
                  setTimeout(() => {
                    //handleCall(); // Attempt to reconnect
                    setReconnecting(false);
                  }, 3000); // Example: Retry after 3 seconds
                }
              });  
                          
            
            }  
        };      

    } catch (error) {
      // Handle any errors that occur during stream retrieval
      console.error("Error accessing media devices:", error);
    }
      
  };


// Modify the existing useEffect hook to handle stream updates when legAVideoConstraints change
useEffect(() => {
  let mediaStream : MediaStream | null = mediaStreamRef.current; // Declare a variable to store the media stream

  startStream(mediaStream); // Call the function to start the initial stream

  return () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop()); // Stop the media stream tracks when the component unmounts
    }
  };
}, [legAVideoConstraints, idToCall, peerInstance]);

  return (
    <div className="">
      <div className={receivedFeed ? 'md:w-32 w-16 absolute bottom-0 right-0 leg-a md:block' : 'w-full leg-a'}>
        <video className='w-full rounded-l-lg' playsInline ref={videoRef} autoPlay muted/>
      </div>

      <div className={receivedFeed ? 'w-full leg-b': 'hidden leg-b'}>
        <video className='w-full rounded-l-lg' playsInline ref={callingVideoRef} autoPlay muted/>
      </div>  
      <VideoCtrl updateVideoConstraints={updateVideoConstraints}/>
    </div>  
  );
};

export default VideoFeed;
