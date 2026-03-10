"use client"
import React, { useState, useEffect, useRef } from 'react'

export default function AnimatedImage({ 
  desktopSrc, 
  mobileSrc, 
  alt, 
  className = "", 
  imgClassName = "",
  style 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <div className={`relative overflow-hidden bg-neutral-100/50 ${className}`} style={style}>
       {!isLoaded && <div className="absolute inset-0 bg-neutral-200/50 animate-pulse transition-opacity duration-300 pointer-events-none" />}
       <picture>
         {desktopSrc && <source media="(min-width: 768px)" srcSet={desktopSrc} />}
         <img
          ref={imgRef}
          src={mobileSrc || desktopSrc}
          alt={alt || "Image"}
          className={`w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-[8px] scale-[1.03]'} ${imgClassName}`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />
       </picture>
    </div>
  )
}
