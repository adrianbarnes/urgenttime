import React, { useEffect, useRef } from 'react';

const VideoStream = ({ stream }: { stream: MediaStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [stream, videoRef]);

  return <video className='w-full' ref={videoRef} autoPlay />;
};
export default VideoStream;

// import React, { useState, useEffect } from 'react';

// interface VideoStreamProps {
//   stream: MediaStream;
// }

// const VideoStream: React.FC<VideoStreamProps> = ({ stream }) => {
//   const [videoRef, setVideoRef] = useState<React.RefObject<HTMLVideoElement> | null>(null);
//   const [audioRef, setAudioRef] = useState<React.RefObject<HTMLAudioElement> | null>(null);

//   useEffect(() => {
//     if (videoRef?.current && audioRef?.current) {
//       videoRef.current.srcObject = stream;
//       audioRef.current.srcObject = stream;
//       videoRef.current.play();
//       audioRef.current.play();
//     }
//   }, [stream, videoRef, audioRef]);

//   return (
//     <video className='w-full' ref={setVideoRef} autoPlay muted />
//     // <div>
//     //   <video className='w-full' ref={setVideoRef} autoPlay muted />
//     //   <audio ref={setAudioRef} autoPlay muted />
//     // </div>
//   );
// };

// export default VideoStream;
