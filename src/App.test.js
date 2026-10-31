import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import App, { getRouteMetadata } from './App';
import projects from './data/projects.json';

const renderAt = (route) => {
  window.history.pushState({}, '', route);
  return render(<App />);
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  window.history.pushState({}, '', '/');
});

describe('Home page', () => {
  test('renders the home route', () => {
    renderAt('/');

    expect(document.title).toBe('Home — Mario Segura | Software Engineer');
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

  test('marks the home brand as the current page without changing its class', () => {
    renderAt('/');

    expect(screen.getByRole('link', { name: 'Mario Segura' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: 'Mario Segura' })).toHaveClass(
      'navbar-brand'
    );
  });

  test('navigates to Projects with a client-side link', () => {
    renderAt('/');

    fireEvent.click(screen.getByRole('link', { name: 'View Projects' }));

    expect(document.title).toBe('Projects — Mario Segura');
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
    expect(document.title).toBe('About — Mario Segura');
  });

  test('updates the title for a valid route with a trailing slash', () => {
    renderAt('/projects/');

    expect(
      screen.getByRole('heading', { level: 1, name: 'My Projects' })
    ).toBeInTheDocument();
    expect(document.title).toBe('Projects — Mario Segura');
  });
});

describe('Direct route rendering', () => {
  test.each([
    ['/projects', 'My Projects', 'Projects — Mario Segura'],
    ['/about', 'About Me', 'About — Mario Segura'],
    ['/contact', 'Get In Touch', 'Contact — Mario Segura'],
  ])('renders %s without a prior client-side navigation', (route, heading, title) => {
    renderAt(route);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    expect(window.location.pathname).toBe(route);
    expect(document.title).toBe(title);
  });

  test('renders the React 404 page for an unknown route', () => {
    renderAt('/does-not-exist');

    expect(
      screen.getByRole('heading', { level: 1, name: '404' })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the page you're looking for doesn't exist/i)
    ).toBeInTheDocument();
    expect(document.title).toBe('Page Not Found | Mario Segura');
    expect(getRouteMetadata('/does-not-exist')).toEqual({
      title: 'Page Not Found | Mario Segura',
      noindex: true,
    });
  });

  test('updates route metadata during client-side navigation from an unknown route', () => {
    renderAt('/does-not-exist');

    expect(document.title).toBe('Page Not Found | Mario Segura');
    fireEvent.click(screen.getByRole('link', { name: 'Mario Segura' }));

    expect(document.title).toBe('Home — Mario Segura | Software Engineer');
    expect(getRouteMetadata(window.location.pathname).noindex).toBeUndefined();
    expect(screen.getByRole('link', { name: 'Mario Segura' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  test('normalizes valid route paths when resolving metadata', () => {
    expect(getRouteMetadata('/PROJECTS/')).toEqual({
      title: 'Projects — Mario Segura',
    });
  });

  test('updates the title when navigating between valid routes', () => {
    renderAt('/projects');

    fireEvent.click(screen.getByRole('link', { name: 'About Me' }));
    expect(document.title).toBe('About — Mario Segura');

    fireEvent.click(screen.getByRole('link', { name: 'Contact' }));
    expect(document.title).toBe('Contact — Mario Segura');
  });
});

describe('Projects data and cards', () => {
  test('every declared project image points at an existing public asset', () => {
    projects.forEach((project) => {
      if (project.image === null) {
        return;
      }

      expect(project.image).toMatch(/^\/images\/projects\/[^/]+$/);

      const assetPath = path.join(
        process.cwd(),
        'public',
        project.image.replace(/^\//, '')
      );

      expect(fs.existsSync(assetPath)).toBe(true);
    });
  });

  test('renders every project card with artwork or a real image', () => {
    renderAt('/projects');

    projects.forEach((project) => {
      expect(
        screen.getByRole('heading', { level: 2, name: project.title })
      ).toBeInTheDocument();
    });

    const images = screen.queryAllByTestId('project-image');
    const artwork = screen.getAllByTestId('project-artwork');

    // Every card shows exactly one visual: a real screenshot or placeholder art.
    expect(images.length + artwork.length).toBe(projects.length);

    images.forEach((image) => {
      const src = image.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).toMatch(/^\/images\/projects\/[^/]+$/);
    });

    artwork.forEach((placeholder) => {
      expect(placeholder).toHaveAttribute('role', 'img');
      expect(placeholder.getAttribute('aria-label')).toMatch(
        /no screenshot available/i
      );
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

  test('shows DentalFlow without the broken public GitHub link', () => {
    renderAt('/projects');

    const cards = screen.getAllByTestId('project-card');
    const card = cards.find((candidate) =>
      within(candidate).queryByRole('heading', {
        level: 2,
        name: 'DentalFlow',
      })
    );

    expect(card).toBeDefined();
    expect(within(card).queryByRole('link', { name: /github/i })).toBeNull();
    expect(within(card).getByTestId('project-note')).toHaveTextContent(
      'Source not public — details on request'
    );
    expect(screen.getAllByTestId('project-note')).toHaveLength(1);
  });
});

describe('Theme initialization', () => {
  test('applies a stored dark preference to the document', () => {
    localStorage.setItem('darkMode', 'true');

    renderAt('/');

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('falls back to light when the stored value is invalid', () => {
    localStorage.setItem('darkMode', '{not-json');

    expect(() => renderAt('/')).not.toThrow();
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(
      screen.getByRole('heading', { level: 1, name: 'Mario Segura' })
    ).toBeInTheDocument();
  });

  test('persists theme toggles and updates the document theme', () => {
    renderAt('/');

    fireEvent.click(
      screen.getByRole('button', { name: 'Switch to dark mode' })
    );

    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('index.html initializes the theme without touching document.body', () => {
    const html = fs.readFileSync(
      path.join(process.cwd(), 'public', 'index.html'),
      'utf8'
    );

    expect(html).not.toMatch(/document\.body/);
    expect(html).toMatch(/documentElement\.setAttribute\(\s*'data-theme'/);
    expect(html).toMatch(/html\[data-theme='dark'\]/);
  });
});

describe('Layout landmarks', () => {
  test('exposes navigation, main and footer landmarks', () => {
    renderAt('/');

    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('offers a skip link that targets the main landmark', () => {
    renderAt('/');

    const skipLink = screen.getByRole('link', {
      name: 'Skip to main content',
    });
    const main = screen.getByRole('main');

    expect(main).toHaveAttribute('id', 'main-content');
    expect(skipLink).toHaveAttribute('href', `#${main.id}`);
  });

  test('moves focus to the main landmark when the skip link is activated', () => {
    renderAt('/');

    const skipLink = screen.getByRole('link', {
      name: 'Skip to main content',
    });
    const main = screen.getByRole('main');

    skipLink.focus();
    fireEvent.click(skipLink);

    expect(main).toHaveAttribute('tabindex', '-1');
    expect(main).toHaveFocus();
  });

  test('exposes the mobile navigation expanded state and controlled panel', () => {
    renderAt('/');

    const toggle = screen.getByRole('button', { name: 'Toggle navigation' });
    const navigation = screen.getByRole('navigation', { name: 'Main' });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'basic-navbar-nav');
    expect(within(navigation).getByRole('link', { name: 'Projects' }))
      .toHaveAttribute('href', '/projects');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('marks only the active navigation destination as current', () => {
    renderAt('/projects');

    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: 'About Me' })).not.toHaveAttribute(
      'aria-current'
    );
    expect(screen.getByRole('link', { name: 'Contact' })).not.toHaveAttribute(
      'aria-current'
    );
  });
});
