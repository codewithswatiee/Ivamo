"use client"

import { useRef } from "react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Carousel({ items }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const setRefs = useRef([])
  const isInitialScroll = useRef(true)
  const CARD_WIDTH = 320
  const CARD_GAP = 24 // matches gap-6 (24px)

  // Basic keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [index])

  // group items into sets of 4
  const sets = []
  for (let i = 0; i < items.length; i += 4) sets.push(items.slice(i, i + 4))

  const prev = () => {
    setIndex((i) => Math.max(0, i - 1))
  }
  const next = () => {
    setIndex((i) => Math.min(sets.length - 1, i + 1))
  }

  // scroll into view when index changes
  useEffect(() => {
    // skip scrolling on initial mount to avoid jumping the page
    if (isInitialScroll.current) {
      isInitialScroll.current = false
      return
    }

    // scroll to the set container (desktop behaviour)
    const el = setRefs.current[index]
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
    }
  }, [index])

  return (
    <div className="w-full relative bg-black text-white px-4">
      {/* top: header with title + description on left, nav on right */}
      <div className="mx-auto py-8 flex items-center justify-between gap-2 px-3">
        <div className="flex-1 max-w-[77vw]">
          <h2 className="carousel-title">Designed for Now. Built for What’s Next.</h2>
          <p className="mt-3 carousel-desc">At IVAMO Studios, we design with purpose and build with perspective. Every brand has a story waiting to be redefined—our job is to translate that story into bold identities, intuitive interfaces, and digital experiences that feel unmistakably today while shaping tomorrow. We don’t just design brands; we evolve them for the world ahead.</p>
        </div>
        {/* hide controls on small screens, show on md+ */}
        <div className="hidden md:flex-shrink-0 md:flex items-center gap-3">
          <button aria-label="previous" onClick={prev} className="carousel-btn cursor-pointer"><svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9.5L2 5.5M2 5.5L6 1.5M2 5.5H12" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10"/>
            </svg>
          </button>
          <button aria-label="next" onClick={next} className="carousel-btn cursor-pointer"><svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L10 5L6 1" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10"/>
            <path d="M10 5H0" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10"/>
            </svg>
          </button>
        </div>
      </div>

      {/* carousel track (no visible scrollbar). Render sets - each set contains 4 cards */}
      <div className="mx-auto pb-8">
        <div className="overflow-hidden">
          <div ref={trackRef} className="carousel-track flex gap-6 py-4 overflow-x-auto scroll-snap-x" style={{ paddingLeft: 12, paddingRight: 12 }}>
            {sets.map((set, setIndex) => (
              <div
                key={`set-${setIndex}`}
                ref={(el) => (setRefs.current[setIndex] = el)}
                className="set-panel shrink-0 rounded-md p-4"
                style={{
                  background: "#171717",
                  // compute exact width: sum of card widths + gaps + horizontal padding (p-4 => 16*2)
                  width:
                    set.length * CARD_WIDTH +
                    (set.length - 1) * CARD_GAP +
                    16 * 2,
                  overflow: "hidden",
                }}
              >
                <div className="flex gap-6">
                  {set.map((it) => (
                    <article key={it.id} className="carousel-card bg-[#111] shrink-0 w-[320px]">
                      <Link href={`/projects/${it.id}`} className="block">
                        <div className="h-[400px] bg-cover bg-center" style={{ backgroundImage: `url(${it.image})` }} />
                        <div className="p-4">
                          <h3 className="text-[16px] text-white mb-1">{it.title}</h3>
                          <p className="text-[16px] text-[#8C8C8C]">{it.description}</p>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom quote */}
      {/* <div className="mx-auto border-t border-gray-700 py-10 text-left">
        <blockquote className="carousel-quote">I believe design starts with truly understanding the problem—listening closely, questioning deeply, and then creating solutions that have real meaning and purpose.</blockquote>
        <div className="author">Shruti Mohan - Founder, Ivamo Studios</div>
      </div> */}

      <style jsx>{`
        :global(body) { background: #000 }
        .carousel-title { color: #ffffff; font-weight: 400; font-size: 36px; line-height: 1.05 }
        .carousel-desc { color: #bfbfbf; font-size: 16px }
        .carousel-btn { background: rgba(255,255,255,0.95); color: #000; border-radius: 8px; padding: 12px 18px; }

        .carousel-track { scroll-padding: 16px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch }
  .set-panel { scroll-snap-align: center; border-radius: 8px; overflow: hidden; box-sizing: border-box }
        .carousel-card { scroll-snap-align: start }

        /* hide scrollbar (modern) */
        .carousel-track::-webkit-scrollbar { display: none }
        .carousel-track { -ms-overflow-style: none; scrollbar-width: none }
        /* Desktop sizes */
        @media (min-width: 768px) {
          .carousel-title { font-size: 52px }
          .carousel-desc { font-size: 18px }
        }

        /* Mobile sizes */
        @media (max-width: 767px) {
          .carousel-title { font-size: 36px }
          .carousel-desc { font-size: 16px; text-align: justify }
        }

        /* exact card text sizes */
  .carousel-card { overflow: hidden }
  .carousel-card h3 { font-size: 16px; color: #ffffff }
  .carousel-card p { font-size: 16px; color: #8C8C8C }

  /* ensure cards don't grow or overflow their set container */
  .carousel-card { flex: 0 0 320px }
      `}</style>
    </div>
  )
}
