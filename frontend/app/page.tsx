import type { Metadata } from "next";
import Navbar from "./landing/Navbar";
import Hero from "./landing/hero";
import HowItWorks from "./landing/How-It-Works";
import Features from "./landing/feature";
import Trust from "./landing/Trust";
import Footer from "./landing/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <HowItWorks />
        <Features />
        <Trust />
      </main>
      <Footer />
    </>
  );
}
