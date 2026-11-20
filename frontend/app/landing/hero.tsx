"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Background from "@/public/background.png";
import Dashboard from "@/public/image.png";
import Link from "next/link";
/**
 * One orchestrated moment: the headline resolves word by word,
 * then the product preview rises into place. Nothing else animates on load.
 */
function Word({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={cn("hero-word inline-block", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </span>
  );
}
export default function Hero({
  heroClassName,
  onTryForFree,
}: {
  heroClassName?: string;
  onTryForFree?: () => void;
}) {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <style>{`
        @keyframes hero-word-in {
          from { opacity: 0; transform: translateY(0.4em); filter: blur(6px); }
          to   { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(32px) scale(0.985); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes hero-pop {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: none; }
        }
        .hero-word    { opacity: 0; animation: hero-word-in 700ms cubic-bezier(.2,.7,.2,1) forwards; }
        .hero-fade    { opacity: 0; animation: hero-word-in 700ms ease-out forwards; }
        .hero-preview { opacity: 0; animation: hero-rise 900ms cubic-bezier(.2,.7,.2,1) 900ms forwards; }
        .hero-callout { opacity: 0; animation: hero-pop 450ms ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .hero-word, .hero-fade, .hero-preview, .hero-callout {
            opacity: 1; animation: none; transform: none; filter: none;
          }
        }
      `}</style>
      {/* Background: optimised image + gradient so text always stays legible */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <Image
          src={Background}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
      </div>

      {/* Copy */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-14 pt-24 text-center sm:pb-20 sm:pt-32">
        <h1
          id="hero-heading"
          className="mb-6 text-3xl font-bold leading-snug tracking-tighter sm:text-4xl md:text-5xl"
        >
          <Word delay={0}>Healthcare</Word>
          <br />
          <Word
            delay={140}
            className={cn(
              heroClassName,
              "text-3xl font-normal sm:text-4xl md:text-5xl",
            )}
          >
            Intelligence
          </Word>{" "}
          <Word delay={280}>With</Word> <Word delay={360}>Clarity</Word>
        </h1>

        <p
          className="hero-fade mx-auto mb-9 max-w-xl text-xs leading-snug text-muted-foreground sm:text-xs text-balance"
          style={{ animationDelay: "520ms" }}
        >
          Upload chest X-rays, review study details, and submit requests to your
          configured prediction service—all in one workspace.
        </p>

        <div
          className="hero-fade flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "680ms" }}
        >
          <Button
            asChild
            size="default"
            className="focus-outline rounded-md px-6 py-4 text-sm leading-snug"
          >
            <Link href="/login" onClick={onTryForFree}>
              Try for free
            </Link>
          </Button>
          <Button
            asChild
            size="default"
            variant="outline"
            className="focus-outline rounded-md px-6 py-4 text-sm leading-snug"
          >
            <Link href="#how">See how it works</Link>
          </Button>
        </div>
      </div>

      {/* Product preview */}
      <div
        role="img"
        aria-label="Illustrative preview of the ClarityCXR workspace"
        className="relative z-10 px-4 pb-8 sm:px-8 sm:pb-16"
      >
        <div className="hero-preview relative mx-auto max-w-4xl">
          {/* soft glow behind the frame */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 -bottom-6 top-10 -z-10 rounded-[2rem] bg-primary/10 blur-3xl"
          />

          {/* window frame */}
          <div className="overflow-hidden rounded-xl border border-border bg-background shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
            <Image
              src={Dashboard}
              alt=""
              priority
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
