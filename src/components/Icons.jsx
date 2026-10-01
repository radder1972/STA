import React from 'react';

const IconBase = ({ children, size = 24, className = '', strokeWidth = 1.5, color="currentColor", useGradient = false, useGameGradient = false, useTafelGradient = false, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={useTafelGradient ? "url(#tafelGrad)" : (useGameGradient ? "url(#gameGrad)" : (useGradient ? "url(#blueGreenGrad)" : color))}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`custom-icon ${className}`}
    style={{ transition: 'all 0.3s ease', ...rest.style }}
    {...rest}
  >
    <defs>
      <linearGradient id="blueGreenGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6b7280" />
        <stop offset="100%" stopColor="#9ca3af" />
      </linearGradient>
      <linearGradient id="gameGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#2563eb" />
      </linearGradient>
      <linearGradient id="tafelGrad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#059669" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    {children}
  </svg>
);

// Theme Icons
export const SunIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </IconBase>
);

export const MoonIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" fillOpacity="0.2" />
  </IconBase>
);

// Navigation Icons
export const ArrowLeftIcon = (props) => (
  <IconBase {...props}>
    <path d="M19 12H5" />
    <polyline points="12 19 5 12 12 5" />
  </IconBase>
);

export const ArrowRightIcon = (props) => (
  <IconBase {...props}>
    <path d="M5 12h14" />
    <polyline points="12 5 19 12 12 19" />
  </IconBase>
);

export const CheckIcon = (props) => (
  <IconBase {...props}>
    <polyline points="20 6 9 17 4 12" />
  </IconBase>
);

// Action Icons
export const DownloadIcon = (props) => (
  <IconBase {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </IconBase>
);

export const RefreshIcon = (props) => (
  <IconBase {...props}>
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </IconBase>
);

// Display Icons
export const CardsIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="6" width="9" height="13" rx="1.5" transform="rotate(-15 7.5 12.5)" />
    <rect x="12" y="6" width="9" height="13" rx="1.5" transform="rotate(15 16.5 12.5)" />
    <rect x="7.5" y="4" width="9" height="13" rx="1.5" fill="var(--bg-color)" />
    <rect x="7.5" y="4" width="9" height="13" rx="1.5" fill={props.useGameGradient ? "#0ea5e9" : "currentColor"} fillOpacity={props.useGameGradient ? 0.2 : 0.2} />
  </IconBase>
);

export const ChartIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="currentColor" fillOpacity="0.1" />
    <line x1="8" y1="17" x2="8" y2="13" strokeWidth="2" />
    <line x1="12" y1="17" x2="12" y2="9" strokeWidth="2" />
    <line x1="16" y1="17" x2="16" y2="5" strokeWidth="2" />
  </IconBase>
);

export const ClipboardIcon = (props) => (
  <IconBase {...props}>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" fill="currentColor" fillOpacity="0.2" />
    <line x1="9" y1="14" x2="15" y2="14" />
    <line x1="9" y1="10" x2="15" y2="10" />
  </IconBase>
);

export const BrainIcon = (props) => (
  <IconBase {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" fill="currentColor" fillOpacity="0.15" />
    <line x1="12" y1="4.5" x2="12" y2="19.5" strokeDasharray="2 2" />
  </IconBase>
);

export const TrophyIcon = (props) => (
  <IconBase {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" fill="currentColor" fillOpacity="0.1" />
  </IconBase>
);

export const ShieldIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </IconBase>
);

export const InfoIcon = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="11" x2="12" y2="16" />
    <circle cx="12" cy="7.5" r="1" fill={props.useGameGradient ? "#0ea5e9" : "currentColor"} />
  </IconBase>
);

