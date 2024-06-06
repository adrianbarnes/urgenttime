import React from 'react';
import { useFormStatus } from 'react-dom';
import Image from "next/image";
import EndCallButton from '@/app/components/video/endCallButton';
type ConnectionTabProps = {
    className: string,
    pendingText: string,
    launchText: string,
  }
  
//const ConnectionTab = (props: ConnectionTabProps) => {  
const ConnectionTab = () => {
    const { pending } = useFormStatus();
    
    // const {
    //     className = props.className,
    //     pendingText = props.pendingText,
    //     launchText = props.launchText
    //   } = props    
    
  return (
    <div className='w-full mx-auto'>
        <h1 className="text-xl my-8 text-center font-bold leading-tight tracking-tight text-gray-700 md:text-2xl text-dark-blue">
                Connection Status
        </h1>
        <div className='mt-3 mb-7'><p className='text-gray-400 text-xs text-center'>Connecting to +1 514 692 4780 ...</p></div>

        <div className='states mt-3 mb-8 pb-6'>
            <ul className='list-none grid gap-4'>
                <li className='text-sm text-dark-blue'><Image
                src="/completed-check.svg"
                alt="Link has been sent"
                width={15}
                height={15}
                className='inline mr-3'
                />Link has been sent</li>
                <li className='text-sm text-dark-blue'><Image
                src="/completed-check.svg"
                alt="Link has been sent"
                width={15}
                height={15}
                className='inline mr-3'
                />Link has been received</li>
                <li className='text-sm text-dark-blue'><Image
                src="/inprogress-check.svg"
                alt="Link has been sent"
                width={15}
                height={15}
                className='inline mr-3'
                />Contact has clicked on the link</li>
                <li className='text-sm text-dark-blue'><Image
                src="/pending-check.svg"
                alt="Link has been sent"
                width={15}
                height={15}
                className='inline mr-3'
                />Contact accepted access to camera</li>
                <li className='text-sm text-dark-blue'><Image
                src="/completed-check.svg"
                alt="Link has been sent"
                width={15}
                height={15}
                className='inline mr-3'
                />Successfully connected</li>
            </ul>
        </div>
        <EndCallButton
            className="w-full text-white bg-indian-yellow hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            pendingText="Ending Call..."
            launchText="End Call" />
    </div>
  );
};

export default ConnectionTab;
