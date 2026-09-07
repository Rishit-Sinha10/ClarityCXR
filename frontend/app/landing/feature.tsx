import Reveal from "./reval";
const features = [
  {
    title: "Multimodal Analysis",
    desc: "Understand medical images, clinical text, documents, voice, and structured data together for a complete view of patient information.",
  },
  {
    title: "Clinical Document Intelligence",
    desc: "Extract, summarize, and organize key information from medical reports, records, prescriptions, and clinical documents.",
  },
  {
    title: "Medical Image Understanding",
    desc: "Analyze medical imaging alongside clinical context to surface relevant findings and patterns for healthcare professionals.",
  },
  {
    title: "Patient Data Synthesis",
    desc: "Bring fragmented patient information together into a clear, contextualized view that is easier to understand and act on.",
  },
  {
    title: "Clinical Decision Support",
    desc: "Generate evidence-informed insights and recommendations to help clinicians make faster, more informed decisions.",
  },
  {
    title: "Secure by Design",
    desc: "Protect sensitive healthcare data with privacy, access controls, encryption, and secure infrastructure built for healthcare workflows.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32"
    >
      <Reveal delay={80}>
        <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl">
          Complex Data.
          <br />
          <span className="italic">Clear</span> decisions.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={(i % 3) * 90 + Math.floor(i / 3) * 40}>
            <div className="group h-full rounded-2xl border border-border bg-surface p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 hover:bg-primary-soft/40">
              <h3 className="mt-5 font-display text-[1.35rem] tracking-tight text-foreground">
                {f.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
