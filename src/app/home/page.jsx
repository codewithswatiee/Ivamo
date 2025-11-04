"use client"

import Carousel from "@/components/carousel"
import HeroBackground from "@/components/hero-background"
import { ImageSection } from "@/components/ImageSection"
import PortfolioSection from "@/components/work-banner"
import { PortfolioSection2 } from "@/components/gridSection"
import { belowProjects, projects } from "@/data/home/2sideImageData"
import { gridData2, gridData1} from "@/data/home/6gridSection"
import carouselItems from "@/data/home/carouselData"
import { FloatingNavBar } from "@/components/floating-nav-bar"
import { Helmet } from "react-helmet"

export default function HomePage() {

  return (
    <div className="bg-white">
      <Helmet>
        <title>IVAMO Studios: Creative Branding & Marketing Agency in Mumbai</title>
        <meta name="description" content="Mumbai-based creative agency delivering branding, design, and marketing solutions. IVAMO crafts campaigns, identities, and websites that make brands unforgettable." />
        <meta property="og:title" content="IVAMO Studios: Creative Branding & Marketing Agency in Mumbai" />
        <meta property="og:description" content="Mumbai-based creative agency delivering branding, design, and marketing solutions. IVAMO crafts campaigns, identities, and websites that make brands unforgettable." />
        <meta property="og:image" content="https://ivamostudios.in/favicon.ico" />
        <meta property="og:url" content="https://ivamostudios.in" />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroBackground currentImageIndex={0} onImageChange={() => {}} />
      <FloatingNavBar />
      <PortfolioSection left={projects.left} right={projects.right} showHeader={true} />
      <PortfolioSection2 projects={gridData1} />
      <Carousel items={carouselItems} />
      <PortfolioSection left={belowProjects.left} right={belowProjects.right} />
      <PortfolioSection2 projects={gridData2} />
      <ImageSection imageAlt={'ivamo-studios'} imageSrcDesktop='/lastSection.png' imageSrcMobile='/lastSection-mobile.png'/>
    </div>
  )
}
