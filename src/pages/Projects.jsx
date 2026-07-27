import React from 'react';
import projects from '../data/projects.json';
import ProjectCard from '../components/ProjectCard';
import { useTheme } from '../hooks/useTheme';

function Projects({ darkMode }) {
  const theme = useTheme(darkMode);

  return (
    <div
        style={{
          color: theme.text,
          backgroundColor: theme.bg,
          padding: '30px',
          maxWidth: '1400px',
          margin: '0 auto',
          minHeight: '100vh',
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            fontWeight: '700',
          }}
        >
          My Projects
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              darkMode={darkMode}
            />
          ))}
        </div>
    </div>
  );
}

export default Projects;
