'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ZoomImageSection = ({image}) => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const [imageAspectRatio, setImageAspectRatio] = useState(1)
  const isInView = useInView(sectionRef, { amount: 0.1, once: false })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  })
  
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 0.99])

  useEffect(() => {
    const img = new Image()
    img.src = image
    img.onload = () => {
      setImageAspectRatio(img.width / img.height)
    }
  }, [image])

  return (
    <section 
      ref={sectionRef}
      className="max-h-screen relative overflow-hidden px-2"
    >
      <div className="w-full h-full overflow-hidden">
        <motion.div
          ref={imageRef}
          className="w-full h-full"
          initial={{ scale: 1 }}
          style={{ 
            scale: isInView ? scale : 1.19,
            height: `calc(100vw / ${imageAspectRatio})`,
            maxHeight: '100vh',
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-full w-screen ">
            <img
              src={image}
              alt="Watercolor landscape painting showing a serene beach scene"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ZoomImageSection

