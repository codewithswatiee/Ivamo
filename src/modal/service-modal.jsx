"use client"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

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


// Map design to brands
const designToBrands = {
  "Brand Strategy": ["Burosys"],
  "Brand Creation": ["Plus 91"],
  "Brand Identity": ["Burosys", "Chorus", "rComfort", "Plus 91", "INIT", "Foodoo", "SU:VE:OR", "RAF Clothing", "Do it Up", "Homestolife"],
  "Visual Identity": ["rComfort"],
  "Packaging": ["Plus 91", "INIT", "SU:VE:OR"],
  "Website": ["Burosys", "Chorus", "rComfort", "Plus 91", "INIT", "Foodoo", "SU:VE:OR", "RAF Clothing", "Fine Arts", "Do it Up", "Homestolife"],
  "UI/UX": ["Burosys", "INIT", "Foodoo", "RAF Clothing", "Fine Arts", "Raise", "Do it Up", "Homestolife"],
  "Digital Experience": ["Burosys", "Chorus", "rComfort", "Plus 91", "INIT", "Foodoo", "SU:VE:OR", "RAF Clothing", "Fine Arts", "Raise", "Do it Up", "Homestolife"],
  "Creative Direction": ["Burosys", "Chorus", "Plus 91", "INIT", "SU:VE:OR"],
  "Art Direction": ["Chorus", "rComfort", "Plus 91"],
  "Motion": ["Chorus", "Plus 91"],
  "Product Strategy": ["SU:VE:OR"],
  "E-commerce": ["RAF Clothing"],
  "Platform Design": ["Raise"],
  "Visual Storytelling": ["Fine Arts"],
  "Visual System": ["Foodoo"]
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




export default function ServiceModal({
  isOpen,
  onClose,
  selectedService,
  currentClient,
  onServiceSelect,
  onClientModalOpen,
  designNames = [],
}) {
  const [hoveredService, setHoveredService] = useState(null)
  const [slideIndex, setSlideIndex] = useState(0)
  const intervalRef = useRef(null)

  // Get the current design (hovered or selected)
  const currentDesign = hoveredService || selectedService

  // Get all images for brands mapped to this design
  let imagesForDesign = (designToBrands[currentDesign] || [])
    .flatMap(brand => brandToImages[brand] || [])
    .filter(Boolean)

  // Ensure at least 10 images for each tag (repeat or mix as needed)
  if (imagesForDesign.length > 0 && imagesForDesign.length < 10) {
    const original = imagesForDesign.slice()
    let i = 0
    while (imagesForDesign.length < 10) {
      imagesForDesign.push(original[i % original.length])
      i++
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
    <div className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl">
      {/* Fixed close button */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-[101]"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div className="absolute top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl mx-4">
        <div className="bg-gray-100 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl">
          {/* Image Section - Slideshow for selected design */}
          <div className="h-[400px] pt-4 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" />
            {imagesForDesign.length > 0 ? (
              <img
                src={imagesForDesign[slideIndex]}
                alt={currentDesign}
                className="max-h-full max-w-full object-contain relative z-10 transition-all duration-500 ease-out"
                style={{ minWidth: 200, minHeight: 200 }}
              />
            ) : (
              <div className="text-gray-400 text-lg">No images for this design</div>
            )}
          </div>

          {/* Options Section */}
          <div className="p-5">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {designNames.map((service) => (
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
