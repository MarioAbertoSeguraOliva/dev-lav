import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/accessibility.css';

function Layout({ children, darkMode, toggleTheme }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <main id="main-content" style={{ flex: 1 }}>
        {children}
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Layout;
