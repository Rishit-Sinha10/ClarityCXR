import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import Reveal from "./reval";

const commitments = [
  {
    title: "Every claim has a source",
    body: "Drafts link each finding to the film, lab, or note behind it, so review starts from evidence instead of a black box.",
  },
  {
    title: "A radiologist signs",
    body: "Nothing is auto-signed. ClarityCXR drafts; the clinician reviews, edits, and signs every read.",
  },
  {
    title: "Synthetic by default",
    body: "Every demo on this site uses synthetic data. No PHI is needed to evaluate the product.",
  },
  {
    title: "No borrowed credibility",
    body: "We will not display a customer logo, testimonial, accuracy number, or certification until it is real and current.",
  },
];

const faqs = [
  {
    q: "Is ClarityCXR a diagnostic device?",
    a: "No. ClarityCXR is decision-support software. It does not provide a diagnosis or treatment recommendation, and a qualified radiologist reviews and signs every read. Regulatory status varies by market.",
  },
  {
    q: "Can we test it on our own cases?",
    a: "Yes, after de-identification and a data-handling review. We scope a pilot around your priors and workflow. The first step is a 20-minute walkthrough with a de-identified study, or ours.",
  },
  {
    q: "How do you measure performance?",
    a: "We do not publish accuracy claims on this site. Performance depends on the population, acquisition, and reporting workflow, so an evaluation should be designed around yours. We will share methods and limitations before any pilot.",
  },
  {
    q: "What is your regulatory status?",
    a: "It varies by market. We will confirm the current status and intended use for your region rather than publish a claim that may not apply to you. Ask us and we will answer directly.",
  },
  {
    q: "Do you need patient data for a demo?",
    a: "No. Use a synthetic or de-identified study. Do not send patient information through this website or the demo form.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function Trust() {
  return (
    <section id="trust" className="border-t border-hairline bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            Trust &amp; evaluation
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
            Proof, without
            <br />
            the <span className="italic">theater</span>.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            We do not publish logos, accuracy numbers, or certifications we
            cannot substantiate. Here is what we can show you, and how to check
            it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal delay={160}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                What you can check
              </p>
              <ul className="mt-5 space-y-5">
                {commitments.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent-ink">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/demo"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                Start with a clinical walkthrough
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Questions we get
              </p>
              <div className="mt-3 border-t border-hairline">
                {faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border-b border-hairline py-4"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <Plus
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                        aria-hidden
                      />
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
