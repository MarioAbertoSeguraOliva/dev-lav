export const colors = {
  light: {
    bg: '#fff',
    text: '#000',
    muted: '#666',
    card: '#fff',
    border: '#ddd',
  },
  dark: {
    bg: '#0f0f0f',
    text: '#fff',
    muted: '#ccc',
    card: '#2b2b2b',
    border: '#444',
  },
  accent: '#1976d2',
  accentHover: '#1565c0',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const radii = {
  sm: '6px',
  md: '12px',
  lg: '20px',
  full: '999px',
};

export const shadows = {
  sm: '0 2px 4px rgba(0,0,0,0.1)',
  md: '0 4px 12px rgba(0,0,0,0.12)',
  mdDark: '0 4px 12px rgba(0,0,0,0.45)',
  lg: '0 4px 12px rgba(0,0,0,0.2)',
};

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/mario-alberto-segura-oliva-48438b105/',
  github: 'https://github.com/MarioAbertoSeguraOliva',
};

const normalizeHex = (hex) => {
  const value = hex.replace('#', '');
  return value.length === 3
    ? value
        .split('')
        .map((char) => char + char)
        .join('')
    : value;
};

const relativeLuminance = (hex) => {
  const value = normalizeHex(hex);
  const channels = [0, 2, 4]
    .map((offset) => parseInt(value.substr(offset, 2), 16) / 255)
    .map((channel) =>
      channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4)
    );

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

export const getContrastRatio = (foreground, background) => {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
};

// Black or white, whichever reads better on the given background. The worst
// case for this choice is a mid-grey, where the winning option still reaches
// roughly 4.58:1, so the result always meets WCAG AA for normal text.
export const getReadableTextColor = (background) =>
  getContrastRatio('#000000', background) >=
  getContrastRatio('#ffffff', background)
    ? '#000000'
    : '#ffffff';

export const badgeColors = {
  React: '#61DAFB',
  'Node.js': '#3C873A',
  Express: '#000000',
  MongoDB: '#4DB33D',
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  CSS: '#264DE4',
  HTML: '#E34F26',
  Docker: '#2496ED',
  Git: '#F05032',
  Vite: '#646CFF',
  SQLite: '#003B57',
  'Docker Compose': '#2496ED',
  'GitHub Actions': '#2088FF',
  Nginx: '#009639',
};
