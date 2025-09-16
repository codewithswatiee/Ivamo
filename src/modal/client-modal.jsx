"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, X } from "lucide-react"
import { useState } from "react"

const clientTypes = [
  "Everyone",
  "Arts & Culture",
  "Civic & Public",
  "Consumer Brands",
  "Education",
  "Entertainment",
  "Fashion & Beauty",
  "Finance",
  "Food & Drink",
  "Health",
  "Hospitality & Travel",
  "Manufacturing & Industrials",
  "Non-profits",
  "Professional Services",
  "Publishing",
  "Real Estate",
  "Technology",
  "Transport",
]

const clientImages = {
  "Arts & Culture": "https://in.pinterest.com/pin/68747264053/",
  "Civic & Public": "https://in.pinterest.com/pin/375980268891752626/",
  "Consumer Brands": "https://in.pinterest.com/pin/1234567890123456/",
  "Education": "https://in.pinterest.com/pin/1234567890123456/",
  "Entertainment": "https://in.pinterest.com/pin/1234567890123456/",
  "Fashion & Beauty": "https://in.pinterest.com/pin/1234567890123456/",
  "Finance": "https://in.pinterest.com/pin/1234567890123456/",
  "Food & Drink": "https://in.pinterest.com/pin/1234567890123456/",
  "Health": "https://in.pinterest.com/pin/1234567890123456/",
  "Hospitality & Travel": "https://in.pinterest.com/pin/1234567890123456/",
  "Manufacturing & Industrials": "https://in.pinterest.com/pin/1234567890123456/",
  "Non-profits": "https://in.pinterest.com/pin/1234567890123456/",
  "Professional Services": "https://in.pinterest.com/pin/1234567890123456/",
  "Publishing": "https://in.pinterest.com/pin/1234567890123456/",
  "Real Estate": "https://in.pinterest.com/pin/1234567890123456/",
  "Technology": "https://in.pinterest.com/pin/1234567890123456/",
  "Transport": "https://in.pinterest.com/pin/1234567890123456/",
}



export default function ClientModal({
  isOpen,
  onClose,
  currentService,
  currentClient,
  onClientSelect,
  onServiceModalOpen,
}) {
  if (!isOpen) return null
  const [hoveredClient, setHoveredClient] = useState(null)

  const clientRows = [clientTypes.slice(1, 7), clientTypes.slice(7, 13), clientTypes.slice(13)]
  const displayClient = hoveredClient || currentClient
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
            <div className="absolute inset-0 " />
            {/* Images need to be added here */}
            <img
              src={clientImages[displayClient] || clientImages["Arts & Culture"]}
              alt={displayClient}
              className="max-h-full max-w-full object-contain relative z-10 transition-all duration-500 ease-out"
            />
          </div>

          {/* Options Section */}
          <div className="p-5">
            <div className="space-y-4 mb-4">
              {clientRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap justify-center gap-2">
                  {row.map((client) => (
                    <button
                      key={client}
                      onClick={() => {
                        onClientSelect(client, clientTypes.indexOf(client))
                        onClose()
                      }}
                      onMouseEnter={() => setHoveredClient(client)}
                      onMouseLeave={() => setHoveredClient(null)}
                      className={cn(
                        "text-black cursor-pointer transition-all text-base font-medium px-3 py-1 rounded-sm bg-gray-200 hover:bg-gray-300"
                      )}
                    >
                      {client}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* <div className="text-center text-black text-xl">
              <span className="text-gray-600">We design </span>
              <button
                onClick={() => {
                  onClose()
                  onServiceModalOpen()
                }}
                className="font-bold hover:opacity-80 inline-flex items-center gap-1 transition-all duration-300"
              >
                {currentService} <ChevronDown className="w-5 h-5" />
              </button>
              <span className="text-gray-600"> for </span>
              <button
                onClick={onClose}
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
