import { firestore } from '@/app/lib/firebase';

const configuration = {
  iceServers: [
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

// Functions for handling offer/answer creation, ICE candidate exchange, etc.
const createPeerConnection = (): RTCPeerConnection => {
  return new RTCPeerConnection(configuration);
};


// Functions for updating call document with offer/answer and ICE candidates
const createCall = async (roomId: string, calleeId: string) => {
  await firestore.collection('video-calls').doc(roomId).set({
    callerId: "1234",
    calleeId,
  });
};

const joinCall = async (roomId: string) => {
  const callRef = firestore.collection('video-calls').doc(roomId);
  // Listen for offer/answer and ICE candidates from the caller
};



export { createPeerConnection, createCall, joinCall };