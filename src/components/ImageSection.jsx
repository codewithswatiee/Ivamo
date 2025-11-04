import Image from "next/image"

export const ImageSection = ({imageSrcDesktop, imageSrcMobile, imageAlt}) => {
  return (
    <picture className="">
      <source media="(min-width: 768px)" srcSet={imageSrcDesktop} />
      <Image
        width={100}
        height={100}
        src={imageSrcMobile}
        alt={imageAlt}
        className="w-full object-cover h-auto md:h-auto"
      />
    </picture>
  )
}


