import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../hooks/useTheme';

const sectionStyles = (theme) => ({
  homepage: {
    backgroundColor: theme.bg,
    color: theme.text,
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
  },
  profileImageContainer: {
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto 24px auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  greeting: {
    fontSize: '1rem',
    fontWeight: '500',
    color: theme.accent,
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  heading: {
    fontSize: '2.8rem',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '16px',
  },
  subheading: {
    fontSize: '1.2rem',
    fontWeight: '300',
    color: theme.muted,
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  ctaContainer: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    display: 'inline-block',
    backgroundColor: theme.accent,
    color: '#fff',
    padding: '12px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
  ctaSecondary: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: theme.text,
    padding: '12px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1rem',
    border: `2px solid ${theme.border}`,
    transition: 'border-color 0.3s',
  },
  stackSection: {
    marginTop: '48px',
  },
  stackLabel: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: theme.muted,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '16px',
  },
  stackGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  stackItem: {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: theme.card,
    border: `1px solid ${theme.border}`,
    fontSize: '0.9rem',
    fontWeight: '500',
  },
});

const techStack = [
  'React', 'Node.js', 'Express', 'MongoDB',
  'JavaScript', 'TypeScript', 'Python', 'Docker',
];

const Home = ({ darkMode }) => {
  const theme = useTheme(darkMode);
  const s = sectionStyles(theme);

  return (
    <div style={s.homepage}>
        <Container>
          <Row
            className="align-items-center justify-content-center"
            style={{ minHeight: 'calc(100vh - 80px)', textAlign: 'center' }}
          >
            <Col xs={12} md={8} lg={6}>
              <div style={s.profileImageContainer}>
                <img
                  src="/images/profile.png"
                  alt="Mario Segura"
                  style={s.profileImage}
                />
              </div>

              <p style={s.greeting}>Hello, I'm</p>
              <h1 style={s.heading}>Mario Segura</h1>
              <p style={s.subheading}>
                Software engineer focused on building full-stack, mobile, and
                AI-powered applications. I design and develop end-to-end systems
                across web, Android, and data-driven architectures.
              </p>

              <div style={s.ctaContainer}>
                <a href="/projects" style={s.ctaPrimary}>
                  View Projects
                </a>
                <a href="/about" style={s.ctaSecondary}>
                  About Me
                </a>
              </div>

              <div style={s.stackSection}>
                <p style={s.stackLabel}>Tech Stack</p>
                <div style={s.stackGrid}>
                  {techStack.map((tech) => (
                    <span key={tech} style={s.stackItem}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default Home;
