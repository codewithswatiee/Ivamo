"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"



export default function FloatingSelector({
  currentService,
  currentClient,
  onServiceClick,
  onClientClick,
  className,
  isModalOpen = false,
}) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (isModalOpen) return null

  return (
    <div
      className={cn(
        "fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out",
        isScrolled ? "bottom-8 scale-75 opacity-90" : "top-1/2 -translate-y-1/2 scale-100 opacity-100",
        className,
      )}
    >
      <div className="bg-white/20 backdrop-blur-md px-8 py-6 rounded-lg border border-white/30 shadow-2xl">
        <div className="flex items-center justify-center gap-2 text-xl font-medium text-black">
          <span className="transition-all duration-500">We design</span>

          {/* Service Dropdown */}
          <button
            onClick={onServiceClick}
            className="inline-flex items-center gap-1 font-bold hover:opacity-80 transition-all duration-300 hover:scale-105"
          >
            <span className="whitespace-nowrap transition-all duration-500 ease-in-out">
              {isScrolled ? "Everything" : currentService}
            </span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 hover:rotate-180" />
          </button>

          <span className="transition-all duration-500">for</span>

          {/* Client Dropdown */}
          <button
            onClick={onClientClick}
            className="inline-flex items-center gap-1 font-bold hover:opacity-80 transition-all duration-300 hover:scale-105"
          >
            <span className="whitespace-nowrap transition-all duration-500 ease-in-out">
              {isScrolled ? "Everyone" : currentClient}
            </span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 hover:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  )
}
