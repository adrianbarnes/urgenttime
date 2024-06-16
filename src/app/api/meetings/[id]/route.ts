import { firestore } from '@/config/firebase';
import { collection, query, where, getDocs, updateDoc, } from 'firebase/firestore';

import Call from '@/models/call';

import { pusherServer } from "@/app/lib/pusher/pusherServer";

export async function GET(req: Request, { params }: { params: { id: string } }) {    
  
    const meetingId  = params.id;    

  if (!meetingId) {
    return new Response('Missing required parameter: meetingId', {
      status: 400, // Bad request
    });
  }

  try {
    
    const callsRef = collection(firestore, 'calls');
    const querySnapshot = await getDocs(query(callsRef, where('meetingId', '==', meetingId))); 

    let call = {};

    if(!querySnapshot.empty){
      const result = querySnapshot.docs[0]; // Access the first document
      call = { id: result.id, ...result .data() };
      
    }

    return new Response(JSON.stringify(call), {
      status: 200, // Success
    });
  } catch (error) {
    console.error('Error fetching calls by meetingId:', error);

    return new Response('Failed to fetch calls', {
      status: 500, // Internal server error
    });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  
  const meetingId  = params.id;    

  if (!meetingId) {
    return new Response('Missing required parameter: meetingId', {
      status: 400, // Bad request
    });
  }

  const { myUniqueId, isCaller } = await req.json();

  try {

    if(isCaller){
      pusherServer.trigger(meetingId, 'legBCallId', { legCallId: myUniqueId, isCaller: isCaller });
    }

    if(!isCaller){
      pusherServer.trigger(meetingId, 'legACallId', { legCallId: myUniqueId, isCaller: isCaller });
    }
    return new Response('Pusher event triggered successfully', {
      status: 200,
    })      
  } catch (error) {
    console.error('Error triggering Pusher event:', error);

    return new Response('Failed to trigger Pusher event', {
      status: 500,
    })       
  }
}
