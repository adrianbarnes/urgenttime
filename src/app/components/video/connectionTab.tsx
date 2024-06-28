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

    const [items, setItems] = useState([
      { id: formatEnumValue(CallStatus.LINK_SENT), src: completedCheck, alt: CallStatus.LINK_SENT, text: CallStatus.LINK_SENT },
      { id: formatEnumValue(CallStatus.RECIPIENT_CLICKED_ON_LINK), src: inProgressCheck, alt: CallStatus.RECIPIENT_CLICKED_ON_LINK, text: CallStatus.RECIPIENT_CLICKED_ON_LINK },
      { id: formatEnumValue(CallStatus.CONTACT_ACCEPTED_ACCESS_To_CAMERA), src: pendingCheck, alt: CallStatus.CONTACT_ACCEPTED_ACCESS_To_CAMERA, text: CallStatus.CONTACT_ACCEPTED_ACCESS_To_CAMERA },
      { id: formatEnumValue(CallStatus.CALL_CONNECTED), src: pendingCheck, alt: CallStatus.CALL_CONNECTED, text: CallStatus.CALL_CONNECTED }
    ]);  

    const updateItemSrc = (index: number) => {
      const updatedItems = [...items];
      updatedItems.forEach((item, i) => {
        if (i <= index) {
          item.src = completedCheck;
        } else if (i === index + 1) {
          item.src = inProgressCheck;
        } else {
          item.src = pendingCheck;
        }
      });
    
      // If there is no index after index 2, set index 2 src to '/completed-check.svg'
      if (index === updatedItems.length - 1) {
        updatedItems[index].src = completedCheck;
      }

      setItems(updatedItems);
    };    
    
    const findItemByKey = (id: string) => {

      const foundIndex = items.findIndex(item => item.id === id);
      if (foundIndex !== -1) {
        updateItemSrc(foundIndex);
        return { item: items[foundIndex], index: foundIndex };
      } else {
        return { item: null, index: -1 };
      }      
    };    


    const connectedStatus = items.find(item => item.id === formatEnumValue(CallStatus.CALL_CONNECTED));

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
        const { callStatus } = data;
        console.log("Received call Status " + data)
        console.log("call Status is " + callStatus)
        setCallStatus(callStatus); 

        findItemByKey(callStatus);

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
              {items.map((item, index) => (
                  <li key={index} className='text-sm text-dark-blue'>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={15}
                      height={15}
                      className='inline mr-3'
                    />
                    {item.text}
                  </li>
                ))}
              </ul>
          </div>
        </div> ) : (

        <div className='guest'>

          <div className='states mt-7 mb-8 pb-6'>
              <ul className='list-none grid gap-4'>
                  { connectedStatus &&
                  <li className='text-sm text-dark-blue'>
                    <Image
                      src={connectedStatus.src}
                      alt={connectedStatus.alt}
                      width={15}
                      height={15}
                      className='inline mr-3'
                    />
                    Successfully connected
                  </li> }
                  
              </ul>
          </div>
        </div>  )}    

        <EndCallButton
            className="w-full text-white bg-indian-yellow hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-3 text-center"
            pendingText="Ending Call..."
            onClick={destroyPeerInstance}
            launchText="End Call" />
    </div>
  );
};

export default ConnectionTab;
