'use client'
 
import SubmitButton from '@/app/components/submit';
import { SignupFormSchema } from '@/app/lib/definitions';
import { DB } from '@/app/lib/dexieDB';
import { signIn } from 'next-auth/react';

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function SignupPage() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<{ firstName: string, lastName: string, email: string; password: string }>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string , string[]>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
   
   
    e.preventDefault();

    try {
      const validatedFields = SignupFormSchema.safeParse(formData);   

      if (!validatedFields.success) {
        setErrors(validatedFields.error.flatten().fieldErrors)

        return;
      }    
      
      const {email, password} = formData;

      const result = await signIn('credentials', {
        email,
        password
      });

      if (!result?.error) {
        toast.error(result?.error)
      
        return;
      } 

      //Delete Local Storage
      DB.deleteDatabase();

      await signIn("credentials", {
        email: email,
        password: password,
      })

      if (!result?.error) {
        toast.error(result?.error)
      } 
    } catch (error) {
      console.log("error registering", error)
      toast.error("Whoops!. It is not you it is us. Retry again")

    }
  };  

  return (
    <main className="w-full md:absolute top-0 right-0">
      <div className="flex min-h-screen flex-col items-center md:items-end md:justify-end">
        <div className="flex md:w-7/12 w-full justify-center md:h-screen md:bg-white bg-transparent md:rounded-lg md:shadow-xl md:shadow-blue items-center md:px-0 px-6 md:py-0 py-8 md:mx-0 mx-auto">
          <div className="md:w-10/12 w-full bg-white md:bg-transparent sm:rounded-lg sm:shadow-xl sm:shadow-blue md:ml-auto md:mt-0 xl:p-0">
            <div className="p-6 mx-auto space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-700 md:text-2xl text-dark-blue">
                Create Account
              </h1>
              <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
                <div className="flex-1 md:flex md:gap-4 md:space-y-0 space-y-5">
                 <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      name="firstName"
                      className="block px-2 w-full h-full text-sm text-blue-gray-700 font-sans font-normal bg-transparent rounded-lg border border-dark-blue appearance-none  focus:outline-none focus:ring-0 focus:border-dark-blue peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Firstname
                    </label>
                    {errors?.firstName && (
                      <p className="text-sm text-red-500">{errors.firstName}</p>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <div className="relative w-full min-w-[200px] h-10">
                    <input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      name="lastName"
                      className="block px-2 w-full h-full text-sm text-blue-gray-700 font-sans font-normal bg-transparent rounded-lg border border-dark-blue appearance-none  focus:outline-none focus:ring-0 focus:border-dark-blue peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Lastname
                    </label>
                    {errors?.lastName && (
                      <p className="text-sm text-red-500">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full">
                <div className="relative w-full min-w-[200px] h-10">
                  <input
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
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

                  {errors?.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <div className="relative w-full min-w-[200px] ">
                  <div className="relative w-full min-w-[200px] ">
                    <input
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="block px-3 py-2.5 w-full h-full text-sm text-blue-gray-700 font-sans font-normal bg-transparent rounded-lg border border-dark-blue appearance-none  focus:outline-none focus:ring-0 focus:border-dark-blue peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>

                  {errors?.password && (
                    <div className="text-sm text-red-500">
                      <p className="text-sm text-red-500">Password must:</p>
                      <ul>
                        {errors.password.map((error) => (
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
                launchText="Create Account"
              />
            </form>
            <div>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  href="/auth"
                  className="text-primary-600 text-dark-blue underline hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>

                <div
                  className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p
                    className="mx-4 mb-0 text-center text-gray-500 font-light">
                    Or
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button onClick={() => signIn("google")} className="md:w-3/5 w-full px-4 py-2 border flex gap-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <Image className="w-6 h-6"
                      src={`/google-logo.svg`}
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
        </div>
    </main>
  );
}
