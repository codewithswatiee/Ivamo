import Link from "next/link"
import Image from "next/image"

const newsItems = [
  {
    type: "Work",
    date: "Sep 11, 2025",
    title: "'The Nineties x Anna Sui'",
    description:
      "Abbott Miller and team design the first monograph on the influential fashion designer's era-defining work.",
    image: "/Anna.png",
    link: "/work/nineties-anna-sui",
  },
  {
    type: "Work",
    date: "Sep 10, 2025",
    title: "Baret Scholars",
    description:
      "Luke Hayman and team design the visual identity for a unique educational program that takes students around the world during their gap year.",
    image: "/barret.png",
    link: "/work/baret-scholars",
  }
]

export function Footer() {
  return (
    <footer className="bg-black text-white mt-7">
      {/* News Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-light mb-8">News</h2>
            </div>
            <div className="lg:col-span-3 space-y-8">
              {newsItems.map((item, index) => (
                <Link key={index} href={item.link} className="block group">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-80 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={320}
                        height={200}
                        className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">{item.type}</span>
                        <span className="text-sm text-gray-400">{item.date}</span>
                      </div>
                      <h3 className="text-xl font-light mb-2 group-hover:text-gray-300 transition-colors">
                        {item.title}
                      </h3>
                      {item.description && <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/news" className="text-white underline hover:text-gray-300 transition-colors">
              See all news
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* New Business Inquiries */}
          <div>
            <h3 className="text-lg font-light mb-8">New Business Inquiries</h3>
          </div>

          {/* Office Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                <div>
                  <div className="font-light">London</div>
                  <Link
                    href="mailto:london@pentagram.com"
                    className="text-gray-400 hover:text-white transition-colors underline"
                  >
                    london@pentagram.com
                  </Link>
                </div>
                <div>
                  <div className="font-light">New York</div>
                  <Link
                    href="mailto:newyork@pentagram.com"
                    className="text-gray-400 hover:text-white transition-colors underline"
                  >
                    newyork@pentagram.com
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <div className="font-light">Austin</div>
                  <Link
                    href="mailto:austin@pentagram.com"
                    className="text-gray-400 hover:text-white transition-colors underline"
                  >
                    austin@pentagram.com
                  </Link>
                </div>
                <div>
                  <div className="font-light">Berlin</div>
                  <Link
                    href="mailto:info@pentagram.de"
                    className="text-gray-400 hover:text-white transition-colors underline"
                  >
                    info@pentagram.de
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-light mb-8">About</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Pentagram is the world's most acclaimed creative collective, where 23 partners work independently and
              collaboratively to shape the future of design. Guided by curiosity and intellect, we create work that
              redefines ideas, shifts perceptions, and leaves an imprint across disciplines and industries.
            </p>
          </div>
        </div>

        {/* Large IVAMO Logo */}
        <div className="text-center mb-16">
          <h1 className="text-[10rem] md:text-[12rem] lg:text-[15rem] font-laLuxes leading-none tracking-tight">
            IVAMO
          </h1>
        </div>

        {/* Bottom Links */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </Link>
            <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
              LinkedIn
            </Link>
            <Link href="https://x.com" className="text-gray-400 hover:text-white transition-colors">
              X
            </Link>
            <Link href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </Link>
            <Link href="/newsletter" className="text-gray-400 hover:text-white transition-colors">
              Newsletter
            </Link>
            <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
              Careers
            </Link>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>© 1972 – 2025 Pentagram</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
