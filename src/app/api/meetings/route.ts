import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const { meetingId, callLegId } = await req.json();

    try {

      const cookieStore = cookies()

      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
     
       cookieStore.set('meeting', callLegId, {
        httpOnly: true,
        secure: true,
        expires: new Date(expiresAt),
        sameSite: 'lax',
        path: '/',
      })

      return new Response('Meeting Call Leg Id saved successfully', {
        status: 200,
      })      
    } catch (error) {
      console.error('Error triggering saving meeting call leg Id:', error);

      return new Response('Failed to trigger meeting call leg Id', {
        status: 500,
      })       
    }
}
 
export async function GET(request: Request) {
  const cookieStore = cookies()
  const meetingLegId = cookieStore.get('meeting')
  console.log("meeting",  meetingLegId);
  const message = "Retrieved meet leg Id";
  
  const responseData = { message, meetingLegId }; 
 
  return new Response(JSON.stringify(responseData), {
    status: 200,
  })
}
