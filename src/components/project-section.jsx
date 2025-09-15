"use client"

import { useState } from "react"

const projectsData = [
  {
    id: 1,
    title: "'The Nineties x Anna Sui'",
    description:
      "Book design for a new monograph on the influential fashion designer's era-defining work in the 1990s.",
    backgroundColor: "bg-gradient-to-br from-purple-300 to-purple-400",
    image: "/black-book-with-as-typography-on-purple-background.jpg",
    imageAlt: "Black book with AS typography design",
  },
  {
    id: 2,
    title: "Baret Scholars",
    description:
      "Visual identity for a unique educational program that takes students around the world during their gap year.",
    backgroundColor: "bg-gradient-to-br from-green-300 to-teal-400",
    hasFloatingSelector: true,
    logoText: "BARET",
    subText: "SCHOLARS",
  },
]

export default function ProjectsSection() {
  const [currentService] = useState("Everything")
  const [currentClient] = useState("Everyone")

  return (
    <section className="min-h-screen bg-white">
      {/* Header */}
      <div className="text-center py-16">
        <h2 className="text-lg text-gray-600 mb-4">See latest projects</h2>
        <div className="flex justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className={`${project.backgroundColor} relative flex flex-col justify-between p-8 lg:p-12 min-h-[600px]`}
          >
            {project.hasFloatingSelector ? (
              // Right card with large typography and floating selector
              <div className="flex flex-col justify-center items-center h-full relative">
                <div className="text-center mb-8">
                  <div className="text-white text-6xl lg:text-8xl font-light tracking-wider mb-4">
                    {project.logoText?.split("").map((letter, index) => (
                      <span
                        key={index}
                        className="inline-block border-r border-white/30 pr-4 mr-4 last:border-r-0 last:pr-0 last:mr-0"
                      >
                        {letter}
                      </span>
                    ))}
                  </div>
                  <div className="text-white text-2xl lg:text-3xl font-light tracking-[0.3em]">{project.subText}</div>
                </div>

                {/* Floating Selector positioned at bottom */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span>We design</span>
                      <button className="font-medium hover:text-black transition-colors">{currentService} ↓</button>
                      <span>for</span>
                      <button className="font-medium hover:text-black transition-colors">{currentClient} ↓</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Left card with image and text
              <div className="flex flex-col justify-between h-full">
                <div className="flex-1 flex items-center justify-center mb-8">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.imageAlt}
                    className="max-w-full max-h-80 object-contain transform rotate-12 hover:rotate-6 transition-transform duration-500"
                  />
                </div>

                <div className="text-black">
                  <h3 className="text-xl font-medium mb-3">{project.title}</h3>
                  <p className="text-gray-700 leading-relaxed max-w-md">{project.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
