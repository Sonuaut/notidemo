
import Navbar from "@/components/landingpage/Navbar";
import Hero from "@/components/landingpage/Hero";
import About from "@/components/landingpage/About";
import Features from "@/components/landingpage/Features";
import HowItWorks from "@/components/landingpage/HowItWorks";
import HowTeacherUse from "@/components/landingpage/HowTeacherUse";
import GetApps from "@/components/landingpage/GetApps";
import Testimonial from "@/components/landingpage/Testimonial";
import Cta from "@/components/landingpage/Cta";
import Footer from "@/components/landingpage/Footer";
import './globals.css'
export default function HomePage() {
  

  return (
    <div className="w-full sansation-font ">
    <Navbar />
    <Cta />
    <About />
    <Features />
    <HowTeacherUse />
    <Testimonial />
    <main>
      {/* <Hero /> */}
      {/* <HowItWorks /> */}
      {/* <GetApps /> */}
     </main>
    <Footer />
  </div>
  )
}
