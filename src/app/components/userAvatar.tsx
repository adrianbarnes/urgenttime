"use client"

import { signOut, useSession } from 'next-auth/react'
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/app/lib/dexieDB';

const UserAvatar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = (event: MouseEvent) => {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.user-avatar')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, [isOpen]);

  const handleLogout = async () => {
    await signOut();
    await db.delete();
  };

  return (
    <div className="flex items-center user-avatar relative inline-block">

      {session ? (
        
        <div className="relative inline-block">
      <Link 
      className="inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      href="#">
        <Image
          src="/avatar.svg"
          alt="User Avatar"
          className="h-8 w-8 rounded-full mr-4" 
          width={32}
          height={31}
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        />
      </Link>

          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="py-1" role="none">
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserAvatar;
