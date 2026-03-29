import { pusherServer } from "@/app/lib/pusher/pusherServer";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {

  const { id: meetingId } = await context.params;

  if (!meetingId) {
    return new Response('Missing required parameter: meetingId', {
      status: 400, // Bad request
    });
  }

    const { callStatus, eventType } = await req.json();

    try {

      pusherServer.trigger(meetingId, eventType, { callStatus: callStatus });
  
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