export const AlertTriangleIcon = (props) => (
  <IconBase {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </IconBase>
);

export const LightbulbIcon = (props) => (
  <IconBase {...props}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </IconBase>
);

export const HypothesisIcon = (props) => (
  <IconBase {...props}>
    <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4" />
    <path d="M9 1h6v4H9z" />
    <circle cx="12" cy="13" r="3" />
    <line x1="14.12" y1="15.12" x2="17" y2="18" />
  </IconBase>
);

export const ConnectionIcon = (props) => (
  <IconBase {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </IconBase>
);

export const MatrixIcon = (props) => (
  <IconBase {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
    <line x1="9" y1="3" x2="9" y2="21" />
    <line x1="15" y1="3" x2="15" y2="21" />
  </IconBase>
);

export const CpuChipIcon = (props) => (
  <IconBase {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="14" x2="23" y2="14" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="14" x2="4" y2="14" />
  </IconBase>
);

export const WandIcon = (props) => (
  <IconBase {...props}>
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="M17.8 11.8l1.4 1.4" />
    <path d="M15 9h0" />
    <path d="M17.8 6.2l1.4-1.4" />
    <path d="M3 21l9-9" />
    <path d="M12.2 6.2l-1.4-1.4" />
  </IconBase>
);

export const ArrowDownIcon = (props) => (
  <IconBase {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
  </IconBase>
);

export const PlayingCardsIcon = (props) => (
  <IconBase {...props}>
    <path d="M14.832 8.445a1 1 0 00-1.589-.098l-2.075 3.098a1 1 0 000 1.11l2 3a1 1 0 001.664 0l2-3a1 1 0 000-1.11z" />
    <path d="m7.18 20.827-5-11a2 2 0 01.993-2.647L7 5.44" />
    <rect x="7" y="2" width="14" height="20" rx="2" />
  </IconBase>
);

export const ScrollTextIcon = (props) => (
  <IconBase {...props}>
    <path d="M15 12h-5" />
    <path d="M15 8h-5" />
    <path d="M19 17V5a2 2 0 0 0-2-2H4" />
    <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
  </IconBase>
);

export const PrinterIcon = (props) => (
  <IconBase {...props}>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" stroke={props.useGameGradient ? "#0ea5e9" : undefined} />
    <rect x="6" y="14" width="12" height="8" rx="1" />
  </IconBase>
);

export const HomeIcon = (props) => (
  <IconBase {...props}>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </IconBase>
);

export const BookOpenIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 5v16" />
    <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
  </IconBase>
);

export const FileTextIcon = (props) => (
  <IconBase {...props}>
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" stroke={props.useGameGradient ? "#0ea5e9" : undefined} />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </IconBase>
);

export const DicesIcon = (props) => (
  <IconBase {...props}>
    <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
    <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
    <path d="M6 18h.01" stroke={props.useGameGradient ? "#0ea5e9" : "currentColor"} strokeWidth={props.useGameGradient ? 2.5 : 1.5} />
    <path d="M10 14h.01" stroke={props.useGameGradient ? "#0ea5e9" : "currentColor"} strokeWidth={props.useGameGradient ? 2.5 : 1.5} />
    <path d="M15 6h.01" stroke={props.useGameGradient ? "#0ea5e9" : "currentColor"} strokeWidth={props.useGameGradient ? 2.5 : 1.5} />
    <path d="M18 9h.01" stroke={props.useGameGradient ? "#0ea5e9" : "currentColor"} strokeWidth={props.useGameGradient ? 2.5 : 1.5} />
  </IconBase>
);

export const ShoppingCartIcon = (props) => (
  <IconBase {...props}>
    <circle cx="8" cy="21" r="1" fill={props.useGameGradient ? "#0ea5e9" : "currentColor"} stroke={props.useGameGradient ? "#0ea5e9" : undefined} />
    <circle cx="19" cy="21" r="1" fill={props.useGameGradient ? "#0ea5e9" : "currentColor"} stroke={props.useGameGradient ? "#0ea5e9" : undefined} />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </IconBase>
);

export const MailIcon = (props) => (
  <IconBase {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </IconBase>
);

export const StarIcon = (props) => (
  <IconBase {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </IconBase>
);
