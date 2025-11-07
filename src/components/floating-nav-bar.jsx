"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import ClientModal from "../modal/client-modal"
import ServiceModal from "../modal/service-modal"

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
  const [currentHeroState, setCurrentHeroState] = useState({ currentBrand: '', currentTag: '', currentIndustry: '' })
  // Modal state
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [clientModalOpen, setClientModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState("Everything")
  const [selectedClient, setSelectedClient] = useState("Everyone")

  // Listen to hero state changes
  useEffect(() => {
    const checkHeroState = () => {
      if (typeof window !== 'undefined' && window.heroState) {
        const newState = window.heroState
        setCurrentHeroState(newState)
        
        // Update combination for hero background sync
        setCurrentCombination({
          design: newState.currentTag,
          industry: newState.currentIndustry,
          brand: newState.currentBrand
        })
      }
    }
    
    // Check immediately and then poll for updates
    checkHeroState()
    const interval = setInterval(checkHeroState, 100)
    
    return () => clearInterval(interval)
  }, [setCurrentCombination])

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

        .nav-bar-container.modal-open { z-index: 110; }
      `}</style>
      <div className={`nav-bar-container ${forcedBottom ? "at-bottom" : ""} ${modalOpenClass}`}>
        <div className="pointer-events-auto relative">
          <div className="bg-white/70 backdrop-blur-sm border border-black/20 rounded-lg shadow-lg px-6 py-3 sm:px-4 sm:py-2 flex items-center justify-center gap-2 whitespace-nowrap">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 whitespace-nowrap">
              <div className="flex items-center justify-center gap-1.5 text-gray-900 font-medium sm:text-sm">
                <span>We design</span>
                <motion.div 
                  className="relative inline-block text-gray-900 font-semibold sm:text-sm overflow-hidden min-w-[50px]"
                  style={{ height: '1.2em', lineHeight: '1.2em' }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={currentHeroState.currentTag}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-100%' }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.22, 1, 0.36, 1],
                        type: "tween"
                      }}
                      className="block whitespace-nowrap cursor-pointer underline"
                      style={{ lineHeight: '1.2em' }}
                      onClick={handleServiceClick}
                    >
                      {currentHeroState.currentTag || 'Everything'}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-900 font-medium sm:text-sm">
                <span>for</span>
                <motion.div 
                  className="relative inline-block text-gray-900 font-semibold sm:text-sm overflow-hidden min-w-[100px]"
                  style={{ height: '1.2em', lineHeight: '1.2em' }}
                >
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={currentHeroState.currentIndustry}
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '-100%' }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.22, 1, 0.36, 1],
                        type: "tween",
                        delay: 0.1
                      }}
                      className="block whitespace-nowrap cursor-pointer underline"
                      style={{ lineHeight: '1.2em' }}
                      onClick={handleClientClick}
                    >
                      {currentHeroState.currentIndustry || 'Everyone'}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
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
