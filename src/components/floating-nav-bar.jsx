"use client"


import { useEffect, useRef, useState } from "react"
import ClientModal from "../modal/client-modal"
import ServiceModal from "../modal/service-modal"
import { getValidCombinations } from "./hero-background"

// Custom hook to communicate current combination to other components
function useHeroCombination() {
  const [currentCombination, setCurrentCombination] = useState(null)
  const [isNavAtBottom, setIsNavAtBottom] = useState(false)
  
  // Make these available globally via window for hero background to access
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.floatingNavState = { currentCombination, isNavAtBottom }
    }
  }, [currentCombination, isNavAtBottom])
  
  return { setCurrentCombination, setIsNavAtBottom }
}

export function FloatingNavBar() {
  const { setCurrentCombination, setIsNavAtBottom } = useHeroCombination()

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

  // Get valid combinations from brands that have hero images
  const validCombinations = getValidCombinations()
  
  // Use the raw valid combinations (each has one service-industry pair)
  const combinations = validCombinations

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const atBottom = scrollPosition > 100
      setIsAtBottom(atBottom)
      setIsNavAtBottom(atBottom)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setIsNavAtBottom])

  useEffect(() => {
    const changeInterval = setInterval(() => {
      const nextIndex = (combinationIndexRef.current + 1) % combinations.length
      setPrevCombination(combinations[combinationIndexRef.current])
      combinationIndexRef.current = nextIndex
      setCombinationIndex(nextIndex)
      setDesignAnimating(true)
      setIndustryAnimating(true)
      
      // Update current combination for hero background
      setCurrentCombination(combinations[nextIndex])

      setTimeout(() => {
        setDesignAnimating(false)
        setIndustryAnimating(false)
      }, 500)
    }, 3000)

    // Set initial combination
    setCurrentCombination(combinations[0])

    return () => clearInterval(changeInterval)
  }, [combinations.length, setCurrentCombination])

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

  // force bottom when modal open or user scrolled past threshold; also add a class when modal open
  const forcedBottom = isAtBottom || serviceModalOpen || clientModalOpen
  const modalOpenClass = (serviceModalOpen || clientModalOpen) ? 'modal-open' : ''

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
        .nav-bar-container.modal-open { z-index: 110; }
      `}</style>
      <div className={`nav-bar-container ${forcedBottom ? "at-bottom" : ""} ${modalOpenClass}`}>
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
                    {prevCombination.industry}
                  </span>
                  <span
                    className={`flex justify-center animated-span ${industryAnimating ? "slide-in-up" : ""}`}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={handleClientClick}
                  >
                    {combinations[combinationIndex].industry}
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
      />
    </>
  )
}
