import React from 'react';
import { Container } from 'react-bootstrap';
import { useTheme } from '../hooks/useTheme';
import SocialLinks from '../components/SocialLinks';
import Timeline from '../components/Timeline';
import timelineData from '../data/timeline.json';

const sectionStyles = (theme) => ({
  page: {
    backgroundColor: theme.bg,
    color: theme.text,
    minHeight: '100vh',
    fontFamily: "'Roboto', sans-serif",
  },
  hero: {
    padding: '60px 20px 40px',
    textAlign: 'center',
  },
  profileImageContainer: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    overflow: 'hidden',
    margin: '0 auto 20px auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  name: {
    fontSize: '2.2rem',
    fontWeight: '700',
    margin: '0 0 8px',
  },
  tagline: {
    fontSize: '1.1rem',
    color: theme.muted,
    margin: '0 0 20px',
    fontWeight: '300',
  },
  section: {
    padding: '40px 20px',
  },
  sectionTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    marginBottom: '24px',
    textAlign: 'center',
    color: theme.text,
  },
  bio: {
    fontSize: '1rem',
    lineHeight: '1.8',
    color: theme.muted,
    maxWidth: '700px',
    margin: '0 auto 16px',
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  skillBadge: {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: theme.card,
    border: `1px solid ${theme.border}`,
    fontSize: '0.85rem',
    fontWeight: '500',
  },
  footerSection: {
    padding: '40px 20px',
    textAlign: 'center',
  },
});

const primarySkills = [
  'React', 'Node.js', 'JavaScript', 'Express', 'MongoDB',
  'PHP', 'Laravel', 'Java', 'Python', 'MySQL',
  'WordPress', 'WooCommerce', 'Android', 'HTML', 'CSS',
];

const About = ({ darkMode }) => {
  const theme = useTheme(darkMode);
  const s = sectionStyles(theme);

  return (
    <div style={s.page}>
      {/* Hero Section */}
      <div style={s.hero}>
        <div style={s.profileImageContainer}>
          <img
            src="/images/profile.png"
            alt="Mario Segura"
            style={s.profileImage}
          />
        </div>
        <h1 style={s.name}>Mario Segura</h1>
        <p style={s.tagline}>
          Software Engineer · Full-Stack Developer
        </p>
        <SocialLinks color={theme.accent} size={24} />
      </div>

      {/* About Me */}
      <div style={s.section}>
        <Container>
          <h2 style={s.sectionTitle}>About Me</h2>
          <p style={s.bio}>
            Software engineer who studied 5 years of Software Engineering at
            Universidad de Las Palmas de Gran Canaria. I build full-stack web
            applications, mobile apps, and inventory management systems. My recent
            work includes developing an IMS, e-commerce platforms, and admin
            dashboards integrating Odoo ERP and WhatsApp Web for enterprise clients.
          </p>
          <p style={s.bio}>
            I'm currently strengthening my skills in the modern JavaScript ecosystem
            (React, Node.js, MongoDB) and seeking a full-stack or software engineering
            role where I can apply my diverse technical background.
          </p>
        </Container>
      </div>

      {/* Skills */}
      <div style={{ ...s.section, backgroundColor: theme.card }}>
        <Container>
          <h2 style={s.sectionTitle}>Tech Stack</h2>
          <div style={s.skillsGrid}>
            {primarySkills.map((skill) => (
              <span key={skill} style={s.skillBadge}>
                {skill}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* Timeline */}
      <div style={s.section}>
        <Container>
          <h2 style={s.sectionTitle}>Career Timeline</h2>
          <Timeline items={timelineData} darkMode={darkMode} />
        </Container>
      </div>

      {/* Languages */}
      <div style={{ ...s.section, backgroundColor: theme.card }}>
        <Container className="text-center">
          <h2 style={s.sectionTitle}>Languages</h2>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
            <div>
              <p style={{ fontWeight: '600', margin: '0 0 4px' }}>Spanish</p>
              <p style={{ fontSize: '0.85rem', color: theme.muted, margin: 0 }}>Native</p>
            </div>
            <div>
              <p style={{ fontWeight: '600', margin: '0 0 4px' }}>English</p>
              <p style={{ fontSize: '0.85rem', color: theme.muted, margin: 0 }}>Advanced (B2/C1)</p>
            </div>
          </div>
        </Container>
      </div>

      {/* Contact / Follow */}
      <div style={s.footerSection}>
        <Container>
          <h2 style={s.sectionTitle}>Get In Touch</h2>
          <SocialLinks color={theme.accent} size={28} />
        </Container>
      </div>
    </div>
  );
};

export default About;
