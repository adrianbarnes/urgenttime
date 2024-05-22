'use client'
 
import { signup } from '@/app/actions/signup'
import SubmitButton from '@/app/lib/submit';
import { signIn } from 'next-auth/react';

import Image from "next/image";
import Link from "next/link";
import { useFormState, useFormStatus } from 'react-dom';

export default function SignupPage() {
  const [state, action] = useFormState(signup, undefined)
  
  return (
    <main className="flex min-h-screen justify-end -mt-14 ml-10">
        <div className="flex h-screen bg-white rounded-lg shadow-xl shadow-blue items-center md:w-7/12">
          <div className="md:w-10/12 ml-auto md:mt-0 xl:p-0">
            <div className="p-6 mx-auto space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-700 md:text-2xl text-dark-blue">
                Create Account
              </h1>
              <form className="space-y-5 md:space-y-6" action={action}>
                <div className="flex gap-4">
                 <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input id="firstName" name="firstName"
                      className="
                      peer w-full h-full bg-transparent
                      text-blue-gray-700 font-sans font-normal outline outline-0
                      focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0
                      transition-all placeholder-shown:border
                      placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
                      border focus:border-2 border-t-transparent
                      focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px]
                      border-blue-gray-200 focus:border-gray-900"
                        placeholder=" " />
                      <label htmlFor="firstName"
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Firstname
                    </label>
                    {state?.errors?.firstName && <p className='text-sm text-red-500'>{state.errors.firstName}</p>}
                  </div>
                </div>

                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input id="lastName" name="lastName"
                      className="
                      peer w-full h-full bg-transparent
                      text-blue-gray-700 font-sans font-normal outline outline-0
                      focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0
                      transition-all placeholder-shown:border
                      placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
                      border focus:border-2 border-t-transparent
                      focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px]
                      border-blue-gray-200 focus:border-gray-900"
                        placeholder=" " />
                      <label htmlFor="lastName"
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Lastname
                    </label>
                    {state?.errors?.lastName && <p className='text-sm text-red-500'>{state.errors.lastName}</p>}
                  </div>
                </div>

                </div>

                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input id="email" name="email"
                      type="email"
                      className="
                        peer w-full h-full bg-transparent
                        text-blue-gray-700 font-sans font-normal outline outline-0
                        focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0
                        transition-all placeholder-shown:border
                        placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
                        border focus:border-2 border-t-transparent
                        focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px]
                        border-blue-gray-200 focus:border-gray-900"
                      placeholder=" " />
                      <label htmlFor="email"
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Email
                    </label>

                    {state?.errors?.email && <p className='text-sm text-red-500'>{state.errors.email}</p>}
                  </div>
                </div>

                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      id="password" name="password"
                      type="password"
                      className="
                      peer w-full h-full bg-transparent
                      text-blue-gray-700 font-sans font-normal outline outline-0
                      focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0
                      transition-all placeholder-shown:border
                      placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
                      border focus:border-2 border-t-transparent
                      focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px]
                      border-blue-gray-200 focus:border-gray-900"
                        placeholder=" " />
                      <label htmlFor="password"
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Password
                    </label>

                    {state?.errors?.password && (
                        <div className='text-sm text-red-500'>
                          <p className='text-sm text-red-500'>Password must:</p>
                          <ul>
                            {state.errors.password.map((error) => (
                              <li key={error}>- {error}</li>
                            ))}
                          </ul>
                        </div>
                      )}                    
                  </div>
                </div>

                <SubmitButton
                  className="w-full text-white bg-dark-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  pendingText="Creating..."
                  launchText="'Create Account"
                  >
                </SubmitButton>

              </form>

                <p className="text-sm font-light text-gray-500">
                  Already have an account? <Link href="/auth" className="text-primary-600 text-dark-blue underline hover:underline">Login</Link>
                </p>

                <div
                  className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p
                    className="mx-4 mb-0 text-center text-gray-500 font-light">
                    Or
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button onClick={() => signIn("google")} className="w-3/5 px-4 py-2 border flex gap-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <Image className="w-6 h-6"
                      src="/google-logo.svg"
                      loading="lazy" alt="google logo"
                      width={10}
                      height={31}
                    />
                    <span> Login with Google</span>
                  </button>
                </div>
            </div>
          </div>
        </div>
    </main>
  );
}
