"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, X } from "lucide-react"

const designServices = [
  "Everything",
  "Books",
  "Brand Identity",
  "Brand Strategy",
  "Campaigns",
  "Data Driven Experiences",
  "Digital Experiences",
  "Exhibitions",
  "Industrial/Product Design",
  "Motion Graphics & Film",
  "Packaging",
  "Publications",
  "Signage & Environmental Graphics",
  "Typefaces",
]

const serviceImages = {
  Books: "/book-design-typography-layout.jpg",
  "Brand Identity": "/brand-identity-logo-design.jpg",
  "Brand Strategy": "/brand-strategy-planning-diagram.jpg",
  Campaigns: "/marketing-campaign-design-black-white.jpg",
  "Data Driven Experiences": "/data-visualization-dashboard.png",
  "Digital Experiences": "/digital-interface-design.jpg",
  Exhibitions: "/exhibition-design-museum-display.jpg",
  "Industrial/Product Design": "/product-design-industrial.jpg",
  "Motion Graphics & Film": "/motion-graphics-film-production.jpg",
  Packaging: "/package-design-product-branding.jpg",
  Publications: "/publication-design-magazine-layout.jpg",
  "Signage & Environmental Graphics": "/environmental-signage-wayfinding.jpg",
  Typefaces: "/typography-typeface-design-letters.jpg",
}

export default function ServiceModal({
  isOpen,
  onClose,
  selectedService,
  currentClient,
  onServiceSelect,
  onClientModalOpen,
}) {
  const [hoveredService, setHoveredService] = useState(null)

  if (!isOpen) return null

  const displayService = hoveredService || selectedService
  const serviceRows = [
    ["Books", "Brand Identity", "Brand Strategy", "Campaigns", "Data Driven Experiences", "Digital Experiences"],
    ["Exhibitions", "Industrial/Product Design", "Motion Graphics & Film", "Packaging", "Publications"],
    ["Signage & Environmental Graphics", "Typefaces"],
  ]

  return (
    <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-xl">
      {/* Fixed close button */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-[101]"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl mx-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
          {/* Image Section */}
          <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
            <img
              src={serviceImages[displayService] || serviceImages["Brand Strategy"]}
              alt={displayService}
              className="max-h-full max-w-full object-contain relative z-10 transition-all duration-500 ease-out"
            />
          </div>

          {/* Options Section */}
          <div className="p-8">
            <div className="space-y-4 mb-8">
              {serviceRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap justify-center gap-3">
                  {row.map((service) => (
                    <button
                      key={service}
                      onClick={() => onServiceSelect(service, designServices.indexOf(service))}
                      onMouseEnter={() => setHoveredService(service)}
                      onMouseLeave={() => setHoveredService(null)}
                      className={cn(
                        "text-black text-base font-medium transition-all duration-300 px-6 py-3 rounded-full border border-gray-300",
                        selectedService === service
                          ? "bg-black text-white font-bold border-black scale-105"
                          : "hover:bg-gray-50 hover:border-gray-500 hover:scale-105 hover:shadow-md",
                      )}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="text-center text-black text-xl bg-white/60 backdrop-blur-sm px-8 py-4 rounded-lg border border-gray-200 mx-auto max-w-fit">
              <span className="text-gray-600">We design </span>
              <button
                onClick={onClose}
                className="font-bold hover:opacity-80 inline-flex items-center gap-1 transition-all duration-300"
              >
                {selectedService} <ChevronDown className="w-5 h-5" />
              </button>
              <span className="text-gray-600"> for </span>
              <button
                onClick={() => {
                  onClose()
                  onClientModalOpen()
                }}
                className="font-bold hover:opacity-80 inline-flex items-center gap-1 transition-all duration-300"
              >
                {currentClient} <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
