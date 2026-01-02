"use client";

import { useState } from "react";
import { useOptInDialog } from "./OptInDialogProvider";
import { StoreButtons } from "./StoreButton";
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="white"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="opacity-80"
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export default function Cta() {
  const { open, setOpen } = useOptInDialog();
   const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
    // In a real implementation, you would play the video here
  };

  return (
    <section className="max-w-[90rem] px-4 sm:px-8 md:px-16 mx-auto py-10 md:py-16">
      <div className=" px-0 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start ">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl  text-gray-900  font-medium ">
            Empowering Educators
              <br />
              Connecting Staff
              <br/>
              Engaging Families
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 text-sm md:text-base">
                Notifly is the fastest way to keep your communication streamlined.
              </p>
              <p className="text-gray-600 text-sm md:text-base sm:w-[75%]">
              Designed for speed and built for real-world workflows, Notifly helps educators send, organize, and manage messages effortlessly. Send your update where it needs to go — instantly and reliably.
              </p>
              <div>
              <button onClick={(s) => setOpen(true)} className="cursor-pointer bg-gradient-to-r from-[#77A1D3] via-[#79CBCA] to-[#77A1D3] bg-[length:200%_auto] hover:bg-[position:100%] text-white px-8 py-3 m-2.5 rounded-full shadow-[0_0_20px_#eee] transition-all duration-500 text-sm md:text-base">
              Teacher sign-up
              </button>
            </div>
            </div>
         <StoreButtons/>
          </div>

           <div className="relative rounded-lg overflow-hidden shadow-lg">
              <video
                autoPlay
                muted
                loop
                playsInline
                controls
                className="w-full aspect-[4/3] object-cover rounded-lg"
                src="notifly-landing-video.MP4" 
              >
                Your browser does not support the video tag.
              </video>
           </div>
          {/* <div className="relative rounded-lg overflow-hidden shadow-lg">
            {isPlaying ? (
              <video
                autoPlay
                muted
                playsInline
                controls
                className="w-full aspect-[4/3] object-cover rounded-lg"
                src="notifly-landing-video.MP4" 
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div
                className="relative cursor-pointer"
                onClick={handlePlayVideo}
              >
                <img
                  src="video-poster.png"
                  alt="Teachers using Notifly in classroom"
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black bg-opacity-50 p-4 flex items-center justify-center">
                    <PlayIcon />
                  </div>
                </div>
              </div>
            )}
          </div> */}

        </div>
      </div>
    </section>
  );
}
