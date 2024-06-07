import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import LegAPeer from '@/app/components/video/legA';
import LegBPeer from '@/app/components/video/legB';
import { pusherClient } from '@/app/lib/pusher/pusherClient';
interface VideoCallProps {
    meetingId: string;
    isCaller: boolean;
  }

const VideoCall: React.FC<VideoCallProps> = ({ meetingId, isCaller }) => {
  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);
  const [myUniqueId, setMyUniqueId] = useState<string>("");
  const [idToCall, setIdToCall] = useState('');
 

  const [incomingStream, setIncomingStream] = useState<MediaStream | null>(null);
  const handleStreamReceived = (stream: MediaStream) => {
    setIncomingStream(stream);
  };

  const generateRandomString = () => Math.random().toString(36).substring(2);

  const triggerPusherEvent = async (meetingId: string, myUniqueId: string) => {
    try {
      const response = await fetch('/api/meetings/pusher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meetingId, myUniqueId, isCaller }),
      });
  
      if (response.ok) {
        console.log('Pusher event triggered successfully');
      } else {
        throw new Error('Failed to trigger Pusher event');
      }
    } catch (error) {
      console.error('Failed to trigger Pusher event:', error);
    }
  };

  const triggerSaveCallLegId = async (meetingId: string, callLegId: string) => {
    try {
      const response = await fetch('/api/meetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meetingId, callLegId, isCaller }),
      });
  
      if (response.ok) {
        console.log('Save Call Leg Id triggered successfully');
      } else {
        throw new Error('Failed to trigger Save Call Leg Id');
      }
    } catch (error) {
      console.error('Failed to trigger Save Call Leg Id:', error);
    }
  };  

  const findCallLegId = async () => {
    try {

      const response = await fetch('/api/meetings/' + meetingId);
      if (response.ok) {
        const data = await response.json();
        const { id, meetingId, legAId, legBId } = data;

        console.log("fetch meeting details");
        console.log(data);

        if(data && Object.keys(data).length > 0){
          if(isCaller){

            console.log("is caller");

            setMyUniqueId(legAId);
            setIdToCall(legBId);

            console.log("is caller uniqueid is " + myUniqueId);
            console.log("is caller idTocall " + idToCall )
          }
  
          if(!isCaller){
            if(legBId){
              setMyUniqueId(legBId);
            }else{
              setMyUniqueId(generateRandomString);
            }
            
            setIdToCall(legAId);
           
            console.log("isnot caller uniqueid is " + myUniqueId);
            console.log("is not caller idTocall " + idToCall )            
          }

        }else{
          console.log("creating new id");
          setMyUniqueId(generateRandomString);
        }
        
        console.log("fetch");

      } else {
        throw new Error('Failed to retrieve callLegId');
      }
    } catch (error) {
      console.error('Failed to retrieve callLegId:', error);
    }
  };  

  useEffect(() => {

    findCallLegId();

  },
  //[myUniqueId, idToCall]
  [meetingId]
);

  useEffect(() => {
            
    if(myUniqueId){
        let peer: Peer;
        if (typeof window !== 'undefined') {
            peer = new Peer(myUniqueId, {});
            setPeerInstance(peer);
            console.log("starting connection");
            console.log("uniqueid is " + myUniqueId);
            console.log("idTocall " + idToCall )            
        }
        

        // const channel = pusherClient.subscribe(meetingId);

        triggerSaveCallLegId(meetingId, myUniqueId);

        // if(isCaller){
        //     channel.bind('legACallId', (data: any) => {
        //         const { legACallId, isCaller } = data;
        //         console.log("listening leg A " + legACallId)

        //         setIdToCall(legACallId);
        //         //triggerSaveCallLegId(meetingId, legACallId);
                
        //     });

        // }

        // if(!isCaller){
        //     channel.bind('legBCallId', (data: any) => {
        //         const { legBCallId, isCaller } = data;

        //         console.log("listening leg B " + legBCallId)

        //         setIdToCall(legBCallId);

        //         //triggerSaveCallLegId(meetingId, legBCallId);
                
        //     });

        // }        
        
        // triggerPusherEvent(meetingId, myUniqueId);
        
        return () => {

            if (peer) {
              peer.destroy();
            }

            // Unsubscribe from the channel when the component unmounts
            //channel.unbind('uniqueIdBroadcast');
            // pusherClient.unsubscribe(meetingId);
            // pusherClient.disconnect();            
        };
  

    }
  
   
  }, [myUniqueId, meetingId]);

  return (
    // <div className='flex flex-col justify-center items-center'>
      <div className='relative w-full'>
      {/* <p>Your ID: {myUniqueId}</p> */}
      <LegAPeer peerInstance={peerInstance} onStreamReceived={handleStreamReceived} /> 
      <LegBPeer peerInstance={peerInstance} idToCall={idToCall}  incomingStream={incomingStream}/>
      
    </div>
  );
};

export default VideoCall;
