"use client";

import { useState } from 'react';

export default function PortfolioSection() {
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="text-center py-8">
        <p className="text-gray-600 text-lg">See latest projects</p>
        <div className="mt-2">
          <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="flex gap-8 px-8">
        {/* Left Project - Anna Sui Book */}
        <div 
          className="flex-1 cursor-pointer"
          onMouseEnter={() => setLeftHovered(true)}
          onMouseLeave={() => setLeftHovered(false)}
        >
          {/* Image Container */}
          <div className="relative mb-6">
            <img src="/Anna.png" alt="The Nineties x Anna Sui" className="w-full h-auto" />
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">
              'The Nineties x Anna Sui'
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Book design for a new monograph on the influential fashion designer's era-defining work in the 1990s.
            </p>

            {/* Category Tags - Show on hover */}
            <div className={`flex gap-2 transition-all duration-300 ${
              leftHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium">
                Fashion & Beauty
              </span>
              <span className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium">
                Arts & Culture
              </span>
            </div>
          </div>
        </div>

        {/* Right Project - Baret Scholars */}
        <div 
          className="flex-2 cursor-pointer"
          onMouseEnter={() => setRightHovered(true)}
          onMouseLeave={() => setRightHovered(false)}
        >
          {/* Image Container */}
          <div className="relative mb-6">
            <img src="/barret.png" alt="Baret Scholars" className="w-full h-auto" />
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-black">
              Baret Scholars
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Visual identity for a unique educational program that takes students around the world during their gap year.
            </p>

            {/* Category Tags - Show on hover */}
            <div className={`flex gap-2 transition-all duration-300 ${
              rightHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium">
                Education
              </span>
              <span className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium">
                Branding
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}