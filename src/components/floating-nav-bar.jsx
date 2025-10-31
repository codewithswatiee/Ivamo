"use client"


import { useEffect, useRef, useState } from "react"
import ClientModal from "../modal/client-modal"
import ServiceModal from "../modal/service-modal"

export function FloatingNavBar() {

  const [isAtBottom, setIsAtBottom] = useState(false)
  const [combinationIndex, setCombinationIndex] = useState(0)
  const [designAnimating, setDesignAnimating] = useState(false)
  const [industryAnimating, setIndustryAnimating] = useState(false)
  const [prevCombination, setPrevCombination] = useState({ design: '', industry: [] })
  // Modal state
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("Everything")
  const [selectedClient, setSelectedClient] = useState("Everyone")

  const combinationIndexRef = useRef(0)

  const combinations = [
    { design: "Brand Creation", industry: ["Furniture & Interiors", "Beauty & Wellness", "Sustainability & Conscious Design"] },
    { design: "Brand Identity", industry: ["Furniture & Interiors", "Luxury & Premium Goods"] },
    { design: "Visual Identity", industry: ["Furniture & Interiors", "Beauty & Wellness", "Food & Hospitality", "Sustainability & Conscious Design", "Fashion & Lifestyle", "Luxury & Premium Goods"] },
    { design: "Packaging", industry: ["Beauty & Wellness", "Luxury & Premium Goods"] },
    { design: "Website", industry: ["Fashion & Lifestyle", "Furniture & Interiors", "Luxury & Premium Goods", "Food & Hospitality", "Arts & Culture"] },
    { design: "UI/UX", industry: ["Fashion & Lifestyle", "Furniture & Interiors", "Luxury & Premium Goods", "Food & Hospitality", "Arts & Culture"] },
    { design: "Digital Experience", industry: ["Fashion & Lifestyle", "Beauty & Wellness", "Food & Hospitality", "Luxury & Premium Goods"] },
    { design: "Creative Direction", industry: ["Beauty & Wellness", "Sustainability & Conscious Design"] },
    { design: "Art Direction", industry: ["Furniture & Interiors", "Arts & Culture"] },
    { design: "Product Strategy", industry: ["Sustainability & Conscious Design"] },
    { design: "E-commerce", industry: ["Fashion & Lifestyle"] },
    { design: "Platform Design", industry: ["Fashion & Lifestyle", "Furniture & Interiors"] },
    { design: "Visual Storytelling", industry: ["Furniture & Interiors", "Luxury & Premium Goods", "Arts & Culture"] },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsAtBottom(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const changeInterval = setInterval(() => {
      const nextIndex = (combinationIndexRef.current + 1) % combinations.length
      setPrevCombination(combinations[combinationIndexRef.current])
      combinationIndexRef.current = nextIndex
      setCombinationIndex(nextIndex)
      setDesignAnimating(true)
      setIndustryAnimating(true)

      setTimeout(() => {
        setDesignAnimating(false)
        setIndustryAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(changeInterval)
  }, [combinations.length])

  // Handlers for modal open/close
  const handleServiceClick = () => setServiceModalOpen(true)
  const handleClientClick = () => setClientModalOpen(true)
  const handleServiceModalClose = () => setServiceModalOpen(false)
  const handleClientModalClose = () => setClientModalOpen(false)
  // When a service/client is selected in modal
  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setServiceModalOpen(false)
  }
  const handleClientSelect = (client) => {
    setSelectedClient(client)
    setClientModalOpen(false)
  }

  return (
    <>
      <style>{`
        .nav-bar-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: transform 1s ease-in-out;
          z-index: 40;
        }
        
        .nav-bar-container.at-bottom {
          transform: translate(-50%, calc(40vh - 30px));
        }

        /* Optimized animations with overlapping exit/entry for seamless transitions */
        .slide-in {
          animation: slideInSmooth 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .slide-out {
          animation: slideOutSmooth 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
        }

        .slide-in-up {
          animation: slideInUpSmooth 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .slide-out-down {
          animation: slideOutDownSmooth 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
        }

        @keyframes slideInSmooth {
          0% { 
            transform: translateY(100%);
            opacity: 0;
          }
          100% { 
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutSmooth {
          0% { 
            transform: translateY(0);
            opacity: 1;
          }
          100% { 
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @keyframes slideInUpSmooth {
          0% { 
            transform: translateY(-100%);
            opacity: 0;
          }
          100% { 
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideOutDownSmooth {
          0% { 
            transform: translateY(0);
            opacity: 1;
          }
          100% { 
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animated-span {
          will-change: transform, opacity;
        }
      `}</style>

      <div className={`nav-bar-container ${isAtBottom ? "at-bottom" : ""}`}>
        <div className="pointer-events-auto relative">
          <div className="bg-white/70 backdrop-blur-sm border border-black/20 rounded-lg shadow-lg px-6 py-3 sm:px-4 sm:py-2 flex items-center justify-center gap-2 whitespace-nowrap">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 whitespace-nowrap">
              <div className="flex items-center justify-center gap-1.5 text-gray-900 font-medium sm:text-sm">
                <span>We design</span>
                <div className="relative overflow-hidden inline-block h-[1.4em] text-gray-900 font-semibold sm:h-[1.2em] sm:text-sm">
                  <span className={`flex justify-center animated-span ${designAnimating ? "slide-out" : "hidden"}`}>
                    {prevCombination.design}
                  </span>
                  <span
                    className={`flex justify-center animated-span ${designAnimating ? "slide-in" : ""}`}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={handleServiceClick}
                  >
                    {combinations[combinationIndex].design}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-900 font-medium sm:text-sm">
                <span>for</span>
                <div className="relative overflow-hidden inline-block h-[1.4em] text-gray-900 font-semibold sm:h-[1.2em] sm:text-sm">
                  <span
                    className={`flex justify-center animated-span ${industryAnimating ? "slide-out-down" : "hidden"}`}
                  >
                    {Array.isArray(prevCombination.industry) ? prevCombination.industry[0] : prevCombination.industry}
                  </span>
                  <span
                    className={`flex justify-center animated-span ${industryAnimating ? "slide-in-up" : ""}`}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={handleClientClick}
                  >
                    {Array.isArray(combinations[combinationIndex].industry) ? combinations[combinationIndex].industry[0] : combinations[combinationIndex].industry}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <ServiceModal
        isOpen={serviceModalOpen}
        onClose={handleServiceModalClose}
        selectedService={selectedService}
        currentClient={selectedClient}
        onServiceSelect={handleServiceSelect}
        onClientModalOpen={() => {
          setServiceModalOpen(false)
          setClientModalOpen(true)
        }}
        designNames={[...new Set(combinations.map(c => c.design))]}
      />
      <ClientModal
        isOpen={clientModalOpen}
        onClose={handleClientModalClose}
        currentService={selectedService}
        currentClient={selectedClient}
        onClientSelect={handleClientSelect}
        onServiceModalOpen={() => {
          setClientModalOpen(false)
          setServiceModalOpen(true)
        }}
        industryNames={[...new Set(combinations.flatMap(c => Array.isArray(c.industry) ? c.industry : [c.industry]))]}
      />
    </>
  )
}
