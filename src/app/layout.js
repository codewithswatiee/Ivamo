import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import { Header } from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// load your local fonts correctly
const laLuxes = localFont({
  src: "../fonts/LaLuxes.otf",
  variable: "--font-laLuxes",
});

const montserrat = localFont({
  src: "../fonts/Montserrat.ttf",
  variable: "--font-montserrat",
});

const regular = localFont({
  src: "../fonts/Regular.otf",
  variable: "--font-regular",
});

export const metadata = {
  title: "Ivamo",
  description: "Ivamo - Crafting Digital Experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${laLuxes.variable} ${regular.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
