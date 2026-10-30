import React, { useEffect, useState } from 'react';
import { Github } from 'react-bootstrap-icons';
import { badgeColors, getReadableTextColor } from '../constants/theme';
import ProjectArtwork from './ProjectArtwork';

const FALLBACK_PROJECT_IMAGE = '/images/projects/defaultImage.png';

// "Active" is used by DentalFlow's v0.1.0 PoC but does not evidence completion.
// Keep the source data intact and present it with the most conservative truthful label.
const statusLabels = {
  active: 'In Development',
  completed: 'Completed',
  'in development': 'In Development',
  'in progress': 'In Development',
  planned: 'Planned',
};

const statusStyles = {
  Completed: {
    backgroundColor: '#d1e7dd',
    color: '#0a3622',
    border: '1px solid #a3cfbb',
  },
  'In Development': {
    backgroundColor: '#fff3cd',
    color: '#664d03',
    border: '1px solid #ffe69c',
  },
  Planned: {
    backgroundColor: '#e2e3e5',
    color: '#41464b',
    border: '1px solid #c4c8cb',
  },
};

const getBadgeColor = (label) => badgeColors[label] || '#ccc';

const getStatusLabel = (status) => {
  if (typeof status !== 'string' || !status.trim()) {
    return '';
  }

  const normalizedStatus = status.trim().toLowerCase();
  return statusLabels[normalizedStatus] || status.trim();
};

function ProjectCard({ project, darkMode }) {
  const [showMore, setShowMore] = useState(false);
  const initialImage = project.image || FALLBACK_PROJECT_IMAGE;
  const [imageSrc, setImageSrc] = useState(initialImage);
  const [imageFailed, setImageFailed] = useState(false);

  const cardBg = darkMode ? '#2b2b2b' : '#fff';
  const textColor = darkMode ? '#fff' : '#000';
  const mutedColor = darkMode ? '#ccc' : '#666';
  const dateColor = darkMode ? '#bbb' : '#595959';
  const borderColor = darkMode ? '#444' : '#ddd';
  const statusLabel = getStatusLabel(project.status);
  const statusStyle = statusStyles[statusLabel] || {
    backgroundColor: darkMode ? '#444' : '#e9ecef',
    color: darkMode ? '#fff' : '#333',
    border: `1px solid ${borderColor}`,
  };

  useEffect(() => {
    setImageSrc(initialImage);
    setImageFailed(false);
  }, [initialImage]);

  const handleImageError = () => {
    if (imageSrc !== FALLBACK_PROJECT_IMAGE) {
      setImageSrc(FALLBACK_PROJECT_IMAGE);
      return;
    }

    setImageFailed(true);
  };

  return (
    <div
      data-testid="project-card"
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
      {!project.image ? (
        <ProjectArtwork project={project} />
      ) : !imageFailed ? (
        <img
          src={imageSrc}
          alt={`${project.title} project preview`}
          loading="lazy"
          onError={handleImageError}
          data-testid="project-image"
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover',
            objectPosition: 'top',
          }}
        />
      ) : (
        <div
          role="img"
          aria-label={`${project.title} image unavailable`}
          data-testid="project-image-placeholder"
          style={{
            width: '100%',
            height: '180px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: darkMode ? '#333' : '#f0f0f0',
            color: mutedColor,
            fontSize: '0.9rem',
          }}
        >
          Image unavailable
        </div>
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

        {statusLabel && (
          <div style={{ marginBottom: '12px' }}>
            <span
              data-testid="project-status"
              style={{
                display: 'inline-block',
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                ...statusStyle,
              }}
            >
              {statusLabel}
            </span>
          </div>
        )}

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
          {project.stack.map((label) => {
            const badgeColor = getBadgeColor(label);

            return (
              <span
                key={label}
                style={{
                  display: 'inline-block',
                  backgroundColor: badgeColor,
                  color: getReadableTextColor(badgeColor),
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
            );
          })}
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

        {project.note && (
          <p
            data-testid="project-note"
            style={{
              margin: '0 0 16px',
              padding: '10px 12px',
              borderRadius: '8px',
              border: `1px dashed ${borderColor}`,
              color: mutedColor,
              fontSize: '0.85rem',
              lineHeight: '1.4',
            }}
          >
            {project.note}
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

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                textAlign: 'center',
                backgroundColor: darkMode ? '#555' : '#6c757d',
                color: '#fff',
                padding: '12px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              <Github size={16} />
              GitHub
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
