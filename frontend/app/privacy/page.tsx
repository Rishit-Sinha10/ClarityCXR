import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../landing/Navbar";
import Footer from "../landing/Footer";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How ClarityCXR handles information submitted through this website, including demo requests and server logs.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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
            Privacy policy
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: November 17, 2026
          </p>

          <div className="mt-8 rounded-xl border border-hairline bg-surface p-5 text-sm leading-relaxed text-ink/80">
            This policy describes this website. It does not describe the
            clinical product or any processing carried out under a customer
            agreement. Do not submit patient information through this site.
          </div>

          <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/80">
            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Who we are
              </h2>
              <p className="mt-2">
                ClarityCXR operates this website. You can reach us through the{" "}
                <Link
                  href="/demo"
                  className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-4"
                >
                  demo request form
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Information we collect
              </h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  Details you submit in the demo form: name, work email,
                  institution, role, chest volume, and any message you add.
                </li>
                <li>
                  Technical data needed to serve and secure the site, such as IP
                  address, browser type, and requested pages in server logs.
                </li>
                <li>Authentication cookies if you sign in to the product.</li>
              </ul>
              <p className="mt-3">
                We do not ask for patient information on this site. Please do
                not submit protected health information or other sensitive
                personal data through the demo form.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                How we use it
              </h2>
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>To respond to demo requests and arrange walkthroughs.</li>
                <li>To operate, maintain, and secure the website.</li>
                <li>To comply with applicable law and enforce our terms.</li>
              </ul>
              <p className="mt-3">
                Where data protection law requires a legal basis, we rely on our
                legitimate interests in responding to business requests and
                securing the site, and on consent where consent is required.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Sharing
              </h2>
              <p className="mt-2">
                We share information with service providers that host the site
                and deliver form submissions, with professional advisers, and
                with authorities where required by law. We do not sell personal
                data. Providers may process data outside your country using
                appropriate safeguards.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Retention
              </h2>
              <p className="mt-2">
                We keep demo requests for as long as needed to respond and
                maintain business records, then delete or anonymize them. Server
                logs are kept for a limited period.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Your rights
              </h2>
              <p className="mt-2">
                Depending on where you live, you may have the right to access,
                correct, delete, or object to the processing of your personal
                data, or to request a portable copy. Contact us through the demo
                form and we will route your request. You may also complain to
                your local data protection authority.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Cookies
              </h2>
              <p className="mt-2">
                We use essential cookies to keep you signed in. We do not use
                advertising cookies on this site.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl tracking-tight text-ink">
                Changes
              </h2>
              <p className="mt-2">
                We may update this policy. When we do, we will revise the date
                at the top of this page.
              </p>
            </section>
          </div>

          <p className="mt-12 border-t border-hairline pt-6 text-xs leading-relaxed text-muted-foreground">
            See also our{" "}
            <Link
              href="/terms"
              className="font-medium text-accent-ink underline decoration-accent/40 underline-offset-4"
            >
              terms of use
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
