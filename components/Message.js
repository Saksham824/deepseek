import React from 'react'
import Image from 'next/image';
import { assets } from "@/assets/assets";

const Message = ({role,content}) => {
  return (
    <div className='flex mt-80 flex-col items-center w-full max-w-3xl text-sm '>
      <div className={`flex flex-col w-full mb-8 ${role === 'user' && 'items-end' }`}>
        <div className={`group relative max-w-2xl py-3 rounded-xl  ${role === 'user' ? 'bg-[#414158] px-5 ' : 'gap-3'}`}>
            <div className={`opacity-0 group-hover:opacity-100 absolute ${role === 'user' ? '-left-16 top-2.5' : 'left-9 -bottom-2.5'} transition-all duration-300 `}>
                <div className='flex items-center gap-2 '>
                    {role === 'user' ? (
                        <>
                        <Image className='w-4 cursor-pointer' src={assets.copy_icon} alt="User Icon" />
                        <Image className='w-4 cursor-pointer' src={assets.pencil_icon} alt="Copy Icon" />
                        </>
                    ):<>
                        <Image className='w-4.5 cursor-pointer' src={assets.copy_icon} alt="Copy Icon" />
                        <Image className='w-4 cursor-pointer' src={assets.regenerate_icon} alt="Regenerate Icon" />
                        <Image className='w-4 cursor-pointer' src={assets.like_icon} alt="Like Icon" />
                        <Image className='w-4 cursor-pointer' src={assets.dislike_icon} alt="Dislike Icon" />
                    </>}
                </div>
            </div>
            {role === 'user' ? (
                (
                    <span className='text-white/90'>{content}</span>
                )
            ):(
                <>
                <Image src={assets.logo_icon} className='h-9 w-9 p-1 border border-white/15 rounded-full' />
                <div className='space-y-4 w-full overflow-scroll'>{content}</div>
                </>
            )}
        </div>
      </div>
    </div>
  )
}

export default Message
