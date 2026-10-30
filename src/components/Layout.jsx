import React, { useRef } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/accessibility.css';

function Layout({ children, darkMode, toggleTheme }) {
  const mainRef = useRef(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <a
        className="skip-link"
        href="#main-content"
        onClick={() => {
          if (mainRef.current) {
            mainRef.current.focus();
          }
        }}
      >
        Skip to main content
      </a>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <main id="main-content" ref={mainRef} tabIndex="-1" style={{ flex: 1 }}>
        {children}
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Layout;
