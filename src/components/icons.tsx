import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export function PhoneIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M14.05 2a9 9 0 0 1 8 7.94M14.05 6A5 5 0 0 1 18 10m-3.63 4.37-1.6 1.6a15.06 15.06 0 0 1-4.74-4.74l1.6-1.6a1 1 0 0 0 .23-1.05l-1.2-3.2A1 1 0 0 0 7.72 4.7H4.5a1.5 1.5 0 0 0-1.5 1.66A17 17 0 0 0 17.64 21a1.5 1.5 0 0 0 1.66-1.5v-3.22a1 1 0 0 0-.66-.94l-3.2-1.2a1 1 0 0 0-1.07.23Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ size = 36, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ size = 24, direction = "right", ...props }: IconProps & { direction?: "left" | "right" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
      {...props}
    >
      <path d="M5 12h14m-7-7 7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* Map-app marks, drawn as simple badges at the size used in the design (80px). */

export function NaverMark({ size = 80, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden {...props}>
      <circle cx="40" cy="40" r="40" fill="#03C75A" />
      <path d="M45.6 41.3 34 24.5H24.5v31h9.9V38.7L46 55.5h9.5v-31h-9.9v16.8Z" fill="#fff" />
    </svg>
  );
}

export function KakaoMapMark({ size = 80, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden {...props}>
      <circle cx="40" cy="40" r="40" fill="#FFE300" />
      <path
        d="M40 18c-8.3 0-15 6.5-15 14.6 0 10.3 12.4 24.2 13.8 25.8a1.6 1.6 0 0 0 2.4 0C42.6 56.8 55 42.9 55 32.6 55 24.5 48.3 18 40 18Z"
        fill="#1E64F0"
      />
      <circle cx="40" cy="32.5" r="5.6" fill="#FFE300" />
    </svg>
  );
}

export function TmapMark({ size = 80, ...props }: IconProps) {
  const id = "tmap-grad";
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden {...props}>
      <defs>
        <linearGradient id={id} x1="8" y1="10" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF2A8A" />
          <stop offset="0.45" stopColor="#8A3CFF" />
          <stop offset="1" stopColor="#00C6FF" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="40" fill={`url(#${id})`} />
      <path d="M22 22h36a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H46v24a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V32H22a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" fill="#fff" />
    </svg>
  );
}
