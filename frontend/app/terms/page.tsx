import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Terms that govern use of the ClarityCXR website. ClarityCXR is decision-support software, not a diagnosis.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="bg-background focus:outline-none"
      >
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
          <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
            Terms of use
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: November 17, 2026
          </p>

          <div className="mt-8 rounded-xl border border-hairline bg-surface p-5 text-sm leading-relaxed text-ink/80">
            These terms govern this website only. They are not the product
            terms, a customer agreement, or instructions for use.
          </div>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/80">
            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Using this site
              </h2>
              <p className="mt-2">
                By using this website, you agree to these terms. If you do not
                agree, do not use the site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Not medical advice
              </h2>
              <p className="mt-2">
                This site is informational. It does not provide medical advice,
                diagnosis, or treatment. ClarityCXR is decision-support software
                for qualified healthcare professionals. Outputs are not a
                diagnosis and require review by a qualified radiologist. If you
                have a medical emergency, contact your local emergency services.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Demo requests
              </h2>
              <p className="mt-2">
                Submitting a demo request does not create a customer
                relationship or guarantee access to the product. Availability,
                intended use, and regulatory status vary by market. Do not
                submit patient information through the demo form.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Acceptable use
              </h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>Do not use the site unlawfully or to harm others.</li>
                <li>
                  Do not attempt to disrupt, probe, or gain unauthorized access
                  to the site or its systems.
                </li>
                <li>
                  Do not scrape or copy the site at scale without written
                  permission.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Intellectual property
              </h2>
              <p className="mt-2">
                The site, including its text, design, graphics, and marks, is
                owned by us or our licensors. You may view the site for internal
                evaluation. No other license is granted.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Disclaimers
              </h2>
              <p className="mt-2">
                The site is provided &quot;as is&quot; and &quot;as
                available&quot; without warranties of any kind, to the extent
                permitted by law. We do not warrant that the site will be
                uninterrupted, error-free, or current.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Limitation of liability
              </h2>
              <p className="mt-2">
                To the extent permitted by law, we are not liable for indirect,
                incidental, special, or consequential damages arising from your
                use of the site. Nothing in these terms limits liability that
                cannot be limited by law.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Governing law
              </h2>
              <p className="mt-2">
                These terms are governed by the laws applicable to the operator
                of this site, without regard to conflict-of-laws rules. Any
                dispute will be handled by the courts with jurisdiction over the
                operator.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Changes and contact
              </h2>
              <p className="mt-2">
                We may update these terms. When we do, we will revise the date
                at the top of this page. Questions can be sent through the{" "}
                <Link
                  href="/demo"
                  className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-4"
                >
                  demo request form
                </Link>
                .
              </p>
            </section>
          </div>

          <p className="mt-12 border-t border-hairline pt-6 text-xs leading-relaxed text-muted-foreground">
            See also our{" "}
            <Link
              href="/privacy"
              className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-4"
            >
              privacy policy
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
