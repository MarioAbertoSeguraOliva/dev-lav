import React from 'react';
import '../styles/Timeline.css';

const categoryColors = {
  Education: '#1976d2',
  Work: '#2e7d32',
  Project: '#7b1fa2',
  Other: '#757575',
};

const categoryLabels = {
  Education: 'Education',
  Work: 'Work',
  Project: 'Project',
  Other: '',
};

function Timeline({ items, darkMode }) {
  const textColor = darkMode ? '#fff' : '#000';
  const mutedColor = darkMode ? '#aaa' : '#666';
  const cardBg = darkMode ? '#1e1e1e' : '#f8f9fa';
  const borderColor = darkMode ? '#333' : '#e0e0e0';
  const lineColor = darkMode ? '#444' : '#ccc';

  return (
    <div
      className="timeline"
      style={{
        '--timeline-line-color': lineColor,
        '--timeline-card-bg': cardBg,
        '--timeline-card-border': borderColor,
        '--timeline-dot-ring': darkMode ? '#1e1e1e' : '#fff',
      }}
    >
      {/* Vertical line */}
      <div className="timeline__line" aria-hidden="true" />

      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        const catColor = categoryColors[item.category] || '#757575';
        const label = categoryLabels[item.category] || '';

        const dateRange = item.dateEnd
          ? `${formatDate(item.dateStart)} — ${formatDate(item.dateEnd)}`
          : `${formatDate(item.dateStart)} — Present`;

        return (
          <div
            key={`${item.title}-${item.dateStart}-${index}`}
            className={`timeline__row ${
              isLeft ? 'timeline__row--left' : 'timeline__row--right'
            }`}
            data-testid="timeline-row"
          >
            {/* Dot on timeline */}
            <div
              className="timeline__dot"
              style={{ backgroundColor: catColor }}
              aria-hidden="true"
              data-testid="timeline-dot"
            />

            {/* Card */}
            <div className="timeline__card" data-testid="timeline-card">
              {label && (
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: catColor,
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {label}
                </span>
              )}

              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  margin: '0 0 4px',
                  color: textColor,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: catColor,
                  fontWeight: '500',
                  margin: '0 0 4px',
                }}
              >
                {item.organization}
              </p>

              <p className="timeline__date" style={{ color: mutedColor }}>
                {dateRange}
                {item.location && ` · ${item.location}`}
              </p>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: mutedColor,
                  lineHeight: '1.5',
                  margin: '0 0 12px',
                }}
              >
                {item.description}
              </p>

              {item.skills && item.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: darkMode ? '#333' : '#e8e8e8',
                        color: darkMode ? '#ccc' : '#444',
                        fontWeight: '500',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

export default Timeline;
