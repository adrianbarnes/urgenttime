import React, { useState, useEffect, useRef } from 'react';
import { createPeerConnection, createCall, joinCall } from '@/app/lib/webrtc';
import VideoStream from '@/app/components/videostream';
import { firestore } from '../lib/firebase';

interface VideoCallProps {
  roomId: string;
  isCaller: boolean;
}

const VideoCall: React.FC<VideoCallProps> = ({ roomId, isCaller }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const initCall = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);

      if (isCaller) {
        console.log("starting call");
        await createCall(roomId, "9456"/* callee ID */);

        const offer = await peerConnection.current!.createOffer();
        await peerConnection.current!.setLocalDescription(offer);
        // Send offer to callee through Firestore
        handleOffer(offer); // New function for offer exchange
      } else {
        await joinCall(roomId);
        console.log("joining calling");
        // Handle offer received from caller (implemented later)
        listenForOffer();
        listenForIceCandidates();        
      }
    };

    initCall();

    return () => {
      // Cleanup: stop local stream, close peer connection
      localStream?.getTracks().forEach((track) => track.stop());
      peerConnection.current?.close();
    };
  }, [roomId, isCaller]);

  // Function to handle and send Offer (Caller only)
  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    // Send offer to callee through Firestore (implementation depends on your firestore setup)
    await firestore.collection('video-calls').doc(roomId).update({ offer });
  };

  // Function to handle and send Answer (Callee only)
  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    // Send answer to caller through Firestore (implementation depends on your firestore setup)
    await firestore.collection('video-calls').doc(roomId).update({ answer });
  };

// Send ICE Candidate
const sendIceCandidate = async (candidate: RTCIceCandidate) => {
    await firestore.collection('video-calls').doc(roomId).collection('iceCandidates').add(candidate);
  };
  
  // Listen for Offer (Callee)
  const listenForOffer = () => {
    firestore.collection('video-calls').doc(roomId).onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data?.offer) {
        createOfferAnswer(data.offer); // Process received offer
      }
    });
  };
  
  // Listen for Answer (Caller)
  const listenForAnswer = () => {
    firestore.collection('video-calls').doc(roomId).onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (data?.answer) {
        createOfferAnswer(data.answer); // Process received answer
      }
    });
  };
  
  // Listen for ICE Candidates (Both Caller and Callee)
  const listenForIceCandidates = () => {
    firestore.collection('video-calls').doc(roomId).collection('iceCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = change.doc.data() as RTCIceCandidate;
          handleIceCandidate(candidate); // Process received ICE candidate
        }
      });
    });
  };  

  // Function to create and set offer/answer based on received data
  const createOfferAnswer = async (sdp?: RTCSessionDescriptionInit) => {
    if (sdp) {
      await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(sdp));
      if (!isCaller) {
        const answer = await peerConnection.current!.createAnswer();
        await peerConnection.current!.setLocalDescription(answer);
        handleAnswer(answer); // Send answer to caller
      }
    } else {
      const offer = await peerConnection.current!.createOffer();
      await peerConnection.current!.setLocalDescription(offer);
      handleOffer(offer); // Send offer to callee (if caller)
    }
  };

  // Function to handle incoming ICE candidates
  const handleIceCandidate = (candidate: RTCIceCandidate) => {
    peerConnection.current!.addIceCandidate(candidate);
  };

  useEffect(() => {
    peerConnection.current = createPeerConnection();

    peerConnection.current!.onicecandidate = (event) => {
      if (event.candidate) {
        // Send ICE candidate to other party through Firestore (implementation depends on your firestore setup)
        handleIceCandidate(event.candidate); // New function for ICE candidate exchange
      }
    };

    peerConnection.current!.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
    };

    // Handle other peer connection events (onnegotiationneeded, onconnectionstatechange, etc.)

    return () => {
      // Cleanup: remove event listeners
      peerConnection.current!.onicecandidate = null;
      peerConnection.current!.ontrack = null;
    };
  }, []);

  return (
    <div className='w-full'>
      {localStream && <VideoStream stream={localStream} />}
      {remoteStream && <VideoStream stream={remoteStream} />}
      {/* Add controls for ending call, muting audio/video, etc. */}
    </div>
  );
};

export default VideoCall;
