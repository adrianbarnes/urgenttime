import React, { useState, useEffect } from 'react';
import Image from "next/image";

type VideoCtrlProps = {
  updateVideoConstraints: any
}

const VideoCtrl = (props: VideoCtrlProps) => {

  const {
    updateVideoConstraints = props.updateVideoConstraints,
  } = props    


  const [callTime, setCallTime] = useState(0);
  const [isFrontCamera, setIsFrontCamera] = useState(true);

  const [camerasAvailable, setCamerasAvailable] = useState(false); // Track availability of both cameras

  useEffect(() => {
    const getVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        if (videoDevices.length >= 2) {
          // At least 2 video input devices are available (front and rear cameras)
          setCamerasAvailable(true);
        }
      } catch (error) {
        console.error('Error enumerating video devices:', error);
      }
    };

    getVideoDevices();
  }, []);  

  useEffect(() => {

    const newConstraints = {
      facingMode: isFrontCamera ? 'user' : 'environment',
    }; 
     
    updateVideoConstraints(newConstraints);
  }, [isFrontCamera]);  

  

  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime(prevTime => prevTime + 1); // Update call time every second
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on unmount
  }, []);
  

  const toggleCamera = () => {
    setIsFrontCamera(prevIsFrontCamera => !prevIsFrontCamera); // Toggle between front and rear camera
  };

  const formatCallTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${remainingSeconds}`;
  };  

  return (
    <div className='inset-x-0 absolute bottom-4 flex flex-col items-center text-white'>
      <p className='text-2xl'>{formatCallTime(callTime)}</p>

      {camerasAvailable && ( <button onClick={toggleCamera}>
        <Image src="/camera-switch.svg" alt="Camera Toggle Switch"
                className=""
                width={30}
                height={30}
              />
      </button> 
      )} 

       

    </div>
  );
};

export default VideoCtrl;
