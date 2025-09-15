"use client"

import { cn } from "@/lib/utils"
import { ChevronDown, X } from "lucide-react"

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


export default function ClientModal({
  isOpen,
  onClose,
  currentService,
  currentClient,
  onClientSelect,
  onServiceModalOpen,
}) {
  if (!isOpen) return null

  const clientRows = [clientTypes.slice(1, 7), clientTypes.slice(7, 13), clientTypes.slice(13)]

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
          <div className="h-96 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50" />
            <img
              src="/client-industry-business.jpg"
              alt="Client Industries"
              className="max-h-full max-w-full object-contain relative z-10"
            />
          </div>

          {/* Options Section */}
          <div className="p-8">
            <div className="space-y-4 mb-8">
              {clientRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-wrap justify-center gap-3">
                  {row.map((client) => (
                    <button
                      key={client}
                      onClick={() => {
                        onClientSelect(client, clientTypes.indexOf(client))
                        onClose()
                      }}
                      className={cn(
                        "text-black text-base font-medium transition-all duration-300 px-6 py-3 rounded-full border-2",
                        currentClient === client
                          ? "bg-black text-white font-bold border-black scale-105"
                          : "hover:bg-gray-100 border-gray-200 hover:border-gray-400 hover:scale-105",
                      )}
                    >
                      {client}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="text-center text-black text-xl">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
