"use client";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../components/userAvatar";
import { useSession } from "next-auth/react";

export default function Navbar() {

 const { data: session } = useSession();
    
  return (
    <div className="w-full relative">
       <nav className={`flex items-center justify-between p-4 ${session ? "bg-white" : ""}`}>
        <div className="container mx-auto md:py-4">
          <div className="flex w-full">
            <div className="flex items-center mr-auto">

              <a href={`${session ? "/calls" : "/"}`}>
                <Image src="/logo.svg" alt="Urgenttime Logo"
                  className="h-8 mr-4"
                  width={163}
                  height={31}
                />
              </a>
            </div>
            {session && (

            <UserAvatar /> )}
          </div>
        </div>
      </nav>
    </div>
  );
}