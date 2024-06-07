import { firestore } from '@/config/firebase';
import { getFirestore,  collection, query, where, getDocs, updateDoc, } from 'firebase/firestore';

import Call from '@/models/call';
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    const { meetingId, callLegId, isCaller } = await req.json();

    try {
      
      const callsRef = collection(firestore, 'calls');
      const querySnapshot = await getDocs(query(callsRef, where('meetingId', '==', meetingId))); 

      if(querySnapshot.empty){
        const call : Call = {
          meetingId: meetingId,
          legAId: callLegId,
          //legBId: null,
        }   

        firestore.collection("calls").add(call)
      }

      if(!querySnapshot.empty){
        const firstCall = querySnapshot.docs[0]; // Access the first document
        const callId = firstCall.id;

        // if(isCaller){
        //   console.log("updating leg A")
        //   // Update the field with the new value
        //   await updateDoc(firestore.collection('calls').doc(callId), {
        //     legAId: callLegId
        //   }); 

        // }
        
        if(!isCaller){
          console.log("updating leg B")
          // Update the field with the new value
          await updateDoc(firestore.collection('calls').doc(callId), {
            legBId: callLegId
          }); 

        }
    
       
      }

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
 
// export async function GET(request: Request) {
//   const cookieStore = cookies()
//   const meetingLegId = cookieStore.get('meeting')
//   console.log("meeting",  meetingLegId);
//   const message = "Retrieved meet leg Id";
  
//   const responseData = { message, meetingLegId }; 
 
//   return new Response(JSON.stringify(responseData), {
//     status: 200,
//   })
// }

// export async function GET(req: Request) {
  
//   //const meetingId = req.query.get('meetingId'); // Access meetingId from URL query string
//   //const { meetingId } = await req.json();
//   const meetingId = "714PBapK9j";

//   if (!meetingId) {
//     return new Response('Missing required parameter: meetingId', {
//       status: 400, // Bad request
//     });
//   }

//   try {
//     const callsRef = collection(firestore, 'calls');
//     const querySnapshot = await getDocs(query(callsRef, where('meetingId', '==', meetingId))); 
//   //   const dailyRef = collection(db, 'daily');

//   //   setDoc(doc(dailyRef,email ), {
//   //      name:"name",
//   //      email:email });
   
//   //  const q = query(dailyRef, where("email", "==", email));    
    

//     const calls: Call[] = [];
//     querySnapshot.forEach((doc) => {

//       calls.push({ id: doc.id, ...doc.data() }); // Include document ID
//     });

//     return new Response(JSON.stringify(calls), {
//       status: 200, // Success
//     });
//   } catch (error) {
//     console.error('Error fetching calls by meetingId:', error);

//     return new Response('Failed to fetch calls', {
//       status: 500, // Internal server error
//     });
//   }
// }
