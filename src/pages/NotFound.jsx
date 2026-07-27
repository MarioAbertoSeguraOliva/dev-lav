import React from 'react';
import { Container } from 'react-bootstrap';
import { useTheme } from '../hooks/useTheme';

const NotFound = ({ darkMode }) => {
  const theme = useTheme(darkMode);

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Container className="text-center">
        <h1 style={{ fontSize: '6rem', fontWeight: '700', marginBottom: '8px' }}>
          404
        </h1>
        <p
          style={{
            fontSize: '1.2rem',
            color: theme.muted,
            marginBottom: '24px',
          }}
        >
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          style={{
            display: 'inline-block',
            backgroundColor: theme.accent,
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
          }}
        >
          Go Home
        </a>
      </Container>
    </div>
  );
};

export default NotFound;
