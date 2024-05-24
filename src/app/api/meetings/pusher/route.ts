import { pusherServer } from "@/app/lib/pusher/pusherServer";

export async function POST(req: Request) {
    const { meetingId, myUniqueId, isCaller } = await req.json();

    try {

      if(isCaller){
        pusherServer.trigger(meetingId, 'legBCallId', { legBCallId: myUniqueId, isCaller: isCaller });
      }

      if(!isCaller){
        pusherServer.trigger(meetingId, 'legACallId', { legBCallId: myUniqueId, isCaller: isCaller });
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