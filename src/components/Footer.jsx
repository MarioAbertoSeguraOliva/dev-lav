import React from 'react';
import { Container } from 'react-bootstrap';
import SocialLinks from './SocialLinks';

function Footer({ darkMode }) {
  const bgColor = darkMode ? '#1a1a1a' : '#0f0f0f';

  return (
    <div style={{ backgroundColor: bgColor, padding: '20px 0', marginTop: 'auto' }}>
      <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <SocialLinks color="#fff" size={24} />
      </Container>
    </div>
  );
}

export default Footer;
