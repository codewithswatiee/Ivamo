import { Header } from "@/components/header";
import HeroSection from "@/components/hero";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <div className="h-[200vh] bg-white"></div>
      <div className="h-[200vh] bg-black"></div>
    </div>
  );
}
