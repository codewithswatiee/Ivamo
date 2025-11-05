"use client"
import { cn } from "@/lib/utils"
import { useState, useEffect, useMemo } from "react"

// Brand data with industry and services associations
const brandData = {
  "CHORUS": {
    industry: "Fashion and Apparel",
    services: ["Website", "UI/UX", "Digital Experience", "Platform Design"]
  },
  "R Comfort": {
    industry: "Furniture and home interior",
    services: [
      "Brand Identity",
      "Website",
      "Visual Storytelling",
      "Brand Creation",
      "UI/UX",
      "Art Direction",
      "Creative Direction"
    ]
  },
  "Plus 91": {
    industry: "Cosmetics and personal care",
    services: [
      "Brand Creation",
      "Packaging",
      "Digital Experience",
      "Visual Identity",
      "Creative Direction"
    ]
  },
  "INIT": {
    industry: "Cosmetics and personal care",
    services: [
      "Packaging",
      "Website",
      "Brand Identity",
      "Visual Storytelling",
      "UI/UX"
    ]
  },
  "Foodo": {
    industry: "SaaS for Hospitality",
    services: ["Digital Experience", "Website", "UI/UX", "Visual Identity"]
  },
  "SU:VE:OR": {
    industry: "Fashion and Accessories",
    services: [
      "Brand Creation",
      "Creative Direction",
      "Product Strategy",
      "Visual Identity"
    ]
  },
  "RAF Clothing": {
    industry: "Fashion and Apparel",
    services: ["Website", "UI/UX", "E-Commerce", "Brand and Visual Identity"]
  },
  "Fine Arts": {
    industry: "Luxury Jewellery",
    services: ["Website", "UI/UX", "Art Direction", "Visual Storytelling"]
  },
  "Do It Up": {
    industry: "Luxury Event & Decor Services",
    services: [
      "Website",
      "Digital Experience",
      "UI/UX",
      "Brand & Visual Identity",
      "Visual Merchandising"
    ]
  },
  "Homestolife": {
    industry: "Furniture and home interior",
    services: ["Website", "UI/UX", "Visual Identity", "Platform Design"]
  },
  "Rad Living": {
    industry: "Home Fragrance & Decor",
    services: ["Performance marketing", "MarComm", "Website UI Design"]
  },
  "Skift": {
    industry: "Personal Care / Grooming",
    services: [
      "Packaging",
      "Brand and visual identity",
      "MarComm",
      "Go-To-Market strategy"
    ]
  },
  "Kaya": {
    industry: "Skincare / Haircare / Beauty Services",
    services: []
  },
  "Scooboo": {
    industry: "Stationery & Art Supplies",
    services: []
  },
  "Raise": {
    industry: "Not for profit/ NGO",
    services: ["Website", "UI/UX"]
  },
  "Taara": {
    industry: "Not for profit/ NGO",
    services: ["Website", "UI/UX"]
  }
};

// Map combinations to hero images - only brands with available images
const heroImagesByBrand = {
  "Kaya": {
    desktop: "/kaya/Kaya1.png",
    mobile: "/kaya/Kaya1.png",
  },
  "Do It Up": {
    desktop: "/doitup/2.png",
    mobile: "/doitup/2.png",
  },
  "INIT": {
    desktop: "/init/init_banner.png",
    mobile: "/init/init.png",
  },
  "CHORUS": {
    desktop: "/chorus/chorus.png",
    mobile: "/chorus/chorus-mobile.png",
  },
  "Raise": {
    desktop: "/raise/3.jpg",
    mobile: "/raise/3.png",
  },
  "Homestolife": {
    desktop: "/homestolife/4.png",
    mobile: "/homestolife/4.png",
  },
  "RAF Clothing": {
    desktop: "/raf/raf.png",
    mobile: "/raf/raf.png",
  },
  "Plus 91": {
    desktop: "/+91/1.png",
    mobile: "/+91/+91.png",
  }
}

// Only brands that have hero images available
const availableBrands = Object.keys(heroImagesByBrand)

// Default fallback images
const defaultHeroImages = [
  {
    desktop: "/init/init_banner.jpg",
    mobile: "/init/init.png",
  },
]

// Helper function to find matching brand based on service x industry combination
function findMatchingBrand(combination) {
  if (!combination || !combination.design || !combination.industry) {
    return null;
  }

  // Find brand that matches both the service and industry
  for (const brandName of availableBrands) {
    const brandInfo = brandData[brandName];
    if (!brandInfo) continue;

    // Check if industry matches (case-insensitive)
    const industryMatches = brandInfo.industry.toLowerCase() === combination.industry.toLowerCase();
    
    // Check if service matches (case-insensitive, partial match)
    const serviceMatches = brandInfo.services.some(service => 
      service.toLowerCase().includes(combination.design.toLowerCase()) ||
      combination.design.toLowerCase().includes(service.toLowerCase())
    );

    if (industryMatches && serviceMatches) {
      return brandName;
    }
  }
  
  return null;
}

