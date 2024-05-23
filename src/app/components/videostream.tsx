import React, { useEffect, useRef } from 'react';

const VideoStream = ({ stream }: { stream: MediaStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream, videoRef]);

  return <video className='w-full' ref={videoRef} autoPlay muted/>;
};

export default VideoStream;