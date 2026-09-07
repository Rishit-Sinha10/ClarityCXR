import Navbar from "./landing/Navbar";
import Hero from "./landing/hero";
import HowItWorks from "./landing/How-ItWorks";
import Showcase from "./landing/Showcase";
import Features from "./landing/feature";
import Footer from "./landing/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Showcase />
      <Features />
      <Footer />
    </>
  );
}
