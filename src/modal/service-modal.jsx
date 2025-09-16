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
  Books: "https://in.pinterest.com/pin/6896205672964547/",
  "Brand Identity": "https://in.pinterest.com/pin/844493675684058/",
  "Brand Strategy": "https://in.pinterest.com/pin/5348093302329626/",
  Campaigns: "https://in.pinterest.com/pin/1234567890123456/",
  "Data Driven Experiences": "https://in.pinterest.com/pin/1234567890123456/",
  "Digital Experiences": "https://in.pinterest.com/pin/1234567890123456/",
  Exhibitions: "https://in.pinterest.com/pin/1234567890123456/",
  "Industrial/Product Design": "https://in.pinterest.com/pin/1234567890123456/",
  "Motion Graphics & Film": "https://in.pinterest.com/pin/1234567890123456/",
  Packaging: "https://in.pinterest.com/pin/1234567890123456/",
  Publications: "https://in.pinterest.com/pin/1234567890123456/",
  "Signage & Environmental Graphics": "https://in.pinterest.com/pin/1234567890123456/",
  Typefaces: "https://in.pinterest.com/pin/1234567890123456/",
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

      <div className="absolute top-[62%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl mx-4">
        <div className="bg-gray-100 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl">
          {/* Image Section */}
          <div className="h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" />
            <img
              src={serviceImages[displayService] || serviceImages["Brand Strategy"]}
              alt={displayService}
              className="max-h-full max-w-full object-contain relative z-10 transition-all duration-500 ease-out"
            />
          </div>

          {/* Options Section */}
          <div className="p-5">
            <div className="space-y-4 mb-4">
              {serviceRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap justify-center gap-2">
                  {row.map((service) => (
                    <button
                      key={service}
                      onClick={() => onServiceSelect(service, designServices.indexOf(service))}
                      onMouseEnter={() => setHoveredService(service)}
                      onMouseLeave={() => setHoveredService(null)}
                      className={cn(
                        "text-black cursor-pointer transition-all text-base font-medium px-3 py-1 rounded-sm bg-gray-200 hover:bg-gray-300"
                      )}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* <div className="text-center text-black text-xl bg-white/60 backdrop-blur-sm px-8 py-4 rounded-lg border border-gray-200 mx-auto max-w-fit">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
