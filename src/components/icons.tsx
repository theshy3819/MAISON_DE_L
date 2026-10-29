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

export function InstagramIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
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
