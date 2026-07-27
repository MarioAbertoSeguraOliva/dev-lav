import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Roboto', sans-serif",
            backgroundColor: '#fff',
            color: '#000',
          }}
        >
          <div className="text-center">
            <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>
              Something went wrong.
            </h1>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                backgroundColor: '#1976d2',
                color: '#fff',
                padding: '12px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
