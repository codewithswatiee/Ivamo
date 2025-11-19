"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const designServices = [
  "Website",
  "UI/UX", 
  "Digital Experience",
  "Platform Design",
  "Brand Identity",
  "Visual Storytelling",
  "Brand Creation",
  "Art Direction", 
  "Creative Direction",
  "Visual Identity",
  "Packaging",
  "E-Commerce",
  "Product Strategy",
  "Performance Marketing",
  "MarComm",
  "Go-To-Market Strategy",
  "Everything"
]


// Map design to brands
const designToBrands = {
  "Website": [
    "CHORUS", "R Comfort", "INIT", "Foodo",
    "RAF Clothing", "Fine Arts", "Do It Up",
    "Homestolife", "Raise", "Taara"
  ],
  "UI/UX": [
    "CHORUS", "R Comfort", "INIT", "Foodo",
    "RAF Clothing", "Fine Arts", "Do It Up",
    "Homestolife", "Raise", "Taara"
  ],
  "Digital Experience": [
    "CHORUS", "Foodo", "Do It Up"
  ],
  "Platform Design": [
    "CHORUS", "Homestolife"
  ],
  "Brand Identity": [
    "R Comfort", "INIT"
  ],
  "Visual Storytelling": [
    "R Comfort", "INIT", "Fine Arts"
  ],
  "Brand Creation": [
    "R Comfort", "Plus 91", "SU:VE:OR"
  ],
  "UI/UX": [
    "CHORUS", "R Comfort", "INIT", "Foodo",
    "RAF Clothing", "Fine Arts", "Do It Up",
    "Homestolife", "Raise", "Taara"
  ],
  "Art Direction": [
    "R Comfort", "Fine Arts"
  ],
  "Creative Direction": [
    "R Comfort", "Plus 91", "SU:VE:OR", "Do It Up"
  ],
  "Visual Identity": [
    "R Comfort", "Plus 91", "SU:VE:OR", "Foodo",
    "RAF Clothing", "Do It Up", "Homestolife"
  ],
  "Packaging": [
    "Plus 91", "INIT", "Skift"
  ],
  "E-Commerce": [
    "RAF Clothing"
  ],
  "Product Strategy": [
    "SU:VE:OR"
  ],
  "Performance Marketing": [
    "Rad Living"
  ],
  "MarComm": [
    "Rad Living", "Skift"
  ],
  "Go-To-Market Strategy": [
    "Skift"
  ],
  "Everything": [
    "CHORUS", "R Comfort", "Plus 91", "INIT", "Foodo",
    "SU:VE:OR", "RAF Clothing", "Fine Arts", "Do It Up",
    "Homestolife", "Rad Living", "Skift", "Kaya", "Scooboo",
    "Raise", "Taara"
  ]
};


// Map brand to image paths (relative to /public)
// Use canonical brand names (match `brandData`) as keys so lookups are
// consistent across components.
const brandToImages = {
  "Plus 91": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/%2B91/1.png"],
  "CHORUS": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/chorus/1.jpg"],
  "R Comfort": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/rcomfort/3.png"],
  "INIT": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/init/1.jpg"],
  "Foodo": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/foodo.png"],
  "SU:VE:OR": [],
  "RAF Clothing": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/raf/1.png"],
  "Do It Up": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/doitup/1.jpg"],
  "Homestolife": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/homestolife/1.png"],
  "Raise": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/raise/5.png"],
  "Fine Arts": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/fine-arts/fine.png"],
  "Scooboo": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/Scooboo/sb1.png"],
  "Skift": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/skifit/skifit1.png"],
  "Kaya": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/kaya/Kaya1.png"],
  "Rad Living": ["https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/rad_living/2.png"],
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
  const [slideIndex, setSlideIndex] = useState(0)
  const intervalRef = useRef(null)

  // Get the current design (only show preview when hovering a tag)
  // NOTE: we intentionally *do not* use `selectedService` here so that
  // the modal only shows previews on hover.
  const currentDesign = hoveredService || null

  // Compute images only when there is a hovered design. When nothing is
  // hovered we show a neutral placeholder.
  let imagesForDesign = []
  let displayDesign = null

  if (currentDesign) {
    imagesForDesign = (designToBrands[currentDesign] || [])
      .flatMap(brand => brandToImages[brand] || [])
      .filter(Boolean)
    displayDesign = currentDesign

    // If there are no images for the hovered design, try reasonable fallbacks
    // (only when hovered). This keeps the preview helpful while preserving
    // the "hover-only" behaviour.
    if (!imagesForDesign || imagesForDesign.length === 0) {
      const candidates = designServices
      let found = []
      for (let i = 0; i < candidates.length; i++) {
        const cand = candidates[i]
        if (cand === 'Everything' && candidates.length > 1) continue
        const imgs = (designToBrands[cand] || [])
          .flatMap(b => brandToImages[b] || [])
          .filter(Boolean)
        if (imgs && imgs.length > 0) {
          found = imgs
          displayDesign = cand
          break
        }
      }

      if (!found || found.length === 0) {
        for (const arr of Object.values(brandToImages)) {
          if (Array.isArray(arr) && arr.length > 0) {
            found = arr.slice()
            displayDesign = 'Featured'
            break
          }
        }
      }

      imagesForDesign = found || []
    }

    // Ensure at least 10 images for preview slideshow when hovered
    if (imagesForDesign.length > 0 && imagesForDesign.length < 10) {
      const original = imagesForDesign.slice()
      let i = 0
      while (imagesForDesign.length < 10) {
        imagesForDesign.push(original[i % original.length])
        i++
      }
    }

    // Last-resort placeholder when hovered but absolutely no images found
    if (!imagesForDesign || imagesForDesign.length === 0) {
      imagesForDesign = [
        'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%238b8b8b" font-size="20">No preview available</text></svg>'
      ]
      displayDesign = 'Preview'
    }
  }

  useEffect(() => {
    if (!isOpen) return
    setSlideIndex(0)
    intervalRef.current = setInterval(() => {
      setSlideIndex(prev => imagesForDesign.length > 0 ? (prev + 1) % imagesForDesign.length : 0)
    }, 600)
    return () => clearInterval(intervalRef.current)
    // Only rerun when modal opens or hovered/selected design changes
  }, [isOpen, currentDesign, imagesForDesign.length])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-gray/80 backdrop-blur-2xl">
      {/* Fixed close button */}
      <button
        onClick={onClose}
        className="fixed cursor-pointer top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-[101]"
      >
        <X className="w-6 h-6 text-black" />
      </button>

      <div className="absolute top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl mx-4">
        <div className="bg-gray-100 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl">
          {/* Image Section - Slideshow for selected design */}
          <div className="h-[400px] pt-4 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" />
            {currentDesign ? (
              imagesForDesign.length > 0 ? (
                <img
                  src={imagesForDesign[slideIndex]}
                  alt={currentDesign}
                  className="max-h-full max-w-full object-contain relative z-10 transition-all duration-500 ease-out"
                  style={{ minWidth: 200, minHeight: 200 }}
                />
              ) : (
                <div className="text-gray-400 text-lg">No images for this design</div>
              )
            ) : (
              <div className="text-gray-500 text-lg">Hover a tag to preview</div>
            )}
          </div>

          {/* Options Section */}
          <div className="p-5">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {designServices.map((service) => (
                <button
                  key={service}
                  onClick={() => onServiceSelect(service)}
                  onMouseEnter={() => setHoveredService(service)}
                  onMouseLeave={() => setHoveredService(null)}
                  className={cn(
                    "text-black cursor-pointer transition-all text-base font-medium px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                  )}
                >
                  {service}
                </button>
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
