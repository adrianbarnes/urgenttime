import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import VideoFeed from '@/app/components/video/videoFeed';
import Call from '@/models/call';
import { Channel } from 'pusher-js';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { useSearchParams } from 'next/navigation';
interface VideoCallProps {
    meetingId: string;
    handlePeerInstance: any;
    currentCall: Call | null;
    channel: Channel | null;
    triggerCallStatus: any;
    updateCall: any;
  }

const VideoCall: React.FC<VideoCallProps> = ({ meetingId, channel, handlePeerInstance, currentCall, triggerCallStatus, updateCall }) => {
  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);
  const [myUniqueId, setMyUniqueId] = useState<string | null>(null);
  const [idToCall, setIdToCall] = useState('');
 
  const generateRandomString = () => Math.random().toString(36).substring(2);

  const { data: session } = useSession();

  //const user: User | undefined = session?.user; 

  const searchParams = useSearchParams();

  const user = searchParams.get('is_caller') === 'true';  

  const triggerMeetingId = async (myUniqueId: string) => {
    try {
      const response = await fetch(`/api/meetings/${meetingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ myUniqueId, user }),
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
  
        if(user && currentCall){
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
                {
                  urls: "stun:stun.relay.metered.ca:80",
                },
                {
                  urls: "turn:global.relay.metered.ca:80",
                  username: "84f5ac65de36e515412d9f0b",
                  credential: "wovZTDn6KsXNeXOl",
                },
                {
                  urls: "turn:global.relay.metered.ca:80?transport=tcp",
                  username: "84f5ac65de36e515412d9f0b",
                  credential: "wovZTDn6KsXNeXOl",
                },
                {
                  urls: "turn:global.relay.metered.ca:443",
                  username: "84f5ac65de36e515412d9f0b",
                  credential: "wovZTDn6KsXNeXOl",
                },
                {
                  urls: "turns:global.relay.metered.ca:443?transport=tcp",
                  username: "84f5ac65de36e515412d9f0b",
                  credential: "wovZTDn6KsXNeXOl",
                },              
                // { url: "stun:stun.l.google.com:19302" },
                // { url: "stun:stun1.l.google.com:19302" },
                // { url: "stun:stun2.l.google.com:19302" },
                // { url: "stun:stun3.l.google.com:19302" },
                // { url: "stun:stun4.l.google.com:19302" },
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


        if(user){
            channel?.bind('legACallId', (data: any) => {
                const { legCallId, user } = data;
                console.log("Received in leg A " + legCallId)
  

                // if(idToCall != legCallId){
                //   triggerMeetingId( myUniqueId);
                // }

                setIdToCall(legCallId);
                
            });

        }

        if(!user){
            channel?.bind('legBCallId', (data: any) => {
                const { legCallId, user } = data;
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
      <VideoFeed peerInstance={peerInstance} idToCall={idToCall} user={user} triggerCallStatus={triggerCallStatus} updateCall={updateCall} currentCall={currentCall} />
    </div>
  );
};

export default VideoCall;
