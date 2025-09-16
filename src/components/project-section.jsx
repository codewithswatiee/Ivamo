"use client";

import { useState } from 'react';

export default function PortfolioSection() {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  return (
    <div className="w-full mt-5 font-regular">
      {/* Header */}
      <div className="text-center font-regular py-8">
        <p className="text-gray-400 text-md">See latest projects</p>
        <div className="mt-2">
          <svg className="w-4 h-4 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="flex h-[100vh] gap-3 px-8">
        {/* Left Project - Anna Sui Book */}
        <div 
          className="flex-1 cursor-pointer"
        >
          {/* Image Container */}
          <div 
            className="relative mb-3"
            onMouseEnter={() => setLeftHovered(true)}
            onMouseLeave={() => setLeftHovered(false)}
            >
            <img src="/Anna.png" alt="The Nineties x Anna Sui" className="w-full h-auto" />
          </div>

          {/* Project Info */}
          <div className="space-y-0">
            <h2 className="text-md font-[300] text-black">
              'The Nineties x Anna Sui'
            </h2>
            <p className="text-gray-500 font-[200]">
              Book design for a new monograph on the influential fashion designer's era-defining work in the 1990s.
            </p>

            {/* Category Tags - Show on hover */}
            <div className={`flex gap-2 mt-1 transition-all duration-300 ${
              leftHovered ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              <span className="bg-gray-100 text-gray-800/80 font-[100] px-2 py-0.5 rounded text-sm">
                Fashion & Beauty
              </span>
              <span className="bg-gray-100 text-gray-800/80 font-[100] px-2 py-0.5 rounded text-sm">
                Arts & Culture
              </span>
            </div>
          </div>
        </div>

        {/* Right Project - Baret Scholars */}
        <div 
          className="flex-2 cursor-pointer"
        >
          {/* Image Container */}
          <div 
            onMouseEnter={() => setRightHovered(true)}
            onMouseLeave={() => setRightHovered(false)}
            className="relative mb-6">
            <img src="/barret.png" alt="Baret Scholars" className="w-full h-auto" />
          </div>

          {/* Project Info */}
          <div className="space-y-0">
            <h2 className="text-md font-[300] text-black">
              Baret Scholars
            </h2>
            <p className="text-gray-500 font-[200]">
              Visual identity for a unique educational program that takes students around the world during their gap year.
            </p>

            {/* Category Tags - Show on hover */}
            <div className={`flex gap-2 mt-1 mb-1 transition-all duration-300 ${
              rightHovered ? 'opacity-100 -translate-y-0' : 'opacity-0 -translate-y-4'
            }`}>
              <span className="bg-gray-100 text-gray-800/80 font-[100] px-2 py-0.5 rounded text-sm">
                Education
              </span>
              <span className="bg-gray-100 text-gray-800/80 font-[100] px-2 py-0.5 rounded text-sm">
                Branding
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}