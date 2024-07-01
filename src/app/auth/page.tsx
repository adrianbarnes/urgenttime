'use client'

import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import SubmitButton from "@/app/components/submit";
import { useState } from "react";
import { LoginFormSchema } from "../lib/definitions";


export default function LoginPage() {
  //const [state, setState] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{} | string | null |undefined>(null);  

  const handleSubmit = async (e) => {
   
    e.preventDefault();

    try {
      const validatedFields = LoginFormSchema.safeParse({
        email: email,
        password: password,
      });   
      
      if (!validatedFields.success) {
        setErrors(
          validatedFields.error.flatten().fieldErrors
        )

        return;
      }      

      const result = await signIn('credentials', {
        email,
        password
      });

      if (!result?.error) {
        setErrors(result?.error);
      } 
    } catch (error) {
      console.log("error " + error)
      setErrors(error);
      // setErrors(error.errors.map((err) => err.message));
    }
  };  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="flex flex-col lg:w-6/12 w-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow-xl shadow-blue md:mt-0 sm:max-w-md xl:p-0">
            <div className="lg:w-8/12 p-6 mx-auto space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-700 md:text-2xl text-dark-blue">
                Welcome Back
              </h1>
              <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input id="email" value={email}
                    onChange={(e) => setEmail(e.target.value)} name="email"
                      className="peer w-full h-full bg-transparent text-blue-gray-700
                      font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all
                      placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
                      border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px]
                      border-blue-gray-200 focus:border-gray-900 border-dark-blue"
                      placeholder=" " />
                      <label htmlFor="email"
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Username
                    </label>
                    {/* {state?.errors?.email && <p className='text-sm text-red-500'>{state.errors.email}</p>} */}
                  </div>
                </div>

                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      id="password" value={password}
                      onChange={(e) => setPassword(e.target.value)} name="password"
                      type={showPassword ? "text" : "password"} 
                      className="peer w-full h-full bg-transparent text-blue-gray-700
                      font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all
                      placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
                      border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5
                      rounded-[7px] border-blue-gray-200 focus:border-gray-900 border-dark-blue"
                      placeholder=" " />
                      <label htmlFor="password"
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                      Password
                    </label>
                    {/* {state?.errors?.password && <p className='text-sm text-red-500'>{state.errors.password}</p>} */}

                    <button
                      type="button"
                      onClick={() => setShowPassword(prevState => !prevState)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <SubmitButton
                  className="w-full text-white bg-dark-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  pendingText="Logging in..."
                  launchText="Sign in"
                  />
              </form>
                <div
                  className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p
                    className="mx-4 mb-0 text-center text-gray-500 font-light">
                    Or
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button onClick={() => signIn("google")} className="w-full px-4 py-2 border flex gap-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <Image className="w-6 h-6"
                      src="/google-logo.svg"
                      loading="lazy" alt="google logo"
                      width={10}
                      height={31}
                    />
                    <span>Login with Google</span>
                  </button>
                </div>
                <p className="text-sm font-light text-center text-gray-500">
                  Are you new? <Link href="/auth/register" className="text-primary-600 text-dark-blue underline hover:underline">Create an account</Link>
                </p>
            </div>
          </div>
        </div>
    </main>
  );
}
