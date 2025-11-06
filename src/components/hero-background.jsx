"use client"
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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

// Map combinations to hero images - only the 5 featured brands
const heroImagesByBrand = {
  "Raise": {
    desktop: "/raise/3.jpg",
    mobile: "/raise/3.png",
  },
  "CHORUS": {
    desktop: "/chorus/chorus.png",
    mobile: "/chorus/chorus-mobile.png",
  },
  "INIT": {
    desktop: "/init/init_banner.png",
    mobile: "/init/init.png",
  },
  "Do It Up": {
    desktop: "/doitup/2.jpg",
    mobile: "/doitup/2.jpg",
  },
  "RAF Clothing": {
    desktop: "/raf/raf.png",
    mobile: "/raf/raf.png",
  }
}

// Only the 5 featured brands
const availableBrands = ["Raise", "CHORUS", "INIT", "Do It Up", "RAF Clothing"]

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
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0)
  const [currentTagIndex, setCurrentTagIndex] = useState(0)
  
  // Get the current brand
  const currentBrand = availableBrands[currentBrandIndex]
  const brandInfo = brandData[currentBrand]
  const brandImages = heroImagesByBrand[currentBrand]
  
  // Share current brand and tag with floating navbar
  useEffect(() => {
    if (typeof window !== 'undefined' && brandInfo) {
      const currentTag = brandInfo.services[currentTagIndex]
      window.heroState = {
        currentBrand,
        currentTag,
        currentIndustry: brandInfo.industry
      }
    }
  }, [currentBrand, currentTagIndex, brandInfo])
  
  // Auto-rotate through brands every 8 seconds (much slower)
  useEffect(() => {
    const brandInterval = setInterval(() => {
      setCurrentBrandIndex((prev) => (prev + 1) % availableBrands.length)
      setCurrentTagIndex(0) // Reset tag when brand changes
    }, 8000)
    
    return () => clearInterval(brandInterval)
  }, [])
  
  // Auto-rotate through tags every 4 seconds (much slower)
  useEffect(() => {
    if (!brandInfo || brandInfo.services.length === 0) return
    
    const tagInterval = setInterval(() => {
      setCurrentTagIndex((prev) => (prev + 1) % brandInfo.services.length)
    }, 4000)
    
    return () => clearInterval(tagInterval)
  }, [brandInfo])
  
  if (!brandInfo || !brandImages) {
    return <section id="hero-background" className="h-[100dvh] bg-black"></section>
  }
  
  const currentTag = brandInfo.services[currentTagIndex]

  return (
  <section id="hero-background" className="h-[100dvh] top-0 left-0 right-0 z-0 overflow-hidden relative">
      {/* Background Images with Framer Motion */}
      <div className="absolute inset-0 top-0">
        <AnimatePresence>
          <motion.div
            key={currentBrandIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ 
              duration: 2.0, 
              ease: [0.25, 0.46, 0.45, 0.94],
              scale: { duration: 8 }
            }}
            className="absolute inset-0"
          >
            {/* Desktop background (md+) */}
            <div
              className="hidden md:block absolute bg-black inset-0"
              style={{
                backgroundImage: `url(${brandImages.desktop})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#0b0b0b",
              }}
            />

            {/* Mobile background (sm) */}
            <div
              className="block md:hidden absolute inset-0"
              style={{
                backgroundImage: `url(${brandImages.mobile})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "#0b0b0b",
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Brand information overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12">
        {/* Bottom section - Navigation dots */}
        <motion.div 
          className="flex gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {availableBrands.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentBrandIndex(index)
                setCurrentTagIndex(0)
              }}
              className={`transition-all rounded-full ${
                index === currentBrandIndex
                  ? "bg-white w-8 h-3"
                  : "bg-white/50 hover:bg-white/75 w-3 h-3"
              }`}
              aria-label={`Go to brand ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export { availableBrands, brandData, getValidCombinations, defaultHeroImages as heroImages };

