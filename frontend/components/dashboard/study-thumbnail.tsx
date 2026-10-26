import { cn } from "@/lib/utils";
import type { StudyVariant } from "@/lib/demo-data";

const variantTransform: Record<StudyVariant, string> = {
  1: "scale(1)",
  2: "scale(1.03) rotate(-0.6deg)",
  3: "scale(0.98) rotate(0.8deg)",
  4: "scale(1.04) rotate(0.4deg)",
  5: "scale(0.99) rotate(-0.8deg)",
  6: "scale(1.02) rotate(-0.2deg)",
};

const opacityBands: Record<StudyVariant, number> = {
  1: 0.38,
  2: 0.3,
  3: 0.44,
  4: 0.34,
  5: 0.4,
  6: 0.36,
};

export function StudyThumbnail({
  variant = 1,
  className,
  label = "Illustrative synthetic chest X-ray",
}: {
  variant?: StudyVariant;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-[#060a11] ring-1 ring-black/20",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <svg
        viewBox="0 0 200 240"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        style={{ transform: variantTransform[variant] }}
        aria-hidden
      >
        <rect width="200" height="240" fill="#060a11" />
        <ellipse cx="100" cy="126" rx="62" ry="98" fill="#95a3b0" opacity="0.18" />
        <ellipse cx="100" cy="124" rx="51" ry="88" fill="#aeb9c2" opacity="0.12" />
        <path
          d="M78,38 C57,46 51,78 55,112 C57,138 64,170 76,184 C86,196 97,188 99,168 C102,134 101,94 96,60 C94,46 88,38 78,38 Z"
          fill="#0a1420"
          opacity="0.96"
        />
        <path
          d="M122,38 C143,46 149,78 145,112 C143,138 136,170 124,184 C114,196 103,188 101,168 C98,134 99,94 104,60 C106,46 112,38 122,38 Z"
          fill="#0a1420"
          opacity="0.96"
        />
        <ellipse
          cx="128"
          cy="116"
          rx="14"
          ry="12"
          fill="#d4dce2"
          opacity={opacityBands[variant]}
        />
        <path
          d="M96,60 C92,54 86,52 82,56 C78,60 78,68 82,74 C86,81 94,86 101,84 C105,82 107,74 96,60 Z"
          fill="#a8b6c0"
          opacity="0.72"
        />
        <path
          d="M101,42 C113,42 119,50 115,56 C111,62 100,60 98,50 Z"
          fill="#a8b6c0"
          opacity="0.5"
        />
        <rect
          x="97"
          y="36"
          width="6"
          height="178"
          rx="3"
          fill="#c4cfd7"
          opacity="0.64"
        />
        <path
          d="M80,32 L55,46"
          stroke="#c2cdd6"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.62"
          fill="none"
        />
        <path
          d="M120,32 L145,46"
          stroke="#c2cdd6"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.62"
          fill="none"
        />
        <g stroke="#93a3b0" strokeWidth="1.2" opacity="0.26" fill="none">
          <path d="M96,42 C82,46 70,50 60,56" />
          <path d="M96,56 C82,62 68,66 56,72" />
          <path d="M96,72 C82,80 66,86 54,94" />
          <path d="M96,90 C84,100 68,110 56,120" />
          <path d="M96,110 C86,122 72,134 62,146" />
          <path d="M104,42 C118,46 130,50 140,56" />
          <path d="M104,56 C118,62 132,66 144,72" />
          <path d="M104,72 C118,80 134,86 146,94" />
          <path d="M104,90 C116,100 132,110 144,120" />
          <path d="M104,110 C114,122 128,134 138,146" />
        </g>
      </svg>
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_35%,rgba(0,0,0,0.28))]"
        aria-hidden
      />
    </div>
  );
}
