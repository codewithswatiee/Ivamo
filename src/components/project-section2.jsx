"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"

const projects = [
  {
    id: "royal-collection",
    title: "Royal Collection Trust",
    description:
      "Design system and retail brand architecture that honours the collection's heritage while enabling the creation of distinctive, high-quality products.",
    image: "/royal.png",
    categories: ["Brand Identity", "Design System"],
    link: "/projects/royal-collection",
    backgroundColor: "bg-slate-800",
  },
  {
    id: "wildlife-camera",
    title: "Behold Wildlife Camera",
    description:
      "Industrial design of a species-detecting AI-powered camera that makes following wildlife in your garden simple, engaging and fun.",
    image: "/behold.png",
    categories: ["Consumer Brands", "Technology"],
    link: "/projects/wildlife-camera",
    backgroundColor: "bg-gray-200",
  },
  {
    id: "together-palestine",
    title: "Together for Palestine",
    description:
      "Visual identity for a new initiative that organises large, mainstream events to shift culture and public discourse on Palestine.",
    image: "/3.png",
    categories: ["Brand Identity", "Social Impact"],
    link: "/projects/together-palestine",
    backgroundColor: "bg-black",
  },
  {
    id: "karri-device",
    title: "KARRI Health Device",
    description:
      "Innovative health monitoring device with intuitive interface design for seamless user experience and medical data tracking.",
    image: "/kaari.png",
    categories: ["Product Design", "Healthcare"],
    link: "/projects/karri-device",
    backgroundColor: "bg-gray-100",
  },
  {
    id: "global-switch",
    title: "Global Switch",
    description:
      "We design Everything for Everyone - comprehensive digital infrastructure and data center solutions with cutting-edge technology.",
    image: "/global.png",
    categories: ["Technology", "Infrastructure"],
    link: "/projects/global-switch",
    backgroundColor: "bg-emerald-900",
  },
  {
    id: "grale",
    title: "Grale",
    description:
      "Modern typography and brand identity system with clean, sophisticated design approach for contemporary business solutions.",
    image: "/grale.png",
    categories: ["Typography", "Brand Identity"],
    link: "/projects/grale",
    backgroundColor: "bg-white",
  },
]

export function PortfolioSection2() {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section className="py-16 px-4 w-full mx-auto font-regular">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative mb-3"
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Link href={project.link} className="block">
              <div className="relative overflow-hidden aspect-[4/2.5] mb-0">
                <motion.div
                  className={`absolute inset-1`}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Hover overlay
                // <motion.div
                //   initial={{ opacity: 0 }}
                //   animate={{ opacity: hoveredCard === project.id ? 1 : 0 }}
                //   transition={{ duration: 0.3 }}
                //   className="absolute inset-0 bg-black/20"
                // /> */}
              </div>

              <motion.div className="text-regular" initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                <h3 className="text-md text-black/90 mb-1 transition-colors">
                  {project.title}
                </h3>
                <p className="text-black/70 text-md font-[520] mb-3">{project.description}</p>

                <div className="relative overflow-hidden h-8">
                  <motion.div
                    initial={{ y: -40 }}
                    animate={{
                      y: hoveredCard === project.id ? 0 : -40,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="flex flex-wrap gap-2"
                  >
                    {project.categories.map((category, categoryIndex) => (
                      <motion.span
                        key={category}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: hoveredCard === project.id ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          delay: hoveredCard === project.id ? categoryIndex * 0.1 : 0,
                        }}
                        className="bg-gray-100 text-gray-800/80 font-[100] px-2 py-0.5 rounded text-sm"
                        style={{
                          backgroundColor: "#e5e7eb !important",
                          color: "#374151 !important",
                        }}
                      >
                        {category}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
