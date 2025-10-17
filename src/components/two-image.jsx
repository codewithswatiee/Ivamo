"use client"

import { useState } from "react"
import Link from "next/link"


export default function PortfolioSection({ left, right, headerLabel = "See latest projects", showHeader = false }) {
  const [leftHovered, setLeftHovered] = useState(false)
  const [rightHovered, setRightHovered] = useState(false)

  const isExternal = (url) => /^https?:\/\//i.test(url)

  return (
    <div className="w-full mt-5 bg-white">
      {/* Header */}
      {showHeader && <div className="text-center font-regular py-4">
        <p className="text-gray-400 text-md">{headerLabel}</p>
        <div className="mt-2">
          <svg className="w-4 h-4 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>}

  {/* Portfolio Grid */}
  {/* NOTE: Keep original spacing and sizes on desktop; on mobile stack naturally without forcing full viewport height */}
  <div className="flex gap-3 px-4 mb-2 flex-col md:flex-row">
        {/* Left Project */}
  <div className="flex-1 cursor-pointer">
          {/* Image Container with Link */}
          <div
            className="relative mb-3"
            onMouseEnter={() => setLeftHovered(true)}
            onMouseLeave={() => setLeftHovered(false)}
          >
            <Link
              href={left.href}
              aria-label={left.title}
              target={isExternal(left.href) ? "_blank" : undefined}
              rel={isExternal(left.href) ? "noopener noreferrer" : undefined}
            >
              {/* Use <picture> to switch images between desktop and mobile */}
              <picture>
                <source media="(min-width: 768px)" srcSet={left.imageSrcDesktop || left.imageSrc || "/placeholder.svg"} />
                <img
                  src={left.imageSrcMobile || left.imageSrc || "/placeholder.svg"}
                  alt={left.imageAlt || left.alt}
                  className="w-full object-cover h-auto md:h-auto"
                />
              </picture>
            </Link>
          </div>

          {/* Project Info */}
          <div className="space-y-0">
            <h2 className="font-[300] text-black" style={{ color: '#000000', fontSize: '14px' , lineHeight: '20px'}}>{left.title}</h2>
            <p className="font-[200]" style={{ color: '#767676', fontSize: '14px', lineHeight: '20px' }}>{left.description}</p>

            {/* Category Tags - Show on hover */}
            <div
              className={`flex gap-2 mt-1 mb-1 transition-all duration-300 ${
                leftHovered ? "opacity-100 -translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              {left.tags.map((tag, i) => (
                <span
                  key={i}
                      className="font-[100] px-2 py-0.5 rounded text-[12px] md:text-[14px]"
                      style={{ background: '#EDEDED', color: '#000000' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Project */}
  <div className="flex-2 cursor-pointer">
          {/* Image Container with Link */}
          <div
            onMouseEnter={() => setRightHovered(true)}
            onMouseLeave={() => setRightHovered(false)}
            className="relative mb-6"
          >
            <Link
              href={right.href}
              aria-label={right.title}
              target={isExternal(right.href) ? "_blank" : undefined}
              rel={isExternal(right.href) ? "noopener noreferrer" : undefined}
            >
              <picture>
                <source media="(min-width: 768px)" srcSet={right.imageSrcDesktop || right.imageSrc || "/placeholder.svg"} />
                {/* On mobile make the right image taller to match design */}
                <img
                  src={right.imageSrcMobile || right.imageSrc || "/placeholder.svg"}
                  alt={right.imageAlt || right.alt}
                  className="w-full object-cover h-[620px] md:h-[620px]"
                  style={{ minHeight: '620px' }}
                />
              </picture>
            </Link>
          </div>

          {/* Project Info */}
          <div className="space-y-0">
            <h2 className="font-[300] text-black" style={{ color: '#000000', fontSize: '14px', lineHeight: '20px' }}>{right.title}</h2>
            <p className="font-[200]" style={{ color: '#767676', fontSize: '14px', lineHeight: '20px' }}>{right.description}</p>

            {/* Category Tags - Show on hover */}
            <div
              className={`flex gap-2 mt-1 mb-1 transition-all duration-300 ${
                rightHovered ? "opacity-100 -translate-y-0" : "opacity-0 -translate-y-4"
              }`}
            >
              {right.tags.map((tag, i) => (
                <span
                  key={i}
                      className="font-[100] px-2 py-0.5 rounded text-[12px] md:text-[14px]"
                      style={{ background: '#EDEDED', color: '#000000' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
