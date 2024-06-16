'use client'

import ConnectionTab from '@/app/components/video/connectionTab';
import VideoCall from '@/app/components/video/videocall';
import { db } from '@/app/lib/dexieDB';
import Call from '@/models/call';
import { useSearchParams } from 'next/navigation';
import Peer from 'peerjs';
import React from 'react';
import { useEffect, useState } from 'react';
import { pusherClient } from '@/app/lib/pusher/pusherClient';
import { Channel } from 'pusher-js';
import { CallStatus, formatEnumValue } from '@/enum/callStatus';

export default function JoinPage({ params }: { params: { id: string } }) {

  const searchParams = useSearchParams()
 
  const isCaller = searchParams.get('is_caller') === 'true';

  const [peerInstance, setPeerInstance] = useState<Peer | null>(null);
  const [currentCall, setCurrentCall] = useState<Call | null>(null);

  const [channel, setChannel] = useState<Channel | null>(null);

  const meetingId = params.id;

  //const channel : Channel = pusherClient.subscribe(meetingId);

  const handlePeerInstance = (peer: Peer) => {
    setPeerInstance(peer);
  };  

  
  const triggerCallStatus = async (callStatus: string) => {
    try {
   
      const response = await fetch(`/api/meetings/${meetingId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ callStatus }),
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

    const channel : Channel = pusherClient.subscribe(meetingId);

    setChannel(channel);
    
    if(!isCaller){
      triggerCallStatus(formatEnumValue(CallStatus.RECIPIENT_CLICKED_ON_LINK));
    }
    

     return () => {
      // Unsubscribe from the Pusher channel when the component is unmounted
      if (channel.subscribed) {
        pusherClient.unsubscribe(channel.name);
        pusherClient.disconnect();
      }

    };   
  }, [pusherClient]);    

  // Query the database for the call with the matching meetingId
  useEffect(() => {

    if (meetingId && isCaller) {
      db.call.where('meetingId').equals(meetingId).toArray().then((calls) => {
        if (calls.length > 0) {
          // Call with matching meetingId found
          const matchingCall = calls[0];
          setCurrentCall(matchingCall);
          console.log('Matching Call:', matchingCall);
        } else {
          // No call found with the given meetingId
          console.log('No call found with meetingId:', meetingId);
        }
      });
    }
    
  }, [meetingId]);  


  // update call
  const updateCall = React.useCallback(async (activeCall: Call) => {
    if (isCaller) {
      await db.call.put(activeCall);
      setCurrentCall(activeCall);
    }
  }, [])  

  return (
    
  <main className="flex min-h-screen flex-col items-center justify-between">
    <div className="container mx-auto mt-14">
      <div className="flex flex-col-reverse md:flex-row w-full ">
        <div className="w-full md:w-3/5 bg-black rounded-l-lg">
          <VideoCall
          meetingId={meetingId}
          currentCall={currentCall}
          triggerCallStatus={triggerCallStatus}
          channel={channel}
          handlePeerInstance={handlePeerInstance}
          updateCall={updateCall}
          isCaller={isCaller}/>
        </div>
        <div className="w-full md:w-2/5 bg-white rounded-r-lg">
          <div className='w-3/5 mx-auto'>
            <ConnectionTab currentCall={currentCall} updateCall={updateCall} channel={channel} peerInstance={peerInstance}/>
          </div>
        </div>
      </div>
    </div>
  </main>

  );
}
