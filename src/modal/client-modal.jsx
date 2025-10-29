"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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


// Map industry to brands
const industryToBrands = {
  "Arts & Culture": ["Chorus", "Fine Arts", "Do it Up"],
  "Fashion & Lifestyle": ["Chorus", "Plus 91", "SU:VE:OR", "RAF Clothing"],
  "Beauty & Wellness": ["Plus 91", "INIT"],
  "Luxury & Premium Goods": ["rComfort", "INIT", "SU:VE:OR", "Do it Up", "Homestolife"],
  "Furniture & Interiors": ["Burosys", "rComfort", "Do it Up", "Homestolife"],
  "Technology & Innovation": ["Burosys", "Foodoo", "Raise"],
  "Food & Hospitality": ["Foodoo"],
  "Sustainability & Conscious Design": ["SU:VE:OR"],
  "Social Impact": ["Raise"],
  "Retail": ["RAF Clothing"],
  "Wellness": ["Foodoo"],
  "B2B": ["Burosys"],
}

// Map brand to image paths (relative to /public)
const brandToImages = {
  "Burosys": ["/burosys.png", "/burosys2.png"],
  "Plus 91": ["/+91/1.jpg", "/+91/2.svg", "/+91.png", "/+91_2.png"],
  "Chorus": ["/chorus/233.jpg", "/chorus/236.svg", "/chorus-mobile.png", "/chorus.png", "/chorus_banner.jpg"],
  "rComfort": ["/rcomfort.png", "/rcomfort-2.png"],
  "INIT": ["/init/1.jpg", "/init/2.jpg", "/init/3.jpg", "/init/4.jpg", "/init/5.jpg", "/init.png", "/init (2).png", "/init_banner.jpg"],
  "Foodoo": ["/foodo.png", "/foodo2.png"],
  "SU:VE:OR": [],
  "RAF Clothing": ["/raf/1.png", "/raf/2.png", "/raf.png"],
  "Do it Up": ["/doitup/1.jpg", "/doitup.png"],
  "Homestolife": ["/homestolife/1.png", "/homestolife/2.png", "/homestostay.png"],
  "Raise": ["/raise/1.jpg", "/raise/2.svg", "/raise.png", "/Raise_banner.jpg"],
  "Fine Arts": ["/fine-arts.png"],
}



export default function ClientModal({
  isOpen,
  onClose,
  currentService,
  currentClient,
  onClientSelect,
  onServiceModalOpen,
  industryNames = [],
}) {
  if (!isOpen) return null
  const [hoveredClient, setHoveredClient] = useState(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const intervalRef = useRef(null)

  // Get the current industry (hovered or selected)
  const currentIndustry = hoveredClient || currentClient
  // Get all images for brands mapped to this industry
  let imagesForIndustry = (industryToBrands[currentIndustry] || [])
    .flatMap(brand => brandToImages[brand] || [])
    .filter(Boolean)

  // Ensure at least 10 images for each tag (repeat or mix as needed)
  if (imagesForIndustry.length > 0 && imagesForIndustry.length < 10) {
    const original = imagesForIndustry.slice()
    let i = 0
    while (imagesForIndustry.length < 10) {
      imagesForIndustry.push(original[i % original.length])
      i++
    }
  }

  useEffect(() => {
    if (!isOpen) return
    setSlideIndex(0)
    intervalRef.current = setInterval(() => {
      setSlideIndex(prev => imagesForIndustry.length > 0 ? (prev + 1) % imagesForIndustry.length : 0)
    }, 600)
    return () => clearInterval(intervalRef.current)
  }, [isOpen, currentIndustry, imagesForIndustry.length])

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
          {/* Image Section - Slideshow for selected industry */}
          <div className="h-96 w-[70%] mt-7 mx-auto flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 " />
            {imagesForIndustry.length > 0 ? (
              <img
                src={imagesForIndustry[slideIndex]}
                alt={displayClient}
                className="max-h-full max-w-full object-contain relative z-10 transition-all duration-500 ease-out"
              />
            ) : (
              <div className="text-gray-400 text-lg">No images for this industry</div>
            )}
          </div>

          {/* Options Section */}
          <div className="p-5">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {industryNames.map((client) => (
                <button
                  key={client}
                  onClick={() => onClientSelect(client)}
                  onMouseEnter={() => setHoveredClient(client)}
                  onMouseLeave={() => setHoveredClient(null)}
                  className={cn(
                    "text-black cursor-pointer transition-all text-base font-medium px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  )}
                >
                  {client}
                </button>
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
