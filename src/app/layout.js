import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import { Header } from "@/components/header";
import Script from 'next/script'
import PageLoader from '@/components/page-loader'

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

// export const metadata = {
//   title: "IVAMO Studios: Creative Branding & Marketing Agency in Mumbai",
//   description: "Mumbai-based creative agency delivering branding, design, and marketing solutions. IVAMO crafts campaigns, identities, and websites that make brands unforgettable.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="hJd-IgVeJ3oYBeTWs0O-YHE-yJZTs8KRZjfJt6djGOE"
        />
        {/* Load Google Tag Manager via Next.js Script component for safe insertion */}
        <Script id="gtm-inline" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P88NVSPG');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${laLuxes.variable} ${regular.variable} antialiased`}
      >
        {/* GTM noscript fallback for users without JS enabled */}
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P88NVSPG" height="0" width="0" style={{display:'none',visibility:'hidden'}} title="gtm" />
        </noscript>
        <Header />
        <PageLoader />
        {children}
        <Footer />
      </body>
    </html>
  );
}
