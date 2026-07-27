import React from 'react';
import { Linkedin, Github } from 'react-bootstrap-icons';
import { socialLinks } from '../constants/theme';

function SocialLinks({ color = '#fff', size = 24 }) {
  return (
    <div style={{ display: 'flex', gap: '15px' }}>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        style={{ color, transition: 'color 0.3s' }}
      >
        <Linkedin size={size} />
      </a>
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        style={{ color, transition: 'color 0.3s' }}
      >
        <Github size={size} />
      </a>
    </div>
  );
}

export default SocialLinks;
