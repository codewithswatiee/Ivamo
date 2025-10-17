"use client"
import { cn } from "@/lib/utils"

const heroImages = [
  {
    url: "/chorus_banner.jpg",
    title: "Chorus",
    subtitle: "Evolved Moonray into Chorus through a complete rebrand, expressive digital identity, and immersive art-led web experience.",
    service: "Brand Strategy",
    client: "Finance",
  },
  {
    url: "/init_banner.jpg",
    title: "INIT",
    subtitle: "Revitalized INIT with a website redesign and expressive packaging that transforms fragrance into intimate, sensory storytelling.",
    service: "Brand Identity",
    client: "Furniture",
  },
  {
    url: "/Raise_banner.jpg",
    title: "The Raise Project",
    subtitle: "Interactive website for research-driven child safety education project.",
    service: "Brand Identity",
    client: "Arts & Culture",
  },
]


export default function HeroBackground({ currentImageIndex, onImageChange }) {
  const currentImage = heroImages[currentImageIndex] || heroImages[0];

  return (
    <section className="relative h-[92vh] overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              index === currentImageIndex ? "opacity-100" : "opacity-0",
            )}
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      {/* Project Info */}
      <div className="absolute bottom-8 left-8 text-white">
        <h3 className="text-2xl font-bold mb-2">{currentImage.title}</h3>
        <p className="text-lg opacity-90">{currentImage.subtitle}</p>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        {/* prev / next buttons */}
        <button
          aria-label="previous image"
          onClick={() => onImageChange(Math.max(0, currentImageIndex - 1))}
          className="bg-white/90 cursor-pointer rounded-md p-3 shadow-sm hover:opacity-95 transition"
        >
          <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9.5L2 5.5M2 5.5L6 1.5M2 5.5H12" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10"/>
          </svg>
        </button>

        <button
          aria-label="next image"
          onClick={() => onImageChange(Math.min(heroImages.length - 1, currentImageIndex + 1))}
          className="bg-white/90 cursor-pointer rounded-md p-3 shadow-sm hover:opacity-95 transition"
        >
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L10 5L6 1" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10"/>
            <path d="M10 5H0" stroke="#1A1A1A" strokeWidth="1.5" strokeMiterlimit="10"/>
          </svg>
        </button>
      </div>
    </section>
  )
}

export { heroImages }
