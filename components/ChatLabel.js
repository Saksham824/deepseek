import { assets } from '@/assets/assets';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const ChatLabel = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  // Hide on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex items-center justify-between hover:bg-white/10 text-white/80 p-2 rounded-xl text-sm group cursor-pointer transition-all duration-300'>
      <p className='truncate'>Chat Name Here</p>

      <div onClick={(e) => {
        e.stopPropagation();
        setShowMenu(prev => !prev);
      }} ref={menuRef} className='relative flex items-center justify-center h-6 w-6 aspect-square rounded-lg hover:bg-black/80'>
        <Image
          className='w-4 cursor-pointer'
          src={assets.three_dots}

        />

        {showMenu && (
          <div className='absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 text-white shadow-lg z-10'>
            <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300'>
              <Image className='w-4' src={assets.pencil_icon} />
              <p>Rename</p>
            </div>
            <div className='flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg cursor-pointer transition-all duration-300'>
              <Image className='w-4' src={assets.delete_icon} />
              <p className='text-red-400'>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLabel;
