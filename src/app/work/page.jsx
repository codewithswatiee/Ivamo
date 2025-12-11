"use client"
import { PortfolioSection2 } from "@/components/gridSection"
import { ImageSection } from "@/components/ImageSection"
import ReversePortfolioSection from "@/components/reverse-two-images"
import PortfolioSection from "@/components/work-banner"
import { gridData1, gridData2 } from "@/data/home/6gridSection"
import { belowProjects, projects } from "@/data/work/2sideImageData"
import { useSearchParams } from "next/navigation"
import { useMemo, Suspense } from "react"
import { Helmet } from "react-helmet"

// Map client types to project IDs (matching the grid data)
const clientTypeToProjectIds = {
  "Fashion and Apparel": ["chorus", "raf-clothing"],
  "Furniture and home interior": ["rComfort", "homestolife"],
  "Cosmetics and personal care": ["plus-91", "init", "skifit"],
  "SaaS for Hospitality": ["foodo"],
  "Fashion and Accessories": ["chorus", "raf-clothing"],
  "Luxury Jewellery": ["fine-arts"],
  "Luxury Event & Decor Services": ["do-it-up"],
  "Home Fragrance & Decor": [],
  "Personal Care / Grooming": ["plus-91", "init"],
  "Skincare / Haircare / Beauty Services": ["kaya", "skifit"],
  "Stationery & Art Supplies": ["scooboo"],
  "Not for profit/ NGO": ["raise"],
  "Everyone": ["rComfort", "plus-91", "init", "do-it-up", "fine-arts", "foodo", "scooboo", "skifit", "kaya", "chorus", "raf-clothing", "homestolife", "raise"]
};

// Map service types to project IDs (matching the grid data)
const serviceTypeToProjectIds = {
  "Website": ["rComfort", "init", "foodo", "raf-clothing", "fine-arts", "do-it-up", "homestolife", "raise", "chorus"],
  "UI/UX": ["rComfort", "init", "foodo", "raf-clothing", "fine-arts", "do-it-up", "homestolife", "raise", "chorus", "scooboo"],
  "Digital Experience": ["foodo", "do-it-up", "chorus"],
  "Platform Design": ["homestolife", "chorus"],
  "Brand Identity": ["rComfort", "init", "skifit"],
  "Visual Storytelling": ["rComfort", "init", "fine-arts"],
  "Brand Creation": ["rComfort", "plus-91"],
  "Art Direction": ["rComfort", "fine-arts"],
  "Creative Direction": ["rComfort", "plus-91", "do-it-up"],
  "Visual Identity": ["rComfort", "plus-91", "foodo", "raf-clothing", "do-it-up", "homestolife"],
  "Packaging": ["plus-91", "init", "skifit"],
  "E-Commerce": ["raf-clothing"],
  "Product Strategy": [],
  "Performance Marketing": [],
  "MarComm": ["skifit"],
  "Go-To-Market Strategy": ["skifit"],
  "Everything": ["rComfort", "plus-91", "init", "do-it-up", "fine-arts", "foodo", "scooboo", "skifit", "kaya", "chorus", "raf-clothing", "homestolife", "raise"]
};

