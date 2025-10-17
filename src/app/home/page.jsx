"use client"

import Carousel from "@/components/carousel"
import HeroBackground from "@/components/hero-background"
import { ImageSection } from "@/components/ImageSection"
import PortfolioSection from "@/components/work-banner"
import { PortfolioSection2 } from "@/components/gridSection"
import { Quote } from "@/components/quote"
import { belowProjects, projects } from "@/data/home/2sideImageData"
import { gridData } from "@/data/home/6gridSection"
import carouselItems from "@/data/home/carouselData"
import { useState, useEffect } from "react"


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
    url: "/modern-abstract-design-purple-gradient.jpg",
    title: "Natural History Museum",
    subtitle: "Moving the Museum from catalogue to catalyst.",
    service: "Brand Identity",
    client: "Arts & Culture",
  },
  {
    url: "/geometric-pattern-blue-cyan.jpg",
    title: "General Catalyst",
    subtitle: "Designing the future of digital experiences.",
    service: "Brand Strategy",
    client: "Finance",
  },
  {
    url: "/organic-shapes-green-nature.jpg",
    title: "Sustainable Brand Initiative",
    subtitle: "Creating identity systems for environmental impact.",
    service: "Digital Experiences",
    client: "Non-profits",
  },
  {
    url: "/typography-layout-orange-warm.jpg",
    title: "Publishing Revolution",
    subtitle: "Transforming how stories are told and shared.",
    service: "Publications",
    client: "Publishing",
  },
  {
    url: "/architectural-structure-red-bold.jpg",
    title: "Urban Development Project",
    subtitle: "Shaping spaces that bring communities together.",
    service: "Signage & Environmental Graphics",
    client: "Civic & Public",
  },
]

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0)
  const [currentClientIndex, setCurrentClientIndex] = useState(0)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [showClientModal, setShowClientModal] = useState(false)
  const [modalSelectedService, setModalSelectedService] = useState("Brand Strategy")

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const newIndex = (prev + 1) % heroImages.length
        const newImage = heroImages[newIndex]

        // Smooth transition for text changes
        setTimeout(() => {
          setCurrentServiceIndex(designServices.indexOf(newImage.service))
          setCurrentClientIndex(clientTypes.indexOf(newImage.client))
        }, 300) // Delay to create smooth transition effect

        return newIndex
      })
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  const handleServiceSelect = (service, index) => {
    setCurrentServiceIndex(index)
    setModalSelectedService(service)
    const matchingImageIndex = heroImages.findIndex((img) => img.service === service)
    if (matchingImageIndex !== -1) {
      setCurrentImageIndex(matchingImageIndex)
      setCurrentClientIndex(clientTypes.indexOf(heroImages[matchingImageIndex].client))
    }
    setShowServiceModal(false)
  }

  const handleClientSelect = (client, index) => {
    setCurrentClientIndex(index)
    const matchingImageIndex = heroImages.findIndex((img) => img.client === client)
    if (matchingImageIndex !== -1) {
      setCurrentImageIndex(matchingImageIndex)
      setCurrentServiceIndex(designServices.indexOf(heroImages[matchingImageIndex].service))
    }
  }

  return (
    <div className="bg-white">
      <HeroBackground currentImageIndex={currentImageIndex} onImageChange={setCurrentImageIndex} />

      {/* <FloatingSelector
        currentService={designServices[currentServiceIndex]}
        currentClient={clientTypes[currentClientIndex]}
        onServiceClick={() => {
          setShowServiceModal(true)
          setModalSelectedService(designServices[currentServiceIndex])
        }}
        onClientClick={() => setShowClientModal(true)}
        isModalOpen={showServiceModal || showClientModal}
      />

      <ServiceModal
        isOpen={showServiceModal}
        onClose={() => setShowServiceModal(false)}
        selectedService={modalSelectedService}
        currentClient={clientTypes[currentClientIndex]}
        onServiceSelect={handleServiceSelect}
        onClientModalOpen={() => setShowClientModal(true)}
      />

      <ClientModal
        isOpen={showClientModal}
        onClose={() => setShowClientModal(false)}
        currentService={designServices[currentServiceIndex]}
        currentClient={clientTypes[currentClientIndex]}
        onClientSelect={handleClientSelect}
        onServiceModalOpen={() => setShowServiceModal(true)}
      /> */}

      <PortfolioSection left={projects.left} right={projects.right} showHeader={true} />
      <PortfolioSection2 projects={gridData} />
      <Carousel items={carouselItems} />
      <PortfolioSection left={belowProjects.left} right={belowProjects.right} />
      <ImageSection imageAlt={'ivamo-studios'} imageSrcDesktop='/lastSection.png' imageSrcMobile='/lastSection-mobile.png'/>
    </div>
  )
}
