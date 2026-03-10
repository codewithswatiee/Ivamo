import AnimatedImage from "./AnimatedImage"

export const ImageSection = ({imageSrcDesktop, imageSrcMobile, imageAlt}) => {
  return (
    <div className="w-full h-auto">
      <AnimatedImage 
        desktopSrc={imageSrcDesktop} 
        mobileSrc={imageSrcMobile || imageSrcDesktop}
        alt={imageAlt}
        imgClassName="w-full h-auto md:h-auto" 
      />
    </div>
  )
}


