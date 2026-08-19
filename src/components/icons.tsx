import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconSearch = (p: P) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.2" /><path d="m20 20-3.4-3.4" /></svg>
);
export const IconHeart = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base} {...p}>
    <path
      d="M12 20s-7.2-4.4-9.2-8.2C1.2 9 2.4 6 5.4 5.4c1.8-.4 3.5.4 4.6 1.8 1.1-1.4 2.8-2.2 4.6-1.8 3 .6 4.2 3.6 2.6 6.4C19.2 15.6 12 20 12 20Z"
      fill={filled ? "currentColor" : "none"}
    />
  </svg>
);
export const IconBag = (p: P) => (
  <svg {...base} {...p}><path d="M6.5 8h11l.8 11.2a1 1 0 0 1-1 1.1H6.7a1 1 0 0 1-1-1.1L6.5 8Z" /><path d="M9 8V6.6A3 3 0 0 1 12 3.6 3 3 0 0 1 15 6.6V8" /></svg>
);
export const IconUser = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="3.1" /><path d="M5.2 19.2c.8-3.2 3.5-5 6.8-5s6 1.8 6.8 5" /></svg>
);
export const IconWhatsApp = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 3.53 17.2L2.1 21.9l4.82-1.26A9.82 9.82 0 1 0 19.05 4.91Z" />
    <path d="M8.7 9.2c.15-.4.3-.42.62-.44h.46c.18 0 .4 0 .58.42.22.52.76 1.86.82 2 .08.16.1.32 0 .5-.1.18-.16.3-.34.48l-.28.3c-.14.14-.28.3-.12.58.16.28.76 1.24 1.72 2.02 1.16.94 2.14 1.24 2.44 1.38.3.12.48.1.66-.08.18-.18.76-.88.96-1.18.2-.3.38-.24.64-.14.26.1 1.72.8 2.02.96.3.14.5.22.58.34.08.16.08.82-.2 1.52-.28.68-1.54 1.28-2.14 1.36-.58.08-1.32.16-4.32-1.14-3.62-1.56-5.96-5.48-6.14-5.74-.18-.26-1.54-2.06-1.54-3.94 0-1.86.98-2.78 1.32-3.16Z" />
  </svg>
);
export const IconMenu = (p: P) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const IconClose = (p: P) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconChevron = (p: P) => (
  <svg {...base} {...p}><path d="m8 5 7 7-7 7" /></svg>
);
export const IconStar = ({ filled, ...p }: P & { filled?: boolean }) => (
  <svg {...base} width={14} height={14} {...p}>
    <path d="m12 9.2-3.3.4L7 12.5 5.3 9.6 2 9.2l2.6-2.4-.7-3.3L7 2.2l3.1 1.3-.7 3.3L12 9.2Z" fill={filled ? "currentColor" : "none"} />
  </svg>
);
export const IconShare = (p: P) => (
  <svg {...base} {...p}><circle cx="18" cy="5.5" r="2.2" /><circle cx="6" cy="12" r="2.2" /><circle cx="18" cy="18.5" r="2.2" /><path d="m8 11 8-4.6M8 13.2 16 17" /></svg>
);
export const IconSpark = (p: P) => (
  <svg {...base} {...p}><path d="M12 3.5c.5 3.2 2.5 5.6 5.8 7-3.3 1.3-5.3 3.7-5.8 7-.5-3.3-2.5-5.7-5.8-7 3.3-1.4 5.3-3.8 5.8-7Z" fill="currentColor" stroke="none" /></svg>
);
export const IconLang = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8.2" /><path d="M4.5 12h15M12 3.8c2.2 2.4 3.3 5.2 3.3 8.2S14.2 18 12 20.2C9.8 18 8.7 15.2 8.7 12S9.8 6.2 12 3.8Z" /></svg>
);
export const IconPlay = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8.2" /><path d="m10 8.8 6 3.2-6 3.2V8.8Z" fill="currentColor" /></svg>
);
export const IconChat = (p: P) => (
  <svg {...base} {...p}><path d="M5 16.5V7.8A2.2 2.2 0 0 1 7.2 5.6h9.6A2.2 2.2 0 0 1 19 7.8v6.2a2.2 2.2 0 0 1-2.2 2.2H9l-4 3.2Z" /></svg>
);
export const IconFilter = (p: P) => (
  <svg {...base} {...p}><path d="M4 6h16M7 12h10M10 18h4" /></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base} {...p}><path d="m5 12 5 5 9-10" /></svg>
);
export const IconMinus = (p: P) => (
  <svg {...base} {...p}><path d="M6 12h12" /></svg>
);
export const IconPlus = (p: P) => (
  <svg {...base} {...p}><path d="M12 6v12M6 12h12" /></svg>
);
export const IconTruck = (p: P) => (
  <svg {...base} {...p}><path d="M3 16V7.5h11V16" /><path d="M14 10h4.2L21 13.2V16h-7" /><circle cx="7" cy="16.5" r="1.6" /><circle cx="17.2" cy="16.5" r="1.6" /></svg>
);
export const IconShield = (p: P) => (
  <svg {...base} {...p}><path d="M12 3.6 19 6v6.2c0 4.2-2.8 7.2-7 8.6-4.2-1.4-7-4.4-7-8.6V6l7-2.4Z" /></svg>
);
export const IconReturn = (p: P) => (
  <svg {...base} {...p}><path d="M4 12a8 8 0 1 0 2.2-5.5" /><path d="M4 5.2v4h4" /></svg>
);
export const IconInstagram = (p: P) => (
  <svg {...base} {...p}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.4" /><circle cx="17.2" cy="6.8" r=".8" fill="currentColor" /></svg>
);
export const IconFacebook = (p: P) => (
  <svg {...base} {...p}><path d="M14 8.5h2.2V5.6H14c-2.4 0-4 1.6-4 4.1v1.6H7.6v2.9H10V20h3.1v-5.8h2.5l.5-2.9h-3V9.8c0-.8.4-1.3 1-1.3Z" /></svg>
);
