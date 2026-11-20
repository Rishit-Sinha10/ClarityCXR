import type { Metadata } from "next";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";
import DemoForm from "./demo-form";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a 20-minute clinical walkthrough of ClarityCXR. See how chest X-ray and CT findings are linked to reports, labs, and prior notes, with every claim traceable to its source.",
  alternates: { canonical: "/demo" },
};
export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="bg-background focus:outline-none"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-16 lg:py-24">
          <div>
            <h1 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
              See the fused read on your own workflow.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              A 20-minute walkthrough for radiologists, department leads, and
              imaging IT. We will show how a chest X-ray or CT is read alongside
              the chart, the priors, and the note — with every finding traceable
              to its source.
            </p>
            <p className="mt-10 max-w-md border-t border-hairline pt-6 text-xs leading-relaxed text-muted-foreground">
              ClarityCXR is decision support, not a diagnosis. The radiologist
              reviews and signs every read. Please use synthetic or
              de-identified data in the demo. Availability and regulatory status
              vary by market.
            </p>
          </div>

          <DemoForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
