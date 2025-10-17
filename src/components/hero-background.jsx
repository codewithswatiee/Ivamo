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
    <section className="relative h-[100vh] overflow-hidden">
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
      <div className="absolute bottom-8 right-8 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => onImageChange(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentImageIndex ? "bg-white" : "bg-white/40",
            )}
          />
        ))}
      </div>
    </section>
  )
}

export { heroImages }
