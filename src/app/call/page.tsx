'use client'

import IntlTelInput from "intl-tel-input/react";
import 'intl-tel-input/build/css/intlTelInput.css';
import React, { useState, useRef, useEffect } from 'react';


export default function Page() {

  const [phoneNumber, setNumber, ] = useState('');
  const phoneInputRef = useRef(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto mt-14">
        <div className="flex w-full ">
          <div className="w-3/5 p-4 bg-white">
            <div className="w-1/2 p-6 mx-auto space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl my-8 text-center font-bold leading-tight tracking-tight text-gray-700 md:text-2xl text-dark-blue">
                Start a new call
              </h1>
              <form className="space-y-6 md:space-y-6" action="#">

              <div className="w-full">
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
                    {/* <input
                      type="phone"
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" " /><label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Phone Number
                    </label>                   */}
                  </div>
                </div>

                {/* <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      type="email"
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                      placeholder=" " /><label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Email
                    </label>
                  </div>
                </div> */}

                
                <p
                    className="my-4 text-center text-sm text-dark-blue font-light">
                    Use phone number
                  </p>  
                            
                <button
                  type="submit"
                  className="w-full text-white bg-forest-green hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Launch Call</button>
              </form>
              </div>
          </div>
          <div className="w-2/5 bg-dark-blue"></div>
        </div>
      </div>
    </main>
  );
}
