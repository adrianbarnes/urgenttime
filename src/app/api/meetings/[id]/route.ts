import { pusherServer } from "@/app/lib/pusher/pusherServer";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  
  const meetingId  = params.id;    

  if (!meetingId) {
    return new Response('Missing required parameter: meetingId', {
      status: 400, // Bad request
    });
  }

  const { myUniqueId, user } = await req.json();

  try {

    if(user){
      pusherServer.trigger(meetingId, 'legBCallId', { legCallId: myUniqueId, user: user });
    }

    if(!user){
      pusherServer.trigger(meetingId, 'legACallId', { legCallId: myUniqueId, user: user });
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
