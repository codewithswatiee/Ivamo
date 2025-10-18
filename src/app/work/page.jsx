"use client"
import { ImageSection } from "@/components/ImageSection"
import PortfolioSection from "@/components/work-banner"
import { PortfolioSection2 } from "@/components/gridSection"
import { gridData } from "@/data/home/6gridSection"
import ReversePortfolioSection from "@/components/reverse-two-images"
import { belowProjects, projects } from "@/data/work/2sideImageData"

export default function Work() {

  return (
    <div className="bg-white">
      <h1 className="text-[18px] md:text-[48px] mb-4 text-black pt-3 m-3">Work</h1>
      <PortfolioSection left={projects.left} right={projects.right}/>
      <PortfolioSection2 projects={gridData} />
      <ReversePortfolioSection left={belowProjects.left} right={belowProjects.right} />
      <ImageSection imageAlt={'ivamo-studios'} imageSrcDesktop='/lastSection.png' imageSrcMobile='/lastSection-mobile.png'/>
    </div>
  )
}
