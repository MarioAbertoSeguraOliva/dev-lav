import React from 'react';

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
    <div style={{ position: 'relative', padding: '20px 0' }}>
      {/* Vertical line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          backgroundColor: lineColor,
          transform: 'translateX(-50%)',
        }}
      />

      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        const catColor = categoryColors[item.category] || '#757575';
        const label = categoryLabels[item.category] || '';

        const dateRange = item.dateEnd
          ? `${formatDate(item.dateStart)} — ${formatDate(item.dateEnd)}`
          : `${formatDate(item.dateStart)} — Present`;

        return (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: isLeft ? 'flex-end' : 'flex-start',
              paddingLeft: isLeft ? 0 : 'calc(50% + 20px)',
              paddingRight: isLeft ? 'calc(50% + 20px)' : 0,
              marginBottom: '40px',
              position: 'relative',
            }}
          >
            {/* Dot on timeline */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '20px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: catColor,
                border: `2px solid ${darkMode ? '#1e1e1e' : '#fff'}`,
                transform: 'translateX(-50%)',
                zIndex: 1,
              }}
            />

            {/* Card */}
            <div
              style={{
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                borderRadius: '12px',
                padding: '20px',
                width: '100%',
                maxWidth: '400px',
              }}
            >
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

              <p
                style={{
                  fontSize: '0.8rem',
                  color: mutedColor,
                  margin: '0 0 10px',
                }}
              >
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
