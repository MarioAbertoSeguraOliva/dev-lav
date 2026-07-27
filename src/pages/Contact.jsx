import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTheme } from '../hooks/useTheme';
import SocialLinks from '../components/SocialLinks';

const sectionStyles = (theme) => ({
  page: {
    backgroundColor: theme.bg,
    color: theme.text,
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
  },
  heading: {
    fontSize: '2.2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '12px',
  },
  subheading: {
    fontSize: '1.1rem',
    color: theme.muted,
    textAlign: 'center',
    marginBottom: '40px',
  },
  card: {
    backgroundColor: theme.card,
    borderRadius: '12px',
    padding: '32px',
    border: `1px solid ${theme.border}`,
    maxWidth: '500px',
    margin: '0 auto',
  },
  label: {
    fontSize: '0.85rem',
    fontWeight: '500',
    color: theme.muted,
    marginBottom: '6px',
  },
  link: {
    display: 'block',
    color: theme.accent,
    textDecoration: 'none',
    fontSize: '1.05rem',
    marginBottom: '8px',
    transition: 'color 0.3s',
  },
  divider: {
    border: 'none',
    borderTop: `1px solid ${theme.border}`,
    margin: '24px 0',
  },
  socialSection: {
    textAlign: 'center',
    marginTop: '24px',
  },
});

const Contact = ({ darkMode }) => {
  const theme = useTheme(darkMode);
  const s = sectionStyles(theme);

  return (
    <div style={s.page}>
        <Container>
          <Row className="justify-content-center" style={{ paddingTop: '60px' }}>
            <Col xs={12} md={8} lg={6}>
              <h1 style={s.heading}>Get In Touch</h1>
              <p style={s.subheading}>
                I'm always open to new opportunities and collaborations.
              </p>

              <div style={s.card}>
                <p style={s.label}>Email</p>
                <a
                  href="mailto:marioaso.dev@gmail.com"
                  style={s.link}
                >
                  marioaso.dev@gmail.com
                </a>

                <hr style={s.divider} />

                <p style={s.label}>Location</p>
                <p style={{ marginBottom: '8px' }}>Available for remote work</p>

                <hr style={s.divider} />

                <p style={s.label}>Social</p>
                <div style={s.socialSection}>
                  <SocialLinks color={theme.accent} size={28} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default Contact;
