import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectCard from './ProjectCard';

const baseProject = {
  title: 'Example Project',
  description: 'A project used by the tests.',
  image: '/images/projects/missing-screenshot.png',
  stack: ['React'],
  status: 'Planned',
  link: null,
  github: null,
  additionalInfo: 'Extra details.',
  date: null,
};

describe('ProjectCard', () => {
  test('falls back to the default image when the project image fails', () => {
    render(<ProjectCard project={baseProject} darkMode={false} />);

    const image = screen.getByTestId('project-image');
    expect(image).toHaveAttribute('src', baseProject.image);

    fireEvent.error(image);

    expect(screen.getByTestId('project-image')).toHaveAttribute(
      'src',
      '/images/projects/defaultImage.png'
    );
    expect(
      screen.queryByTestId('project-image-placeholder')
    ).not.toBeInTheDocument();
  });

  test('shows a placeholder if the fallback image also fails', () => {
    render(<ProjectCard project={baseProject} darkMode={false} />);

    fireEvent.error(screen.getByTestId('project-image'));
    fireEvent.error(screen.getByTestId('project-image'));

    expect(
      screen.getByTestId('project-image-placeholder')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('project-image')).not.toBeInTheDocument();
    expect(screen.getByText('Image unavailable')).toBeInTheDocument();
  });

  test('shows placeholder artwork when a project has no image', () => {
    render(
      <ProjectCard
        project={{ ...baseProject, image: undefined }}
        darkMode={false}
      />
    );

    expect(screen.queryByTestId('project-image')).not.toBeInTheDocument();
    expect(screen.getByTestId('project-artwork')).toBeInTheDocument();
  });

  test('renders an optional note and no GitHub link when github is absent', () => {
    render(
      <ProjectCard
        project={{
          ...baseProject,
          note: 'Source not public — details on request',
        }}
        darkMode={false}
      />
    );

    expect(screen.getByTestId('project-note')).toHaveTextContent(
      'Source not public — details on request'
    );
    expect(
      screen.queryByRole('link', { name: /github/i })
    ).not.toBeInTheDocument();
  });

  test('exposes expanded state for the project details disclosure', () => {
    render(<ProjectCard project={baseProject} darkMode={false} />);

    const button = screen.getByRole('button', { name: 'More Info' });
    const detailsId = button.getAttribute('aria-controls');
    const details = screen.getByText(baseProject.additionalInfo);

    expect(detailsId).toBeTruthy();
    expect(details).toHaveAttribute('id', detailsId);
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(details).toHaveAttribute('hidden');

    fireEvent.click(button);

    expect(
      screen.getByRole('button', { name: 'Hide Details' })
    ).toHaveAttribute('aria-expanded', 'true');
    expect(details).not.toHaveAttribute('hidden');
    expect(details).toHaveTextContent(baseProject.additionalInfo);

    fireEvent.click(button);

    expect(screen.getByRole('button', { name: 'More Info' })).toHaveAttribute(
      'aria-expanded',
      'false'
    );
    expect(details).toHaveAttribute('hidden');
  });

  test.each(['{enter}', '{space}'])(
    'activates the project details disclosure with keyboard input %s',
    (key) => {
      render(<ProjectCard project={baseProject} darkMode={false} />);

      const button = screen.getByRole('button', { name: 'More Info' });
      const details = screen.getByText(baseProject.additionalInfo);
      button.focus();

      userEvent.keyboard(key);

      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(details).not.toHaveAttribute('hidden');
    }
  );

  test('renders project disclosures with unique, correctly linked panel IDs', () => {
    const secondProject = {
      ...baseProject,
      title: 'Second Project',
      additionalInfo: 'Second project details.',
    };
    render(
      <>
        <ProjectCard project={baseProject} darkMode={false} />
        <ProjectCard project={secondProject} darkMode={false} />
      </>
    );

    const buttons = screen.getAllByRole('button', { name: 'More Info' });
    const firstDetails = screen.getByText(baseProject.additionalInfo);
    const secondDetails = screen.getByText(secondProject.additionalInfo);
    const controlledIds = buttons.map((button) =>
      button.getAttribute('aria-controls')
    );

    expect(controlledIds[0]).toBeTruthy();
    expect(controlledIds[1]).toBeTruthy();
    expect(new Set(controlledIds).size).toBe(buttons.length);
    expect(firstDetails).toHaveAttribute('id', controlledIds[0]);
    expect(secondDetails).toHaveAttribute('id', controlledIds[1]);
  });

  test.each([
    ['Active', 'In Development'],
    ['In Development', 'In Development'],
    ['Completed', 'Completed'],
    ['Planned', 'Planned'],
  ])('maps the "%s" status to "%s"', (sourceStatus, expectedLabel) => {
    render(
      <ProjectCard
        project={{ ...baseProject, status: sourceStatus }}
        darkMode={false}
      />
    );

    expect(screen.getByTestId('project-status')).toHaveTextContent(
      expectedLabel
    );
  });

  test('picks an accessible text color for each stack badge', () => {
    render(
      <ProjectCard
        project={{ ...baseProject, stack: ['React', 'Express'] }}
        darkMode={false}
      />
    );

    // React's cyan needs dark text; Express black needs light text.
    expect(screen.getByText('React')).toHaveStyle({ color: '#000000' });
    expect(screen.getByText('Express')).toHaveStyle({ color: '#ffffff' });
  });

  test('shows labelled placeholder artwork when a project has no screenshot', () => {
    render(
      <ProjectCard
        project={{ ...baseProject, image: null }}
        darkMode={false}
      />
    );

    expect(screen.queryByTestId('project-image')).not.toBeInTheDocument();
    expect(screen.getByTestId('project-artwork')).toHaveAttribute(
      'aria-label',
      'Example Project: placeholder artwork, no screenshot available'
    );
  });
});
