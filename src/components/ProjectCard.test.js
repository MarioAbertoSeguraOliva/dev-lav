import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  test('uses the default image when a project has no image', () => {
    render(
      <ProjectCard
        project={{ ...baseProject, image: undefined }}
        darkMode={false}
      />
    );

    expect(screen.getByTestId('project-image')).toHaveAttribute(
      'src',
      '/images/projects/defaultImage.png'
    );
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
});
