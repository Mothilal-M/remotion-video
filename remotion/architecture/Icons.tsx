import React from 'react';

type IconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const base = ({size = 56, color = 'currentColor', strokeWidth = 1.6}: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const BrainIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M12 5a3 3 0 1 0-5.997.142A4 4 0 0 0 4 9a4 4 0 0 0 1.5 3.118A3 3 0 0 0 6 18a3.5 3.5 0 0 0 6 1.5" />
    <path d="M12 5a3 3 0 1 1 5.997.142A4 4 0 0 1 20 9a4 4 0 0 1-1.5 3.118A3 3 0 0 1 18 18a3.5 3.5 0 0 1-6 1.5" />
    <path d="M12 5v14.5" />
    <path d="M9 9h.01" />
    <path d="M15 9h.01" />
  </svg>
);

export const HandIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M11 13V6.5a1.5 1.5 0 0 1 3 0V13" />
    <path d="M14 8.5V5a1.5 1.5 0 1 1 3 0v8" />
    <path d="M17 9.5V7a1.5 1.5 0 1 1 3 0v8a6 6 0 0 1-6 6h-2c-1.66 0-3-1.34-3-3" />
    <path d="M11 13.5V8.5a1.5 1.5 0 1 0-3 0v6.5" />
    <path d="M8 14v-3a1.5 1.5 0 1 0-3 0v6c0 .8.4 1.4 1 2" />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const DatabaseIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
  </svg>
);

export const FilesIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

export const CodeIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const UsersIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const CardIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

export const GlobeIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2" />
    <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" fill="currentColor" />
  </svg>
);

export const FlaskIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M9 2h6" />
    <path d="M10 2v7L4.5 18.5A2 2 0 0 0 6.27 21.5h11.46a2 2 0 0 0 1.77-2.99L14 9V2" />
    <path d="M7 14h10" />
  </svg>
);

export const TrendingUpIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const MessageIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const RobotIcon: React.FC<IconProps> = (p) => (
  <svg {...base(p)}>
    <rect x="4" y="7" width="16" height="13" rx="2" />
    <path d="M9 12h.01M15 12h.01" />
    <path d="M12 3v4" />
    <circle cx="12" cy="3" r="1" />
    <path d="M9 17h6" />
    <path d="M2 13v3M22 13v3" />
  </svg>
);
