"use client"

import { signOut } from 'next-auth/react'
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db } from '@/app/lib/dexieDB';

const UserAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };
 

  const handleLogout = async () => {
    db.delete();
    await signOut({callbackUrl: '/auth'});
    
  };

  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      if (!target.closest('.user-avatar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, []);

  return (
    <div className="flex items-center user-avatar relative inline-block">
      <div 
        className="relative inline-block"
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
      >
        <Link
          className="inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          href="#"
        >
          <Image
            src="/avatar.svg"
            alt="User Avatar"
            className="h-8 w-8 rounded-full"
            width={32}
            height={31}
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          />
        </Link>

        {isOpen && (
          <div 
            className="origin-top-right absolute right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            role="menu" 
            aria-orientation="vertical" 
            aria-labelledby="options-menu"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <div className="py-1" role="none">
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
