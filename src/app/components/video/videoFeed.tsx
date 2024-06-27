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

  const updateVideoConstraints = (newConstraints: any) => {
    setLegAVideoConstraints(newConstraints);
  };  

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: legAVideoConstraints,
      //audio: true,
    }).then(stream => {


      if(!isCaller){
        triggerCallStatus(formatEnumValue(CallStatus.CALL_CONNECTED));
      }

      if(videoRef.current){
        videoRef.current.srcObject = stream;
        

        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
     }
      
      peerInstance?.on('call', call => {
        call.answer(stream);
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

          call.on('close', () => {
           // Set receivedFeed to true when the stream is received
           //setReceivedFeed(true);           
            console.log("call media streaming closed retrying in leg A");
            // Attempt to reconnect
            //peerInstance.reconnect();
          });   
          
          call.on('error', () => {
            // Set receivedFeed to true when the stream is received
            //setReceivedFeed(true);           
             console.log("call streaming has error retrying in leg A");
             // Attempt to reconnect
             //peerInstance.reconnect();
           });          
        
      });

      peerInstance?.on('disconnected', () => {
        console.log("peer disconneted retrying");
        // Attempt to reconnect
        //peerInstance.reconnect();

        if(currentCall){

          currentCall.endedAt = new Date().toISOString();
          
          updateCall(currentCall)
        }       
      });          
    });
  }, [legAVideoConstraints, peerInstance]);

  useEffect(() => {
  
    if (idToCall) {
      let localStream;
      // Code for handling call and retrieving video stream
        navigator.mediaDevices.getUserMedia({
          video: true,
          //audio: true,
        }).then(stream => {
          localStream = stream;

          const call = peerInstance?.call(idToCall, stream);
          if (call) {
            if(videoRef.current){
              videoRef.current.srcObject = stream;
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
        // Update the local stream when the camera is toggled
        localStream.getTracks().forEach(track => {
          track.addEventListener('ended', () => {
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(newStream => {
                if (callingVideoRef.current) {
                  callingVideoRef.current.srcObject = newStream; // Update the srcObject for the local video
                  localStream = newStream;
                }
              })
              .catch(error => {
                console.error('Error replacing video track:', error);
              });
          });
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
          
        });    
      };

  }, [peerInstance, idToCall]);

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
