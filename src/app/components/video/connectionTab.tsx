import React, { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from "next/image";
import EndCallButton from '@/app/components/video/endCallButton';

import Peer from 'peerjs';
import Call from '@/models/call';
import { Channel } from 'pusher-js';
import {CallStatus, formatEnumValue} from '@/enum/callStatus';

type ConnectionTabProps = {
    peerInstance: Peer | null,
    currentCall: Call | null,
    channel: Channel | null;
    updateCall: any;
  }
  const ConnectionTab: React.FC<ConnectionTabProps> = ({ peerInstance, currentCall, channel, updateCall }) => {  
    const [callStatus, setCallStatus] = useState<string>(''); 
    const pendingCheck = '/pending-check.svg';
    const inProgressCheck = '/inprogress-check.svg';
    const completedCheck = '/completed-check.svg';

    const destroyPeerInstance = () => {
      if (peerInstance) {
        peerInstance.destroy();

        if(currentCall){

          currentCall.endedAt = new Date().toISOString();
          
          updateCall(currentCall)
        }
        
        if (typeof window !== 'undefined') {
          window.location.href = '/calls';
        }
      }
    };

    useEffect(() => {

      channel?.bind('callStatus', (data: any) => {
        const {callStatus } = data;
        console.log("Received call Status" + data)
        setCallStatus(callStatus); 

        const enumPosition = Object.values(CallStatus).indexOf(callStatus);

        console.log("Enum Position " + enumPosition)
    });    
      return () => {
        channel?.unbind('callStatus');
      };
    }, [channel]);    

  return  (
    <div className='w-full mx-auto'>
        <h1 className="text-xl my-8 text-center font-bold leading-tight tracking-tight text-gray-700 md:text-2xl text-dark-blue">
                Connection Status
        </h1>

        { currentCall ? ( 

        <div className='host'>

          <div className='mt-3 mb-7'><p className='text-gray-400 text-xs text-center'>Connecting to {currentCall.email ?? currentCall.phoneNumber} ...</p></div>

          <div className='states mt-3 mb-8 pb-6'>
              <ul className='list-none grid gap-4'>
                  <li className='text-sm text-dark-blue'><Image
                  src="/completed-check.svg"
                  alt="Link has been sent"
                  width={15}
                  height={15}
                  className='inline mr-3'
                  />Link has been sent</li>

                  {/* <li className='text-sm text-dark-blue'><Image
                  src="/completed-check.svg"
                  alt="Link has been received"
                  width={15}
                  height={15}
                  className='inline mr-3'
                  />Link has been received</li> */}

                  <li className='text-sm text-dark-blue'><Image
                  src="/pending-check.svg"
                  alt="Contact has clicked on the link"
                  width={15}
                  height={15}
                  className='inline mr-3'
                  />Contact has clicked on the link</li>

                  <li className='text-sm text-dark-blue'><Image
                  src="/inprogress-check.svg"
                  alt="Contact accepted access to camera"
                  width={15}
                  height={15}
                  className='inline mr-3'
                  />Contact accepted access to camera</li>

                  <li className='text-sm text-dark-blue'><Image
                  src="/pending-check.svg"
                  alt="Successfully connected"
                  width={15}
                  height={15}
                  className='inline mr-3'
                  />Successfully connected</li>
              </ul>
          </div>
        </div> ) : (

        <div className='guest'>

          <div className='states mt-7 mb-8 pb-6'>
              <ul className='list-none grid gap-4'>

                  <li className='text-sm text-dark-blue'><Image
                  src="/completed-check.svg"
                  alt="Call Connected"
                  width={15}
                  height={15}
                  className='inline mr-3'
                  />Successfully connected</li>
              </ul>
          </div>
        </div>  )}    

        <EndCallButton
            className="w-full text-white bg-indian-yellow hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            pendingText="Ending Call..."
            onClick={destroyPeerInstance}
            launchText="End Call" />
    </div>
  );
};

export default ConnectionTab;
