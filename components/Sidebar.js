'use client'
import Image from 'next/image'
import { assets } from "@/assets/assets";
import React, { useState } from 'react'
import { useClerk, UserButton } from '@clerk/nextjs';
import { useAppContext } from '@/context/AppContext';
import ChatLabel from './ChatLabel';

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  // const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all duration-300 z-50 max-md:absolute max-md:h-screen ${expand ? 'w-64 p-4' : 'w-0 md:w-20 max-md:overflow-hidden'}`}>
        <div>
          <div className={`flex ${expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'}`}>
            <Image onClick={() => expand ? setExpand(false) : setExpand(true)} className={expand ? "w-32" : "w-10"} src={expand ? assets.logo_text : assets.logo_icon} />
            <div onClick={() => expand ? setExpand(false) : setExpand(true)} className='group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer'>
              <Image src={assets.menu_icon} className='w-6 mb-1 md:hidden' />
              <Image className='hidden md:block w-6' src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} />
              <div className={`absolute w-max ${expand ? 'left-1/2 -translate-x-1/2 top-12' : '-top-12 left-0'} opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
                {expand ? 'Close sidebar' : 'Open sidebar'}
                <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? 'left-1/2 -top-1.5 -translate-x-1/2' : "left-4 -bottom-1.5"}`}></div>
              </div>
              <div></div>
            </div>
          </div>
          <button className={`flex mt-8 items-center justify-center ${expand ? 'bg-primary hover:opacity-90 rounded-2xl gap-1 p-2.5 w-max' : 'group relative h-9 w-9 mx-auto hover:bg-gray-500/30 transition-all duration-300 rounded-lg'}`}>
            <Image className={expand ? 'w-6' : 'w-7'} src={expand ? assets.chat_icon : assets.chat_icon_dull} />
            <div>
              <div className='absolute w-max -top-12 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none'>
                New Chat
                <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'></div>
              </div>
            </div>
            {expand && <p className='text-white font-medium'>New Chat</p>}
          </button>
          <div className={`mt-8 text-white/25 text-sm ${expand ? 'block' : 'hidden'}`}>
            <p className='mt-8 ml-2 text-sm text-gray-500'>Recent Chats</p>
            <ChatLabel  />
          </div>
        </div>
        <div>
          <div className={`flex items-center cursor-pointer group relative ${expand ? "gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-xl hover:bg-white/10 cursor-pointer" : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-xl "}`}>
            <Image className={expand ? 'w-5' : "w-6.5 mx-auto"} src={expand ? assets.phone_icon : assets.phone_icon_dull} />
            <div
              className={`absolute ${expand ? 'left-1/2 -translate-x-1/2 -top-60' : ' -top-60'
                } opacity-0 group-hover:opacity-100 hidden group-hover:block transition-all duration-300 z-50`}
            >
              <div className="relative w-48 bg-black text-white text-sm p-3 rounded-xl shadow-lg text-center">
                <Image className="w-44 mx-auto mb-2" src={assets.qrcode} alt="QR Code" />
                <p>Scan to get the App</p>
                <div
                  className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? 'left-1/2 -translate-x-1/2 -bottom-1.5' : 'left-5 -bottom-1.5'
                    }`}
                ></div>
              </div>
            </div>
            {expand && <><span>Get App</span> <Image src={assets.new_icon} /></>}
          </div>
          <div onClick={user ? null : openSignIn} className={`flex items-center ${expand ? "hover:bg-white/10 rounded-lg" : "justify-center w-full"} gap-3 text-white/50 text-sm p-2 mt-2 cursor-pointer transition-all duration-300 hover:text-white`}>
            {
              user ? (
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: `w-8 h-8 ${expand ? 'rounded-full' : 'rounded-lg'}`,
                      userButtonAvatar: `w-8 h-8 ${expand ? '' : 'rounded-lg'}`,
                    },
                  }}
                />
              ) : (
                <Image className='w-7' src={assets.profile_icon} />
              )
            }
            {expand && <span className='text-sm'>{user ? user.firstName : 'Sign In'}</span>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
