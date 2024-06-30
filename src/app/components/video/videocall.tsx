import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import { pusherClient } from '@/app/lib/pusher/pusherClient';
import VideoFeed from '@/app/components/video/videoFeed';
import Call from '@/models/call';
import { Channel } from 'pusher-js';
interface VideoCallProps {
    meetingId: string;
    isCaller: boolean;
    handlePeerInstance: any;
    currentCall: Call | null;
    channel: Channel | null;
    triggerCallStatus: any;
    updateCall: any;
  }

const VideoCall: React.FC<VideoCallProps> = ({ meetingId, isCaller, channel, handlePeerInstance, currentCall, triggerCallStatus, updateCall }) => {
  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);
  const [myUniqueId, setMyUniqueId] = useState<string | null>(null);
  const [idToCall, setIdToCall] = useState('');
 
  const generateRandomString = () => Math.random().toString(36).substring(2);

  const triggerMeetingId = async (myUniqueId: string) => {
    try {
      const response = await fetch(`/api/meetings/${meetingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ myUniqueId, isCaller }),
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

  useEffect(() => {
    setMyUniqueId(generateRandomString);

  },[]);  

  useEffect(() => {
    if(peerInstance){
      peerInstance.on('open', (peerId) => {

        console.log("peer connected on " + peerId);
  
        if(isCaller && currentCall){
          if(!currentCall.startedAt){
            currentCall.startedAt = new Date().toISOString();
          }
  
          updateCall(currentCall)
        }

        if(myUniqueId){
          triggerMeetingId( myUniqueId);
        }
  
        
      });
    }


  },[peerInstance, currentCall]);  


  useEffect(() => {     
    if(myUniqueId){
        let peer: Peer;
        if (typeof window !== 'undefined') {
          
            peer = new Peer(myUniqueId,{
              config: {'iceServers': [
              
                { url: "stun:stun.l.google.com:19302" },
                { url: "stun:stun1.l.google.com:19302" },
                { url: "stun:stun2.l.google.com:19302" },
                { url: "stun:stun3.l.google.com:19302" },
                { url: "stun:stun4.l.google.com:19302" },
              ]}
            });

            setPeerInstance(peer);
            handlePeerInstance(peer);

            peer?.on('disconnected', function() {
              console.log("peer destroyed");
  
              });
  
            peer?.on('close', function() {
              console.log("peer closed");
              
              });              
                  
        }


        if(isCaller){
            channel?.bind('legACallId', (data: any) => {
                const { legCallId, isCaller } = data;
                console.log("Received in leg A " + legCallId)
  

                // if(idToCall != legCallId){
                //   triggerMeetingId( myUniqueId);
                // }

                setIdToCall(legCallId);
                
            });

        }

        if(!isCaller){
            channel?.bind('legBCallId', (data: any) => {
                const { legCallId, isCaller } = data;
                console.log("Received in leg B " + legCallId)             

                // if(idToCall != legCallId){
                //   triggerMeetingId( myUniqueId);
                // } 
                
                setIdToCall(legCallId);
                
            });

        }    
        
        return () => {
            if (peer) {
              peer.destroy();
            }
            // Unsubscribe from the channel when the component unmounts
            if (channel?.subscribed) {
              channel?.unbind('legBCallId');
              channel?.unbind('legACallId');  
            }         
        };
  
    }
  
  }, [myUniqueId, meetingId]);

  return (
      <div className='relative w-full'>
      <VideoFeed peerInstance={peerInstance} idToCall={idToCall} isCaller={isCaller} triggerCallStatus={triggerCallStatus} updateCall={updateCall} currentCall={currentCall} />
    </div>
  );
};

export default VideoCall;
