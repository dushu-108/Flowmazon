"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";

interface UserMenuButtonProps{
    session : Session | null
}

export default function UserMenuButton({session} : UserMenuButtonProps) {
    const user = session?.user;

    return(
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                {user ? (
                    <Image 
                    src={user?.image || "/no-profile-picture-icon.png"}
                    alt="Profile picture"
                    width={40}
                    height={40}
                    className="w-10 rounded-full"
                    />
                ) : 
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full border border-gray-300">
                  <svg
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   className="w-6 h-6 text-gray-400"
                   >
                   <circle cx="12" cy="10" r="2.5" />
                   <path d="M16 20H6a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6z" />
                 </svg>
               </div>
               }
            </label>
            <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-blue-100 p-2 shadow">
                <li>
                    {user ? 
                    <button onClick={() => {signOut({callbackUrl : "/"})}}>Sign Out</button>
                    :
                    <button onClick={() => {signIn()}}>Sign In</button>
                    }
                </li>
            </ul>
        </div>
    )
}