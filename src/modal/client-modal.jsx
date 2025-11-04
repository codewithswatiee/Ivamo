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
  "Arts & Culture": ["Chorus", "rComfort", "Do it Up", "Fine Arts", "Homestolife", "RAF Clothing", "Foodo", "INIT"],
  "Fashion & Lifestyle": ["Chorus", "Plus 91", "SU:VE:OR", "RAF Clothing"],
  "Beauty & Wellness": ["Plus 91", "INIT"],
  "Luxury & Premium Goods": ["rComfort", "INIT", "SU:VE:OR", "Do it Up", "Homestolife"],
  "Furniture & Interiors": ["rComfort", "INIT"],
  "Technology & Innovation": [ "Foodoo", "Raise"],
  "Food & Hospitality": ["Foodoo"],
  "Sustainability & Conscious Design": ["SU:VE:OR", "Plus 91"],
  "Social Impact": ["Raise"],
  "Retail": ["RAF Clothing"],
  "Wellness": ["Foodoo"],
  "Everyone": ["Chorus", "rComfort", "Plus 91", "INIT", "Foodoo", "SU:VE:OR", "RAF Clothing", "Fine Arts", "Raise", "Do it Up", "Homestolife"],
}

// Map brand to image paths (relative to /public)
const brandToImages = {
  "Plus 91": ["/+91/1.png"],
  "Chorus": ["/chorus/1.jpg"],
  "rComfort": ["/rcomfort/3.png"],
  "INIT": ["/init/1.jpg"],
  "Foodoo": ["/foodo.png"],
  "SU:VE:OR": [],
  "RAF Clothing": ["/raf/1.png"],
  "Do it Up": ["/doitup/1.jpg"],
  "Homestolife": ["/homestolife/1.png"],
  "Raise": ["/raise/5.png"],
  "Fine Arts": ["/fine-arts/fine.png"],
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
  let displayClient = currentIndustry

  // If there are no images for the current industry, try fallbacks:
  // 1) prefer the first industry in industryNames (skip 'Everyone' if others exist)
  // 2) pick the first industry in industryNames that has images
  // 3) pick the first non-empty brand images from brandToImages
  // 4) final fallback: inline SVG data URL so we always have an image
  if (!imagesForIndustry || imagesForIndustry.length === 0) {
    const candidates = Array.isArray(industryNames) && industryNames.length > 0
      ? industryNames
      : Object.keys(industryToBrands)

    let found = []
    for (let i = 0; i < candidates.length; i++) {
      const cand = candidates[i]
      if (cand === 'Everyone' && candidates.length > 1) continue
      const imgs = (industryToBrands[cand] || [])
        .flatMap(b => brandToImages[b] || [])
        .filter(Boolean)
      if (imgs && imgs.length > 0) {
        found = imgs
        displayClient = cand
        break
      }
    }

    if (!found || found.length === 0) {
      for (const arr of Object.values(brandToImages)) {
        if (Array.isArray(arr) && arr.length > 0) {
          found = arr.slice()
          displayClient = 'Featured'
          break
        }
      }
    }

    imagesForIndustry = found || []
  }

  if (!imagesForIndustry || imagesForIndustry.length === 0) {
    imagesForIndustry = [
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%238b8b8b" font-size="20">No preview available</text></svg>'
    ]
    displayClient = 'Preview'
  }

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

  
  return (
    <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl">
      {/* Fixed close button */}
      <button
        onClick={onClose}
        className="fixed top-8 cursor-pointer right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-[101]"
      >
        <X className="w-6 h-6 text-black" />
      </button>

      <div className="absolute top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl mx-4">
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
