'use client'

import React, { useState, useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from "react-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import SubmitButton from "@/app/components/submit";
import VideoCall from '@/app/components/videocall';
import { useSearchParams } from 'next/navigation';


export default function JoinPage({ params }: { params: { id: string } }) {

  const searchParams = useSearchParams()
 
  const isCaller = searchParams.get('is_caller') === 'true';
  
  // const [state, action] = useFormState(launchCall, undefined)

  // useEffect(() => {
  //   if (state?.success) {
  //     toast.success(state.success, {
  //       position: "top-right",
  //       // other options
  //     });

  //     //redirect('/call')   
  //   } else if (state?.error) {
  //     toast.error(state.error, {
  //       position: "top-right",
  //       // other options
  //     });
  //   }
  // }, [state?.success, state?.error]);  

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto mt-14">
        <div className="flex w-full ">
          <div className="w-3/5 bg-white">
            {/* <div className="w-1/2 p-6 mx-auto space-y-4 md:space-y-6 sm:p-8"> */}
              {/* <h1 className="text-xl my-8 text-center font-bold leading-tight tracking-tight text-gray-700 md:text-2xl text-dark-blue">
              Call ID: {params.id}
              </h1> */}

              <VideoCall roomId={params.id} isCaller={isCaller}></VideoCall>
              {/* </div> */}
          </div>
          <div className="w-2/5 bg-dark-blue"></div>
        </div>
      </div>
    </main>
  );
}
