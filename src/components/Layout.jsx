import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children, darkMode, toggleTheme }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default Layout;
