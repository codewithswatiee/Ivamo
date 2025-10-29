import { notFound } from 'next/navigation'
import { workData } from '@/data/work/allworkData'

// import { Helmet } from 'react-helmet'
// Use Next.js app-router metadata function instead of react-helmet which
// causes SSR/runtime errors in this environment.
export async function generateMetadata({ params }) {
  const { slug } = params
  const normalized = slug.startsWith('+') ? slug.slice(1) : slug
  const item = workData[slug] || workData[normalized]

  if (!item) {
    return {
      title: 'Project | IVAMO Studios',
    }
  }

  return {
    title: `${item.title} | IVAMO Studios`,
    openGraph: {
      title: `${item.title} | IVAMO Studios`,
      images: item.images && item.images.length > 0 ? [item.images[0]] : undefined,
    },
  }
}

export default function ProjectPage({ params }) {
  const { slug } = params

  // support slugs that may include a leading + (e.g. "+91") while keys in data may be "91"
  const normalized = slug.startsWith('+') ? slug.slice(1) : slug
  const item = workData[slug] || workData[normalized]

  if (!item) return notFound()

  return (
    <div className="min-h-screen bg-white text-black">
      
      <section className="p-4 md:p-4">
        <div className="mb-6 mt-5">
          <h1 className="text-[18px] md:text-[38px] mb-4">{item.title}</h1>
          <p className="max-w-3xl text-[16px] opacity-90 mb-4">{item.description}</p>

          {item.tags && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <span key={t} className="text-sm px-3 py-1 bg-gray-100 text-black rounded-full">{t}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* First two images (large) */}
      {item.images && item.images.length > 0 && (
        <section className="space-y-8">
          {item.images.slice(0, 2).map((src, i) => (
            <div key={i} className="w-full p-3">
              <img src={src} alt={`${item.title} ${i + 1}`} className="w-full h-auto md:h-auto object-cover" />
            </div>
          ))}
        </section>
      )}

      {/* About */}
      <section className="p-3  md:p-3">
        <div className="mb-8 flex flex-col md:items-end">
          <p className="text-gray-700 md:max-w-[60vw] text-justify">{item.about}</p>
        </div>
      </section>

      {item.images && item.images.length > 2 && (
        <section className="space-y-8">
          {item.images.slice(2).map((src, i) => (
            <div key={i} className="w-full p-3">
              <img src={src} alt={`${item.title} ${i + 3}`} className="w-full h-auto md:h-auto object-cover" />
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
