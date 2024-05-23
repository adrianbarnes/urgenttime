import React, { useState, useEffect, useRef } from 'react';
import { createPeerConnection, createCall, joinCall } from '@/app/lib/webrtc';
import VideoStream from '@/app/components/videostream';


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
        await createCall(roomId, "9456"/* callee ID */);
        const offer = await peerConnection.current!.createOffer();
        await peerConnection.current!.setLocalDescription(offer);
        // Send offer to callee through Firestore
      } else {
        await joinCall(roomId);
        // Handle offer received from caller
      }
    };

    initCall();

    return () => {
      // Cleanup: stop local stream, close peer connection
      localStream?.getTracks().forEach((track) => track.stop());
      peerConnection.current?.close();
    };
  }, [roomId, isCaller]);

  // Function to create and set offer/answer based on received data
  const createOfferAnswer = async (sdp?: RTCSessionDescriptionInit) => {
    if (sdp) {
      await peerConnection.current!.setRemoteDescription(new RTCSessionDescription(sdp));
      if (!isCaller) {
        const answer = await peerConnection.current!.createAnswer();
        await peerConnection.current!.setLocalDescription(answer);
        // Send answer to caller through Firestore
      }
    } else {
      const offer = await peerConnection.current!.createOffer();
      await peerConnection.current!.setLocalDescription(offer);
      // Send offer to callee through Firestore (if caller)
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
        // Send ICE candidate to other party through Firestore
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
