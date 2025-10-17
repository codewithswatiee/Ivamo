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

export default function HomePage() {

  return (
    <div className="bg-white">
      <HeroBackground currentImageIndex={0} onImageChange={() => {}} />

      <PortfolioSection left={projects.left} right={projects.right} showHeader={true} />
      <PortfolioSection2 projects={gridData} />
      <Carousel items={carouselItems} />
      <PortfolioSection left={belowProjects.left} right={belowProjects.right} />
      <ImageSection imageAlt={'ivamo-studios'} imageSrcDesktop='/lastSection.png' imageSrcMobile='/lastSection-mobile.png'/>
    </div>
  )
}
