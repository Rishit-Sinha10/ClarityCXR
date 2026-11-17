import Reveal from "./reval";
const features = [
  {
    title: "Image intake",
    desc: "Upload chest X-ray images in PNG, JPG, or WebP format through the connected API.",
  },
  {
    title: "Study history",
    desc: "Review uploaded image filenames, file sizes, timestamps, and statuses from your study service.",
  },
  {
    title: "Prediction requests",
    desc: "Submit a selected study to your configured prediction service and inspect the response it returns.",
  },
  {
    title: "Image and text workspace",
    desc: "Keep a selected study beside a text prompt. Prompts are saved in this browser; conversational replies are not connected.",
  },
  {
    title: "Service health",
    desc: "Check API and database availability from settings, and update your account name.",
  },
  {
    title: "Clear boundaries",
    desc: "The current app does not independently interpret images, generate diagnoses, or recommend treatment.",
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
          Image and context.
          <br />
          <span className="italic">One</span> workspace.
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