function WorkContent() {
  const searchParams = useSearchParams()
  const clientType = searchParams.get('clientType')
  const serviceType = searchParams.get('serviceType')

  // Convert PortfolioSection items to grid format
  const portfolioSectionProjects = [
    {
      id: "homestolife",
      title: "HomesToLife",
      description: "Elevated a luxury furniture brand's digital presence through refined UI/UX design and visual storytelling that mirrors its sophistication and global ambition.",
      image: "https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/homestolife/1.png",
      categories: ["Lifestyle", "Furniture"],
      link: "/projects/homestolife",
      backgroundColor: "bg-gray-100",
    },
    {
      id: "chorus",
      title: "Chorus",
      description: "Evolved Moonray into Chorus through a complete rebrand, expressive digital identity, and immersive art-led web experience.",
      image: "https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/chorus/chorus.png",
      categories: ["Fashion", "Art", "Lifestyle"],
      link: "/projects/chorus",
      backgroundColor: "bg-gray-900",
    },
    {
      id: "raf-clothing",
      title: "RAF Clothing",
      description: "Crafted a global digital runway for RAF Clothing with a Shopify-powered store, refined UI/UX, and cohesive brand identity.",
      image: "https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/raf/raf_7.jpg",
      categories: ["Fashion", "Lifestyle", "E-Commerce"],
      link: "/projects/raf-clothing",
      backgroundColor: "bg-slate-800",
    },
    {
      id: "raise",
      title: "The Raise Project",
      description: "Designed the UI/UX for the Raise Project, an initiative by Taara, to create an intuitive and impactful digital platform for community-driven connectivity.",
      image: "https://ivamo-studios.s3.eu-north-1.amazonaws.com/public/raise/3.jpg",
      categories: ["UI-technology", "Social Impact", "Innovation"],
      link: "/projects/raise",
      backgroundColor: "bg-blue-900",
    }
  ];

  // Filter grid data based on client type or service type
  const filteredProjects = useMemo(() => {
    const allProjects = [...gridData1, ...gridData2, ...portfolioSectionProjects]
    
    if (clientType && clientTypeToProjectIds[clientType]) {
      const allowedIds = clientTypeToProjectIds[clientType]
      return allProjects.filter(project => allowedIds.includes(project.id))
    }
    
    if (serviceType && serviceTypeToProjectIds[serviceType]) {
      const allowedIds = serviceTypeToProjectIds[serviceType]
      return allProjects.filter(project => allowedIds.includes(project.id))
    }
    
    return null // No filtering, show original sections
  }, [clientType, serviceType])

  return (
    <div className="bg-white">
      <Helmet>
          <title>IVAMO | Work</title>
          <meta name="description" content="Discover how IVAMO Studios crafts impactful branding, UI/UX, and digital marketing campaigns. See our creative work that drives clarity, connection, and growth." />
          <meta property="og:title" content="IVAMO | Work" />
          <meta property="og:description" content="Discover how IVAMO Studios crafts impactful branding, UI/UX, and digital marketing campaigns. See our creative work that drives clarity, connection, and growth." />
          <meta property="og:image" content="https://ivamostudios.in/favicon.ico" />
          <meta property="og:url" content="https://ivamostudios.in/work" />
          <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pt-24 pl-3 mb-4">
        <h1 className="text-[38px] md:text-[48px] text-black">
          {clientType || serviceType || "Work"}
        </h1>
        {(clientType || serviceType) && (
          <div className="mt-2 md:mt-0 pr-3">
            <button
              onClick={() => window.location.href = '/work'}
              className="text-base text-blue-600 hover:text-blue-800 underline font-medium"
            >
              View All
            </button>
          </div>
        )}
      </div>
      {!clientType && !serviceType && (
        <>
          <PortfolioSection left={projects.left} right={projects.right}/>
          <PortfolioSection2 projects={gridData1} />
          <ReversePortfolioSection left={belowProjects.left} right={belowProjects.right} />
          <PortfolioSection2 projects={gridData2} />
        </>
      )}
      {(clientType || serviceType) && filteredProjects && (
        <PortfolioSection2 projects={filteredProjects} />
      )}
      <ImageSection imageAlt={'ivamo-studios'} imageSrcDesktop='/lastSection.png' imageSrcMobile='/lastSection-mobile.png'/>
    </div>
  )
}

export default function Work() {
  return (
    <Suspense fallback={
      <div className="bg-white min-h-screen pt-24 pl-3">
        <h1 className="text-[38px] md:text-[48px] text-black">Loading...</h1>
      </div>
    }>
      <WorkContent />
    </Suspense>
  )
}
