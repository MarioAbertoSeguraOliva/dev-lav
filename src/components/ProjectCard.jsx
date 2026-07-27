import React, { useState } from 'react';
import { badgeColors } from '../constants/theme';

const getBadgeColor = (label) => badgeColors[label] || '#ccc';

function ProjectCard({ project, darkMode }) {
  const [showMore, setShowMore] = useState(false);

  const cardBg = darkMode ? '#2b2b2b' : '#fff';
  const textColor = darkMode ? '#fff' : '#000';
  const mutedColor = darkMode ? '#ccc' : '#666';
  const dateColor = darkMode ? '#bbb' : '#777';
  const borderColor = darkMode ? '#444' : '#ddd';

  return (
    <div
      style={{
        backgroundColor: cardBg,
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: darkMode
          ? '0 4px 12px rgba(0,0,0,.45)'
          : '0 4px 12px rgba(0,0,0,.12)',
        transition: 'transform .2s ease, box-shadow .2s ease',
        border: `1px solid ${borderColor}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      )}

      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            margin: '0 0 8px',
            fontSize: '1.8rem',
            color: textColor,
          }}
        >
          {project.title}
        </h2>

        <p
          style={{
            color: mutedColor,
            lineHeight: '1.5',
            marginBottom: '16px',
            minHeight: '48px',
          }}
        >
          {project.description}
        </p>

        <div style={{ marginBottom: '16px' }}>
          {project.stack.map((label) => (
            <span
              key={label}
              style={{
                display: 'inline-block',
                backgroundColor: getBadgeColor(label),
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                marginRight: '6px',
                marginBottom: '6px',
                fontWeight: '600',
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {project.date && (
          <p
            style={{
              fontSize: '0.85rem',
              marginBottom: '20px',
              color: dateColor,
            }}
          >
            <strong>Date:</strong> {project.date}
          </p>
        )}

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            gap: '10px',
          }}
        >
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                textAlign: 'center',
                background: '#1976d2',
                color: '#fff',
                padding: '12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              View Project
            </a>
          )}

          <button
            onClick={() => setShowMore(!showMore)}
            style={{
              flex: 1,
              backgroundColor: darkMode ? '#555' : '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            {showMore ? 'Hide Details' : 'More Info'}
          </button>
        </div>

        {showMore && (
          <div
            style={{
              marginTop: '20px',
              borderTop: `1px solid ${borderColor}`,
              paddingTop: '15px',
              lineHeight: '1.6',
              textAlign: 'left',
            }}
          >
            {project.additionalInfo}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
