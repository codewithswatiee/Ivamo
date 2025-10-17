"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, X } from "lucide-react"

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

const serviceImages = {
  Books: "/book-design-typography-layout.jpg",
  "Brand Identity": "/brand-identity-logo-design.jpg",
  "Brand Strategy": "/brand-strategy-planning-diagram.jpg",
  Campaigns: "/marketing-campaign-design-black-white.jpg",
  "Data Driven Experiences": "/data-visualization-dashboard.png",
  "Digital Experiences": "/digital-interface-design.jpg",
  Exhibitions: "/exhibition-design-museum-display.jpg",
  "Industrial/Product Design": "/product-design-industrial.jpg",
  "Motion Graphics & Film": "/motion-graphics-film-production.jpg",
  Packaging: "/package-design-product-branding.jpg",
  Publications: "/publication-design-magazine-layout.jpg",
  "Signage & Environmental Graphics": "/environmental-signage-wayfinding.jpg",
  Typefaces: "/typography-typeface-design-letters.jpg",
}

const heroImages = [
 {
    url: "/burosys.png",
    title: "Burosys",
    subtitle: "Elevated the digital presence of Burosys with a website revamp, refined UI/UX, and cohesive high-end visual campaigns.",
    service: "Brand Identity",
    client: "Arts & Culture",
  },
  {
    url: "/chorus.png",
    title: "Chorus",
    subtitle: "Evolved Moonray into Chorus through a complete rebrand, expressive digital identity, and immersive art-led web experience.",
    service: "Brand Strategy",
    client: "Finance",
  },
  {
    url: "/rcomfort.png",
    title: "RComfort",
    subtitle: "Redefined R Comfort’s identity with a full rebrand and digital experience that elevates handcrafted furniture into a modern symbol of luxury living.",
    service: "Brand Identity",
    client: "Furniture",
  },
]

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [currentClientIndex, setCurrentClientIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showClientModal, setShowClientModal] = useState(false)
  const [modalSelectedService, setModalSelectedService] = useState("Brand Strategy")

  // Image rotation every 5-6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = (prev + 1) % heroImages.length
        const newImage = heroImages[newIndex]
        setCurrentServiceIndex(designServices.indexOf(newImage.service))
        setCurrentClientIndex(clientTypes.indexOf(newImage.client))
        return newIndex
      })
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleServiceSelect = (service, index) => {
    setCurrentServiceIndex(index)
    setModalSelectedService(service)
    const matchingImageIndex = heroImages.findIndex((img) => img.service === service)
    if (matchingImageIndex !== -1) {
      setCurrentImageIndex(matchingImageIndex)
      setCurrentClientIndex(clientTypes.indexOf(heroImages[matchingImageIndex].client))
    }
  }

  const handleClientSelect = (client, index) => {
    setCurrentClientIndex(index)
    const matchingImageIndex = heroImages.findIndex((img) => img.client === client)
    if (matchingImageIndex !== -1) {
      setCurrentImageIndex(matchingImageIndex)
      setCurrentServiceIndex(designServices.indexOf(heroImages[matchingImageIndex].service))
    }
    setShowClientModal(false)
  }

  const currentImage = heroImages[currentImageIndex]

  return (
    <>
      <section className="relative h-[80vh] overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                index === currentImageIndex ? "opacity-100" : "opacity-0",
              )}
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[500px] h-[500px]">
            {/* Large circular logo/design */}
            <div className="absolute inset-0 rounded-full border-[40px] border-white/90 flex items-center justify-center">
              <div className="text-white text-[120px] font-bold">C</div>
            </div>

            {/* Radiating text elements */}
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-white/30 font-bold text-sm tracking-[0.2em] uppercase"
                style={{
                  transform: `rotate(${i * 11.25}deg) translateY(-280px)`,
                  transformOrigin: "50% 280px",
                  left: "50%",
                  top: "50%",
                  marginLeft: "-30px",
                  width: "60px",
                  textAlign: "center",
                }}
              >
                {i % 8 === 0
                  ? "DESIGN"
                  : i % 8 === 1
                    ? "CREATE"
                    : i % 8 === 2
                      ? "INNOVATE"
                      : i % 8 === 3
                        ? "INSPIRE"
                        : i % 8 === 4
                          ? "BUILD"
                          : i % 8 === 5
                            ? "CRAFT"
                            : i % 8 === 6
                              ? "SHAPE"
                              : "MAKE"}
              </div>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="absolute bottom-8 left-8 text-white">
          <h3 className="text-2xl font-bold mb-2">{currentImage.title}</h3>
          <p className="text-lg opacity-90">{currentImage.subtitle}</p>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 right-8 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentImageIndex ? "bg-white" : "bg-white/40",
              )}
            />
          ))}
        </div>
      </section>

      <div
        className={cn(
          "fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-1000 ease-in-out",
          isScrolled ? "bottom-8 scale-75" : "top-1/2 -translate-y-1/2 scale-100",
        )}
      >
        <div className="bg-gray-400/30 backdrop-blur-md px-8 py-6 rounded-lg border border-white/20">
          <div className="flex items-center justify-center gap-2 text-xl font-medium text-black">
            <span>We design</span>

            {/* Service Dropdown */}
            <button
              onClick={() => {
                setShowServiceModal(true)
                setModalSelectedService(designServices[currentServiceIndex])
              }}
              className="inline-flex items-center gap-1 font-bold hover:opacity-80 transition-opacity"
            >
              <span className="whitespace-nowrap">
                {isScrolled ? "Everything" : designServices[currentServiceIndex]}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <span>for</span>

            {/* Client Dropdown */}
            <button
              onClick={() => setShowClientModal(true)}
              className="inline-flex items-center gap-1 font-bold hover:opacity-80 transition-opacity"
            >
              <span className="whitespace-nowrap">{isScrolled ? "Everyone" : clientTypes[currentClientIndex]}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showServiceModal && (
        <div className="fixed inset-0 z-[100] backdrop-blur-xl">
          {/* Close on outside click */}
          <div className="absolute inset-0 group cursor-pointer" onClick={() => setShowServiceModal(false)}>
            <X className="absolute top-8 right-8 w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>

          <div className="absolute top-[53%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl mx-4">
            <div className="bg-gray-200 rounded-2xl overflow-hidden">
              {/* Image Section */}
              <div className="h-80 flex items-center justify-center">
                <img
                  src={serviceImages[modalSelectedService] || serviceImages["Brand Strategy"]}
                  alt={modalSelectedService}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Options Section */}
              <div className="py-5">
                <div className="space-y-2 mb-6">
                  {/* First row */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      "Books",
                      "Brand Identity",
                      "Brand Strategy",
                      "Campaigns",
                      "Data Driven Experiences",
                      "Digital Experiences",
                    ].map((service) => (
                      <button
                        key={service}
                        onClick={() => handleServiceSelect(service, designServices.indexOf(service))}
                        className={cn(
                          "text-black text-base font-medium hover:font-bold transition-all duration-200 px-4 py-2 rounded-lg",
                          modalSelectedService === service ? "bg-black text-white font-bold" : "hover:bg-white/50",
                        )}
                      >
                        {service}
                      </button>
                    ))}
                  </div>

                  {/* Second row */}
                  <div className="flex flex-wrap justify-center gap-4">
                    {[
                      "Exhibitions",
                      "Industrial/Product Design",
                      "Motion Graphics & Film",
                      "Packaging",
                      "Publications",
                    ].map((service) => (
                      <button
                        key={service}
                        onClick={() => handleServiceSelect(service, designServices.indexOf(service))}
                        className={cn(
                          "text-black text-base font-medium hover:font-bold transition-all duration-200 px-4 py-2 rounded-lg",
                          modalSelectedService === service ? "bg-black text-white font-bold" : "hover:bg-white/50",
                        )}
                      >
                        {service}
                      </button>
                    ))}
                  </div>

                  {/* Third row */}
                  <div className="flex flex-wrap justify-center gap-4">
                    {["Signage & Environmental Graphics", "Typefaces"].map((service) => (
                      <button
                        key={service}
                        onClick={() => handleServiceSelect(service, designServices.indexOf(service))}
                        className={cn(
                          "text-black text-base font-medium hover:font-bold transition-all duration-200 px-4 py-2 rounded-lg",
                          modalSelectedService === service ? "bg-black text-white font-bold" : "hover:bg-white/50",
                        )}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center text-black text-lg">
                  <span className="text-gray-600">We design </span>
                  <button
                    onClick={() => setShowServiceModal(false)}
                    className="font-bold hover:opacity-80 inline-flex items-center gap-1"
                  >
                    {modalSelectedService} <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="text-gray-600"> for </span>
                  <button
                    onClick={() => {
                      setShowServiceModal(false)
                      setShowClientModal(true)
                    }}
                    className="font-bold hover:opacity-80 inline-flex items-center gap-1"
                  >
                    {clientTypes[currentClientIndex]} <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showClientModal && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0 group cursor-pointer" onClick={() => setShowClientModal(false)}>
            <X className="absolute top-8 right-8 w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl mx-4">
            <div className="bg-gray-200/90 backdrop-blur-lg rounded-2xl overflow-hidden">
              {/* Image Section */}
              <div className="h-80 bg-black flex items-center justify-center">
                <img
                  src="/client-industry-business.jpg"
                  alt="Client Industries"
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Options Section */}
              <div className="p-12">
                <div className="space-y-6 mb-8">
                  <div className="flex flex-wrap justify-center gap-4">
                    {clientTypes.slice(1, 7).map((client) => (
                      <button
                        key={client}
                        onClick={() => handleClientSelect(client, clientTypes.indexOf(client))}
                        className={cn(
                          "text-black text-base font-medium hover:font-bold transition-all duration-200 px-4 py-2 rounded-lg",
                          clientTypes[currentClientIndex] === client
                            ? "bg-black text-white font-bold"
                            : "hover:bg-white/50",
                        )}
                      >
                        {client}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {clientTypes.slice(7, 13).map((client) => (
                      <button
                        key={client}
                        onClick={() => handleClientSelect(client, clientTypes.indexOf(client))}
                        className={cn(
                          "text-black text-base font-medium hover:font-bold transition-all duration-200 px-4 py-2 rounded-lg",
                          clientTypes[currentClientIndex] === client
                            ? "bg-black text-white font-bold"
                            : "hover:bg-white/50",
                        )}
                      >
                        {client}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap justify-center gap-4">
                    {clientTypes.slice(13).map((client) => (
                      <button
                        key={client}
                        onClick={() => handleClientSelect(client, clientTypes.indexOf(client))}
                        className={cn(
                          "text-black text-base font-medium hover:font-bold transition-all duration-200 px-4 py-2 rounded-lg",
                          clientTypes[currentClientIndex] === client
                            ? "bg-black text-white font-bold"
                            : "hover:bg-white/50",
                        )}
                      >
                        {client}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-center text-black text-lg">
                  <span className="text-gray-600">We design </span>
                  <button
                    onClick={() => {
                      setShowClientModal(false)
                      setShowServiceModal(true)
                    }}
                    className="font-bold hover:opacity-80 inline-flex items-center gap-1"
                  >
                    {designServices[currentServiceIndex]} <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="text-gray-600"> for </span>
                  <button
                    onClick={() => setShowClientModal(false)}
                    className="font-bold hover:opacity-80 inline-flex items-center gap-1"
                  >
                    {clientTypes[currentClientIndex]} <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
