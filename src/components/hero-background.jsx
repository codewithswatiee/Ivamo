"use client"
import { cn } from "@/lib/utils"

const heroImages = [
  {
    url: "/1.png",
    title: "Natural History Museum",
    subtitle: "Moving the Museum from catalogue to catalyst.",
    service: "Brand Identity",
    client: "Arts & Culture",
  },
  {
    url: "/2.png",
    title: "General Catalyst",
    subtitle: "Designing the future of digital experiences.",
    service: "Brand Strategy",
    client: "Finance",
  },
  {
    url: "/3.png",
    title: "Sustainable Brand Initiative",
    subtitle: "Creating identity systems for environmental impact.",
    service: "Digital Experiences",
    client: "Non-profits",
  },
  {
    url: "/4.png",
    title: "Publishing Revolution",
    subtitle: "Transforming how stories are told and shared.",
    service: "Publications",
    client: "Publishing",
  },
  {
    url: "5.png",
    title: "Urban Development Project",
    subtitle: "Shaping spaces that bring communities together.",
    service: "Signage & Environmental Graphics",
    client: "Civic & Public",
  },
]


export default function HeroBackground({ currentImageIndex, onImageChange }) {
  const currentImage = heroImages[currentImageIndex]

  return (
    <section className="relative h-[85vh] overflow-hidden">
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

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[500px] h-[500px]">
          {/* Large circular logo/design */}
          <div className="absolute inset-0 rounded-full border-[40px] border-white/90 flex items-center justify-center">
            <div className="text-white text-[120px] font-bold">C</div>
          </div>
        </div>
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
