
const HeroBanner = () => {
  return (
    // give an id so other components can detect when this banner becomes sticky
    <div id="hero-banner" className="mx-auto bg-black top-0 h-[60vh] p-3 leading-tight sticky z-30">
      <h1 className="font-bold text-[32px] md:text-[52px] xs:text-[22px] text-center pt-32">Designed for Now. Built for What’s Next.</h1>
      {/* <p className="font-medium text-[16px] md:text-[16px] pt-6 text-center pb-12">We're a team of 1200+ Specialists delivering award-winning work for 350+ brands worldwide, 10 years and counting!</p> */}
    </div>
  )
}

export default HeroBanner;
