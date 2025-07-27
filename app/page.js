'use client';
import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#1e1f22] text-white">
      <div className="flex h-screen overflow-hidden">
        <Sidebar expand={expand} setExpand={setExpand} />
        <div className="flex-1 flex flex-col px-4 pb-12 bg-[#292a2d] transition-all duration-300 relative">

          {/* Mobile Top Bar */}
          <div className="md:hidden absolute top-4 left-0 right-0 px-4 flex items-center justify-between z-10">
            <Image
              onClick={() => setExpand(!expand)}
              className={`w-6 h-6 cursor-pointer transform transition-transform duration-300 ${expand ? 'rotate-180' : ''}`}
              src={assets.menu_icon}
              alt="Menu"
            />
            <Image className="w-6 h-6 opacity-70" src={assets.chat_icon} alt="Chat" />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto">
            {messages.length === 0 ? (
              <>
                {/* Welcome Message */}
                <div className="flex flex-col items-center justify-center text-center space-y-3 mt-32">
                  <Image className="w-24 h-24 mb-4" src={assets.logo_icon} alt="Logo" />
                  <h1 className="text-2xl font-semibold">Hi User, I'm <span className="text-blue-500">Deepseek</span></h1>
                  <p className="text-sm text-gray-400 max-w-xs">How can I help you today?</p>
                </div>
                {/* PromptBox After Welcome Message */}
                <div className="flex justify-center mt-10">
                  <PromptBox isloading={isloading} setIsLoading={setIsLoading} />
                </div>
              </>
            ) : (
              <>
                {/* Messages */}
                <div>
                  <Message role="ai" content="Hello, how are you?" />
                </div>
              </>
            )}
          </div>

          {/* PromptBox at Bottom when Chat is Active */}
          {messages.length !== 0 && (
            <div className="max-w-3xl mx-auto w-full">
              <PromptBox isloading={isloading} setIsLoading={setIsLoading} />
            </div>
          )}

          {/* Bottom Disclaimer */}
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center px-4">
            <p className="text-[10px] text-gray-500 bg-[#1a1a1c] px-3 py-1 rounded-md shadow-inner">
              AI-generated, for reference only
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
