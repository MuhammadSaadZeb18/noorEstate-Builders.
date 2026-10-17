import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { PropertyListings } from "@/components/sections/PropertyListings";
import { HomepageMotion } from "@/components/motion/HomepageMotion";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Locations } from "@/components/sections/Locations";
import { Reels } from "@/components/sections/Reels";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQs } from "@/components/sections/FAQs";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
export default function Home() {
  return <MotionProvider>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main" tabIndex={-1}>
      <Hero />
      <HomepageMotion>
        <WhyChooseUs /><About /><PropertyListings /><Services /><Process />
        <Locations /><Reels /><Team /><Testimonials /><Contact />
      </HomepageMotion>
    </main>
    <Footer />
  </MotionProvider>;
}
