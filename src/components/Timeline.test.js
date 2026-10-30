import React from 'react';
import { render, screen, within } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import Timeline from './Timeline';

const items = [
  {
    dateStart: '2021-11',
    dateEnd: '2022-08',
    title: 'Full Stack Developer',
    organization: 'Zec Telecom',
    location: 'Spain',
    category: 'Work',
    description: 'Built internal web applications.',
    skills: ['PHP', 'MySQL'],
  },
  {
    dateStart: '2025-12',
    dateEnd: null,
    title: 'Full Stack Developer',
    organization: 'Oasis Fragrances',
    location: 'Remote',
    category: 'Work',
    description: 'Led development of an IMS.',
    skills: ['React'],
  },
];

describe('Timeline', () => {
  test('renders alternating rows with layout classes instead of inline layout', () => {
    render(<Timeline items={items} darkMode={false} />);

    const rows = screen.getAllByTestId('timeline-row');
    expect(rows).toHaveLength(items.length);
    expect(rows[0]).toHaveClass('timeline__row--left');
    expect(rows[1]).toHaveClass('timeline__row--right');
    expect(rows[0].getAttribute('style')).toBeNull();
    expect(within(rows[0]).getByTestId('timeline-card')).toBeInTheDocument();
    expect(within(rows[0]).getByTestId('timeline-dot')).toBeInTheDocument();
  });

  test('formats date ranges and open-ended entries', () => {
    render(<Timeline items={items} darkMode={false} />);

    expect(
      screen.getByText('Nov 2021 — Aug 2022 · Spain')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Dec 2025 — Present · Remote')
    ).toBeInTheDocument();
  });

  test('renders category labels and skills', () => {
    render(<Timeline items={items} darkMode />);

    expect(screen.getAllByText('Work')).toHaveLength(items.length);
    expect(screen.getByText('PHP')).toBeInTheDocument();
  });

  test('defines a single-column left-line layout below 768px', () => {
    const css = fs.readFileSync(
      path.join(process.cwd(), 'src', 'styles', 'Timeline.css'),
      'utf8'
    );

    expect(css).toMatch(/@media\s*\(max-width:\s*767\.98px\)/);
    expect(css).toMatch(/\.timeline__line\s*{[^}]*left:\s*6px/);
    expect(css).toMatch(/\.timeline__row--left[^{]*{[^}]*padding-left:\s*28px/);
    expect(css).toMatch(/\.timeline__card\s*{[^}]*max-width:\s*none/);
  });
});
