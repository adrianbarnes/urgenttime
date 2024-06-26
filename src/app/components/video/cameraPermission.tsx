import React, { useEffect, useState } from 'react';

interface CameraPermissionProps {
    onPermissionGranted: any,
}

const CameraPermission: React.FC<CameraPermissionProps> = ({ onPermissionGranted }) => {
    const [permissionStatus, setPermissionStatus] = useState('undetermined');

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const EnableButton = () => {  
      return (
        <button
          className="w-full text-white bg-dark-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={requestCameraPermission}
          >
          Enable Camera
        </button>
      );
    };
      
    const EnablePermissionMessage = () => {  
      return  (
          <div className="md:w-1/2 w-full p-6 mx-auto space-y-4 md:space-y-6 sm:p-8">
              <p>Urgenttime needs access to your camera so that the other participant can see you.</p>
              <EnableButton/>
          </div>
          )
    };

    const EnablePermissionMessageForDenied = () => {  
      return  (
          <div className="md:w-1/2 w-full p-6 mx-auto space-y-4 md:space-y-6 sm:p-8">
              <p>You have previously denied camera access. Urgenttime needs access to your camera so that the other participant can see you.</p>
              <EnableButton/>
          </div>
          )
    };    

    const requestCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          // Permission granted
          setPermissionStatus('granted');
          onPermissionGranted(); // Call the callback function
          stream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
        } catch (error) {
          // Permission denied or error
          setPermissionStatus('denied');
        }
      
      };    
  
    if (permissionStatus === 'denied') {
      return <EnablePermissionMessageForDenied/>;
    }
  
    if (permissionStatus === 'granted') {
      // Render component for camera usage
      return <p>Camera permission granted!</p>;
    }
  
    // Permission status undetermined or prompt
    return <EnablePermissionMessage/>;
  }; 

export default CameraPermission;
