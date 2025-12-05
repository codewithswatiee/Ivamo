"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Keep these industry strings aligned with the canonical brandData values
const clientTypes = [
  "Fashion and Apparel",
  "Furniture and home interior",
  "Cosmetics and personal care",
  "SaaS for Hospitality",
  "Fashion and Accessories",
  "Luxury Jewellery",
  "Luxury Event & Decor Services",
  "Home Fragrance & Decor",
  "Personal Care / Grooming",
  "Skincare / Haircare / Beauty Services",
  "Stationery & Art Supplies",
  "Not for profit/ NGO",
  "Everyone"
]


// Map industry to brands
const industryToBrands = {
  "Fashion and Apparel": ["CHORUS", "RAF Clothing"],
  "Furniture and home interior": ["R Comfort", "Homestolife"],
  "Cosmetics and personal care": ["Plus 91", "INIT", "Skift"],
  "SaaS for Hospitality": ["Foodo"],
  "Fashion and Accessories": ["SU:VE:OR"],
  "Luxury Jewellery": ["Fine Arts"],
  "Luxury Event & Decor Services": ["Do It Up"],
  "Home Fragrance & Decor": ["Rad Living"],
  "Skincare / Haircare / Beauty Services": ["Kaya"],
  "Stationery & Art Supplies": ["Scooboo"],
  "Not for profit/ NGO": ["Raise", "Taara"],
  "Everyone": [
    "CHORUS", "R Comfort", "Plus 91", "INIT", "Foodo",
    "SU:VE:OR", "RAF Clothing", "Fine Arts", "Do It Up",
    "Homestolife", "Rad Living", "Skift", "Kaya", "Scooboo",
    "Raise", "Taara"
  ]
};

// Map client types to project IDs (matching the grid data)
const clientTypeToProjectIds = {
  "Fashion and Apparel": ["chorus", "raf-clothing"],
  "Furniture and home interior": ["rComfort", "homestolife"],
  "Cosmetics and personal care": ["plus-91", "init", "skifit"],
  "SaaS for Hospitality": ["foodo"],
  "Fashion and Accessories": ["suveor"],
  "Luxury Jewellery": ["fine-arts"],
  "Luxury Event & Decor Services": ["do-it-up"],
  "Home Fragrance & Decor": ["rad-living"],
  "Personal Care / Grooming": ["plus-91", "init"],
  "Skincare / Haircare / Beauty Services": ["kaya", "skifit"],
  "Stationery & Art Supplies": ["scooboo"],
  "Not for profit/ NGO": ["raise", "taara"],
  "Everyone": ["rComfort", "plus-91", "init", "do-it-up", "fine-arts", "foodo", "scooboo", "skifit", "kaya"]
};


// Map brand to image paths (relative to /public)
// Use canonical brand names (match `brandData`) as keys here so lookups are
// consistent across components.
const brandToImages = {
  "Plus 91": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/%2B91/1.png"],
  "CHORUS": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/chorus/1.jpg"],
  "R Comfort": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/rcomfort/3.png"],
  "INIT": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/init/1.jpg"],
  "Foodo": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/foodo/foodo.png"],
  "SU:VE:OR": [],
  "RAF Clothing": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/raf/1.png"],
  "Do It Up": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/doitup/1.jpg"],
  "Homestolife": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/homestolife/1.png"],
  "Raise": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/raise/5.png"],
  "Fine Arts": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/fine-arts/fine.png"],
  "Rad Living": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/rad_living/2.png"],
  "Skift": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/skifit/skifit1.png"],
  "Kaya": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/kaya/Kaya1.png"],
  "Scooboo": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/Scoobo/sb1.png"],
}



export default function ClientModal({
  isOpen,
  onClose,
  currentService,
  currentClient,
  onClientSelect,
  onServiceModalOpen,
}) {
  const router = useRouter()
  if (!isOpen) return null
  const [hoveredClient, setHoveredClient] = useState(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const intervalRef = useRef(null)

  const handleClientTypeClick = (clientType) => {
    // Close the modal
    onClose()
    
    // Navigate to work page with client type as query parameter
    const encodedClientType = encodeURIComponent(clientType)
    router.push(`/work?clientType=${encodedClientType}`)
  }

  // Get the current industry (only show preview when hovering a tag)
  // NOTE: we intentionally *do not* use `currentClient` here so the modal
  // only shows previews on hover.
  const currentIndustry = hoveredClient || null
  let imagesForIndustry = []
  let displayClient = null

  if (currentIndustry) {
    imagesForIndustry = (industryToBrands[currentIndustry] || [])
      .flatMap(brand => brandToImages[brand] || [])
      .filter(Boolean)
    displayClient = currentIndustry

    // Try fallbacks only when hovered
    if (!imagesForIndustry || imagesForIndustry.length === 0) {
      const candidates = clientTypes
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

    if (imagesForIndustry.length > 0 && imagesForIndustry.length < 10) {
      const original = imagesForIndustry.slice()
      let i = 0
      while (imagesForIndustry.length < 10) {
        imagesForIndustry.push(original[i % original.length])
        i++
      }
    }

    if (!imagesForIndustry || imagesForIndustry.length === 0) {
      imagesForIndustry = [
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%238b8b8b" font-size="20">No preview available</text></svg>'
      ]
      displayClient = 'Preview'
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
    <div className="fixed inset-0 z-[100] bg-gray/80 backdrop-blur-2xl">
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
            {currentIndustry ? (
              imagesForIndustry.length > 0 ? (
                <img
                  src={imagesForIndustry[slideIndex]}
                  alt={displayClient}
                  className="max-h-full max-w-full object-contain relative z-10 transition-all duration-500 ease-out"
                />
              ) : (
                <div className="text-gray-400 text-lg">No images for this industry</div>
              )
            ) : (
              <div className="text-gray-500 text-lg">Hover a tag to preview</div>
            )}
          </div>

          {/* Options Section */}
          <div className="p-5">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {clientTypes.map((client) => (
                <button
                  key={client}
                  onClick={() => handleClientTypeClick(client)}
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
