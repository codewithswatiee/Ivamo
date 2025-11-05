"use client"
import { ImageSection } from "@/components/ImageSection"
import PortfolioSection from "@/components/work-banner"
import { PortfolioSection2 } from "@/components/gridSection"
import { gridData1, gridData2 } from "@/data/home/6gridSection"
import ReversePortfolioSection from "@/components/reverse-two-images"
import { belowProjects, projects } from "@/data/work/2sideImageData"
import { Helmet } from "react-helmet"

export default function Work() {

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
      <h1 className="text-[38px] md:text-[48px] mb-4 text-black pt-24 pl-3">Work</h1>
      <PortfolioSection left={projects.left} right={projects.right}/>
      <PortfolioSection2 projects={gridData1} />
      <ReversePortfolioSection left={belowProjects.left} right={belowProjects.right} />
      <PortfolioSection2 projects={gridData2} />
      <ImageSection imageAlt={'ivamo-studios'} imageSrcDesktop='/lastSection.png' imageSrcMobile='/lastSection-mobile.png'/>
    </div>
  )
}
