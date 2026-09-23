"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Word({
  children,
  delay,
  italic = false,
}: {
  children: React.ReactNode;
  delay: number;
  italic?: boolean;
}) {
  return (
    <span
      className={`enter inline-block ${italic ? "italic" : ""}`}
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
    <section id="top" className="relative overflow-hidden">
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/background.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center sm:py-32">
        <h1
          id="hero-heading"
          className="mb-6 text-4xl font-bold tracking-tighter leading-tight animate-fade-in-up sm:text-5xl md:text-6xl"
        >
          Healthcare
          <br />
          <span className="relative inline-block">
            <span
              className={cn(
                heroClassName ?? "",
                "font-normal text-5xl sm:text-6xl md:text-7xl",
              )}
            >
              Intelligence
            </span>

            {/* Underline */}
            <svg
              className="hero-underline absolute -bottom-2 left-0 w-full"
              viewBox="0 0 170 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 9C32.8203 5.34032 108.769 -0.881146 166 3.51047"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
            </svg>
          </span>{" "}
          With Clarity
        </h1>

        <div className="mx-auto mb-9 max-w-2xl animate-fade-in-up animate-fade-in-up-delay-1">
          <p className="text-base leading-snug text-muted-foreground sm:text-lg">
            One intelligent workspace for medical images, reports, and health
            data. ClarityCXR uses multimodal AI to understand the bigger picture
            — faster and more clearly.
          </p>
        </div>

        <div className="animate-fade-in-up animate-fade-in-up-delay-2">
          <Button
            size="lg"
            variant="default"
            className="rounded-lg px-8 py-6 text-base focus-outline"
            onClick={onTryForFree}
          >
            Try for Free
          </Button>
        </div>
      </div>
    </section>
  );
}
