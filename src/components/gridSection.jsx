"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"



export function PortfolioSection2({projects}) {
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <section className="bg-white py-3 px-4 w-full mx-auto">
      {/* Responsive exact pixel font-size overrides for md+ screens and base mobile sizes */}
      <style>{`
        /* Mobile (base): title/desc 14px, tags 12px */
        .ps2-title { font-size: 14px; color: #000000; }
        .ps2-desc { font-size: 14px; color: #767676; }
        .ps2-tag { font-size: 12px; background: #EDEDED; color: #000000; }

        /* Desktop & tablet (md+): title/desc 16px, tags 14px */
        @media (min-width: 768px) {
          .ps2-title { font-size: 16px !important; }
          .ps2-desc { font-size: 16px !important; }
          .ps2-tag { font-size: 14px !important; }
        }
      `}</style>
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
                  /* use inset-0 so the image edges align flush with the container and the text below */
                  className={`absolute inset-0`}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              <motion.div className="text-regular mt-2">
                {/* Title: desktop 16px, mobile 14px, color black */}
                <h3 className="mb-1 transition-colors ps2-title">
                  <span className="block md:inline">{project.title}</span>
                </h3>
                {/* Description: color #767676, desktop 16px, mobile 14px */}
                <p className="mb-3 ps2-desc">{project.description}</p>

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
                        className="font-[100] px-2 py-0.5 rounded ps2-tag"
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
