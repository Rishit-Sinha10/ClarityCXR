import Reveal from "./reval";
const steps = [
  {
    n: "01",
    title: "Upload an image",
    desc: "Add a chest X-ray in PNG, JPG, or WebP format. The connected API stores the file and returns its study record.",
  },
  {
    n: "02",
    title: "Review the study",
    desc: "Find the uploaded image by its filename, status, and upload time. Keep a text prompt with the selected study in your workspace.",
  },
  {
    n: "03",
    title: "Send a request",
    desc: "Submit the selected study to your configured prediction service. ClarityCXR shows the status and any output that service returns.",
  },
];
export default function HowItWorks() {
  return (
    <section id="how" className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            How it works
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
            From image
            <br />
            to analysis request.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="group relative border-t-2 border-hairline pt-6 transition-colors duration-500 hover:border-accent">
                <span className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-hairline transition-colors duration-500 group-hover:bg-accent" />
                <p className="font-display text-5xl tracking-tight text-hairline transition-colors duration-500 group-hover:text-accent">
                  {s.n}
                </p>
                <h3 className="mt-4 font-display text-2xl tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
