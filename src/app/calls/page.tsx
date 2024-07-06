'use client'

//import IntlTelInput from "intl-tel-input/react";
//import 'intl-tel-input/build/css/intlTelInput.css';
import React, { useState, useRef, useEffect } from 'react';
import { launchCall } from "@/app/actions/launchCall";
import { useFormState, useFormStatus } from "react-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import SubmitButton from "@/app/components/submit";
import { redirect } from "next/navigation";
import {db} from "@/app/lib/dexieDB";
import LatestCalls from "@/app/components/latestCalls";


export default function CallPage() {
  const [state, action] = useFormState(launchCall, undefined)

  // const [phoneNumber, setNumber, ] = useState('');
  // const phoneInputRef = useRef(null);

  
  const saveCall = React.useCallback(async () => {
    if(state?.success && state.call){
      await db.call.add(state.call);
    }

  }, [state?.call]);  

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success, {
        position: "top-right",
        // other options
      });


      saveCall();

      console.log(state?.inviteLink);

      redirect(state?.inviteLink+"?is_caller=true")   
    } else if (state?.error) {
      toast.error(state.error, {
        position: "top-right",
        // other options
      });
    }
  }, [state?.success, state?.error]);  

  return (
    <main className="flex flex-col items-center justify-between p-4">
      <div className="container mx-auto mt-14">
        <div className="flex w-full mx-auto">
          <div className="w-full md:w-3/5 p-4 mx-auto bg-white rounded-l-lg md:rounded-r-none rounded-r-lg">
            <div className="md:w-1/2 w-full p-6 mx-auto space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl my-8 text-center font-bold leading-tight tracking-tight text-gray-700 md:text-2xl text-dark-blue">
                Start a new call
              </h1>
              <form className="space-y-6 md:space-y-6" action={action}>
                {/* <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                  <IntlTelInput
                      // initialValue={value}
                      onChangeNumber={setNumber}
                      // onChangeValidity={setIsValid}
                      // onChangeErrorCode={setErrorCode}
                      // any initialisation options from the readme will work here
                      initOptions={{
                        initialCountry: "us",
                        utilsScript: "/intl-tel-input/js/utils.js?1714642302458",
                        containerClass: "w-full",
                      }}
                    />
                  </div>
                </div> */}

                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block px-2 w-full h-full text-sm text-blue-gray-700 font-sans font-normal bg-transparent rounded-lg border border-dark-blue appearance-none  focus:outline-none focus:ring-0 focus:border-dark-blue peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                      >
                      Email
                    </label>
                    {state?.errors?.email && (
                      <p className="text-sm text-red-500">
                        {state.errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* <p className="my-4 text-center text-sm text-dark-blue font-light">
                  Use phone number
                </p> */}

                <SubmitButton
                  className="w-full text-white bg-forest-green hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  pendingText="Starting Call..."
                  launchText="Launch Call"
                />
              </form>
            </div>
          </div>
          <div className="hidden sm:block w-2/5 bg-dark-blue rounded-r-lg md:rounded-l-none rounded-l-lg"></div>
        </div>
      </div>

      <LatestCalls />
    </main>
  );
}
