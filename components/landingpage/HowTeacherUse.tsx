"use client";
import { useState } from "react";
import video from "../../public/video.png";

// Play icon component

// Download icon component
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const HowTeacherUse = () => {
 
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video Section */}
        <div className="grid grid-cols-2 gap-4 mt-8 sm:mt-0">
            <div className="aspect-[5/6] rounded-lg overflow-hidden bg-purple-50">
              <img
                src={"girlwithbook.jpg"}
                alt="Student with bow tie"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[5/6] rounded-lg overflow-hidden bg-green-50">
              <img
                src={"studentteacher.png"}
                alt="Student with curly hair"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[5/6] rounded-lg overflow-hidden bg-blue-50 col-span-2 sm:col-span-1">
              <img
                src={"girlboy.png"}
                alt="Student with books"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[5/6] rounded-lg overflow-hidden bg-purple-50 col-span-2 sm:col-span-1">
              <img
                src={"boywithphone.png"}
                alt="Student with notebook"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Content Section */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              How Teachers Use
              <br />
              Notifly: Watch Now
            </h2>
            <p className="text-gray-600">
              Notify is transforming how teachers connect with families. See how
              educators send quick updates as they teach. Just faster, clearer
              communication that keeps everyone in sync.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 text-white font-medium flex items-center gap-2 hover:opacity-90 transition-opacity">
                <DownloadIcon />
                Download Application
              </button>
              <button className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowTeacherUse;
