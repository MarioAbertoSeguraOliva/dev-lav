import React from 'react';
import { badgeColors } from '../constants/theme';

const BASE_BACKGROUND = '#111827';
const TITLE_COLOR = '#ffffff';
const META_COLOR = '#cbd5e1';
const CAPTION_COLOR = '#94a3b8';

function truncate(value, maxLength) {
  if (!value) return '';
  return value.length > maxLength
    ? `${value.slice(0, maxLength - 1)}…`
    : value;
}

/**
 * Stand-in artwork for projects that have no real screenshot. It deliberately
 * looks like a labelled placeholder rather than a product UI so the card never
 * implies a screenshot that does not exist.
 */
function ProjectArtwork({ project }) {
  const accent = badgeColors[project.stack?.[0]] || '#1976d2';
  const stack = truncate((project.stack || []).join(' · '), 46);
  const title = truncate(project.title, 26);

  return (
    <svg
      viewBox="0 0 400 180"
      role="img"
      aria-label={`${project.title}: placeholder artwork, no screenshot available`}
      data-testid="project-artwork"
      style={{ display: 'block', width: '100%', height: '180px' }}
    >
      <rect width="400" height="180" fill={BASE_BACKGROUND} />
      <rect width="8" height="180" fill={accent} />
      <circle cx="352" cy="36" r="56" fill={accent} opacity="0.16" />
      <text
        x="32"
        y="76"
        fill={TITLE_COLOR}
        fontSize="22"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
      >
        {title}
      </text>
      <text
        x="32"
        y="104"
        fill={META_COLOR}
        fontSize="12"
        fontFamily="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
      >
        {stack}
      </text>
      <text
        x="32"
        y="148"
        fill={CAPTION_COLOR}
        fontSize="10"
        letterSpacing="1"
        fontFamily="system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
      >
        PLACEHOLDER — NO SCREENSHOT AVAILABLE
      </text>
    </svg>
  );
}

export default ProjectArtwork;
