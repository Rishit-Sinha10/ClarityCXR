import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Reveal from "./reval";
import ProductDemo from "@/public/image.png";
import Image from "next/image";
export default function Showcase() {
  return (
    <section id="product" className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:text-[11px]">
            Product workspace
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-[15ch] font-display text-3xl leading-[1.05] tracking-[-0.035em] text-ink sm:text-4xl lg:text-5xl">
              Image and context, side by side.
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Review an uploaded chest X-ray, keep study details nearby, and
              send a prediction request through your connected service.
            </p>
          </div>
        </Reveal>

        <Reveal delay={160} variant="left">
          <div
            id="demo"
            role="img"
            aria-label="Illustrative ClarityCXR workspace with a synthetic chest X-ray, study details, and a text prompt"
            className="mt-10 overflow-hidden rounded-2xl border border-hairline bg-paper shadow-[0_36px_90px_-50px_rgba(10,10,10,0.42)]"
          >
            <div className="relative">
              <Image
                src={ProductDemo}
                alt=""
                className="h-auto w-full"
                sizes="(min-width: 1280px) 1216px, 100vw"
                placeholder="blur"
                quality={76}
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[11px] leading-relaxed text-muted">
            Illustrative interface with synthetic imagery. Do not upload
            identifiable patient information to the public demo.
          </p>
          <Button asChild variant="outline" className="w-fit rounded-full">
            <Link href="/demo">
              Walk through the workspace
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
