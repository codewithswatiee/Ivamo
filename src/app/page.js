import FloatingSelector from "@/components/floating-selector";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import HomePage from "@/pages/home";

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}