// Function to get all valid combinations for available brands
function getValidCombinations() {
  const combinations = [];
  
  for (const brandName of availableBrands) {
    const brandInfo = brandData[brandName];
    if (!brandInfo || !brandInfo.services.length) continue;

    for (const service of brandInfo.services) {
      combinations.push({
        design: service,
        industry: brandInfo.industry,
        brand: brandName
      });
    }
  }
  
  // Shuffle combinations so the floater nav and hero rotate in a random order
  // while preserving the service x industry -> brand association.
  for (let i = combinations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = combinations[i];
    combinations[i] = combinations[j];
    combinations[j] = tmp;
  }

  return combinations;
}

export default function HeroBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCombination, setCurrentCombination] = useState(null)
  const [isNavAtBottom, setIsNavAtBottom] = useState(false)
  // Keep the last non-default images shown so scrolling (which may move the
  // floating nav to bottom) doesn't immediately revert the hero to the
  // default black/background. This preserves the visible image during scroll.
  const [lastShownImages, setLastShownImages] = useState(null)
  
  // Listen for updates from floating nav
  useEffect(() => {
    const checkNavState = () => {
      if (typeof window !== 'undefined' && window.floatingNavState) {
        const { currentCombination: navCombination, isNavAtBottom: navAtBottom } = window.floatingNavState
        setCurrentCombination(navCombination)
        setIsNavAtBottom(navAtBottom)
      }
    }
    
    // Check immediately and then poll for updates
    checkNavState()
    const interval = setInterval(checkNavState, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  // Determine which images to show based on nav position and current combination
  let imagesToShow = defaultHeroImages

  // Compute matching brand in a memo to avoid running findMatchingBrand during
  // render in a way that causes state updates.
  const matchingBrand = useMemo(() => {
    if (!isNavAtBottom && currentCombination) {
      return findMatchingBrand(currentCombination)
    }
    return null
  }, [currentCombination, isNavAtBottom])

  // When a matching brand appears (nav centered), persist it so scrolling
  // (which moves nav to bottom) can still show the same image.
  useEffect(() => {
    if (matchingBrand && heroImagesByBrand[matchingBrand]) {
      setLastShownImages([heroImagesByBrand[matchingBrand]])
    }
  }, [matchingBrand])

  if (matchingBrand && heroImagesByBrand[matchingBrand]) {
    imagesToShow = [heroImagesByBrand[matchingBrand]]
  } else if (isNavAtBottom && lastShownImages) {
    // Preserve the last shown brand images while the nav is at bottom
    imagesToShow = lastShownImages
  }
  
  const currentImage = imagesToShow[currentImageIndex] || imagesToShow[0]

  return (
  <section id="hero-background" className="h-[100dvh] sticky top-0 left-0 right-0 z-0 overflow-hidden">
      {/* Background Images (motion-driven scale) */}
      <div className="absolute inset-0 top-0">
        {imagesToShow.map((image, index) => (
          <div key={index}>
            {/* Desktop background (md+) */}
            <div
              className={cn(
                "hidden md:block absolute bg-black inset-0 transition-opacity duration-1000",
                index === currentImageIndex ? "opacity-100" : "opacity-0",
              )}
              style={{
                backgroundImage: `url(${image.desktop || image.mobile})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#0b0b0b",
              }}
            />

            {/* Mobile background (sm) */}
            <div
              className={cn(
                "block md:hidden absolute inset-0 transition-opacity duration-1000",
                index === currentImageIndex ? "opacity-100" : "opacity-0",
              )}
              style={{
                backgroundImage: `url(${image.mobile || image.desktop})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#0b0b0b",
              }}
            />
          </div>
        ))}
  </div>

      {/* Project Info + Navigation (mobile: stacked, desktop: side-by-side) */}
      {/* <div className="absolute bottom-8 left-0 right-0 px-6 md:px-8 text-white flex flex-col md:flex-row items-center md:items-end justify-between">
        <div className="w-full md:w-auto text-left md:text-left mb-4 md:mb-0">
          <h3 className="text-[16px] font-bold mb-2">{currentImage.title}</h3>
          <p className="text-[15px] opacity-90 max-w-2xl">{currentImage.subtitle}</p>
        </div>

        <div className="flex items-center gap-4 justify-center">
          <button
            aria-label="previous image"
            onClick={() => setCurrentImageIndex((i) => Math.max(0, i - 1))}
            className={cn(
              "rounded-md p-4 shadow-sm transition",
              currentImageIndex === 0
                ? "bg-[#5E5E5E] text-gray-600 cursor-not-allowed pointer-events-none"
                : "bg-white/90 cursor-pointer hover:opacity-95",
            )}
            disabled={currentImageIndex === 0}
          >
            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9.5L2 5.5M2 5.5L6 1.5M2 5.5H12" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10" />
            </svg>
          </button>

          <button
            aria-label="next image"
            onClick={() => setCurrentImageIndex((i) => Math.min(heroImages.length - 1, i + 1))}
            className={cn(
              "rounded-md p-4 shadow-sm transition",
              currentImageIndex === heroImages.length - 1
                ? "bg-[#5E5E5E] text-gray-600 cursor-not-allowed pointer-events-none"
                : "bg-white/90 cursor-pointer hover:opacity-95",
            )}
            disabled={currentImageIndex === heroImages.length - 1}
          >
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L10 5L6 1" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10" />
              <path d="M10 5H0" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10" />
            </svg>
          </button>
        </div>
      </div> */}
    </section>
  )
}

export { defaultHeroImages as heroImages, getValidCombinations, brandData, availableBrands }

