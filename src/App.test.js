import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import App from './App';
import projects from './data/projects.json';

const renderAt = (route) => {
  window.history.pushState({}, '', route);
  return render(<App />);
};

beforeEach(() => {
  localStorage.clear();
  window.history.pushState({}, '', '/');
});

describe('Home page', () => {
  test('renders the home route', () => {
    renderAt('/');

    expect(
      screen.getByRole('heading', { level: 1, name: 'Mario Segura' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View Projects' })
    ).toHaveAttribute('href', '/projects');
    expect(
      screen.getAllByRole('link', { name: 'About Me' }).length
    ).toBeGreaterThan(0);
  });

  test('navigates to Projects with a client-side link', () => {
    renderAt('/');

    fireEvent.click(screen.getByRole('link', { name: 'View Projects' }));

    expect(
      screen.getByRole('heading', { level: 1, name: 'My Projects' })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe('/projects');
  });

  test('navigates to About with the Home CTA', () => {
    renderAt('/');

    // The header also has an "About Me" link; the Home CTA is rendered last.
    const aboutLinks = screen.getAllByRole('link', { name: 'About Me' });
    fireEvent.click(aboutLinks[aboutLinks.length - 1]);

    expect(
      screen.getByRole('heading', { level: 2, name: 'About Me' })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe('/about');
  });
});

describe('Direct route rendering', () => {
  test.each([
    ['/projects', 'My Projects'],
    ['/about', 'About Me'],
    ['/contact', 'Get In Touch'],
  ])('renders %s without a prior client-side navigation', (route, heading) => {
    renderAt(route);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    expect(window.location.pathname).toBe(route);
  });

  test('renders the React 404 page for an unknown route', () => {
    renderAt('/does-not-exist');

    expect(
      screen.getByRole('heading', { level: 1, name: '404' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the page you're looking for doesn't exist/i)
    ).toBeInTheDocument();
  });
});

describe('Projects data and cards', () => {
  test('every project image points at an existing public asset', () => {
    projects.forEach((project) => {
      expect(project.image).toMatch(/^\/images\/projects\/[^/]+$/);

      const assetPath = path.join(
        process.cwd(),
        'public',
        project.image.replace(/^\//, '')
      );

      expect(fs.existsSync(assetPath)).toBe(true);
    });
  });

  test('renders every project card with a non-empty image path', () => {
    renderAt('/projects');

    projects.forEach((project) => {
      expect(
        screen.getByRole('heading', { level: 2, name: project.title })
      ).toBeInTheDocument();
    });

    const images = screen.getAllByTestId('project-image');
    expect(images).toHaveLength(projects.length);

    images.forEach((image) => {
      const src = image.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).toMatch(/^\/images\/projects\/[^/]+$/);
    });
  });

  test('shows a truthful status for every project', () => {
    renderAt('/projects');

    const statuses = screen
      .getAllByTestId('project-status')
      .map((status) => status.textContent);

    expect(statuses).toEqual([
      'Planned',
      'Planned',
      'Planned',
      'In Development',
    ]);
    expect(screen.queryByText('Active')).not.toBeInTheDocument();
    expect(screen.queryByText('Completed')).not.toBeInTheDocument();
  });

  test('keeps the DentalFlow project and its GitHub link', () => {
    renderAt('/projects');

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'DentalFlow',
    });
    const card = heading.closest('[data-testid="project-card"]');

    expect(card).not.toBeNull();
    expect(within(card).getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com/MarioAbertoSeguraOliva/dentalflow'
    );
  });
});
