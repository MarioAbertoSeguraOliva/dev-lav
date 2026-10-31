import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ProjectsPage from './pages/Projects';
import ContactPage from './pages/Contact';
import NotFoundPage from './pages/NotFound';

const routeMetadata = {
  '/': { title: 'Home — Mario Segura | Software Engineer' },
  '/projects': { title: 'Projects — Mario Segura' },
  '/about': { title: 'About — Mario Segura' },
  '/contact': { title: 'Contact — Mario Segura' },
};

const notFoundMetadata = {
  title: 'Page Not Found | Mario Segura',
  noindex: true,
};

export const getRouteMetadata = (pathname) => {
  const routePath = pathname.toLowerCase().replace(/\/+$/, '') || '/';
  return routeMetadata[routePath] || notFoundMetadata;
};

function RouteMetadata() {
  const { pathname } = useLocation();
  const { title, noindex } = getRouteMetadata(pathname);

  useEffect(() => {
    document.title = title;

    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      const meta = robotsMeta || document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, follow';
      if (!robotsMeta) {
        document.head.appendChild(meta);
      }
    } else if (robotsMeta) {
      robotsMeta.remove();
    }
  }, [title, noindex]);

  return null;
}

const readStoredDarkMode = () => {
  try {
    const saved = localStorage.getItem('darkMode');
    return saved !== null && JSON.parse(saved) === true;
  } catch (error) {
    return false;
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(readStoredDarkMode);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );

    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    } catch (error) {
      // Storage can be unavailable (for example in privacy mode); the
      // in-memory theme still works for this session.
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ErrorBoundary>
      <Router>
        <RouteMetadata />
        <Layout darkMode={darkMode} toggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<HomePage darkMode={darkMode} />} />
            <Route path="/about" element={<AboutPage darkMode={darkMode} />} />
            <Route path="/projects" element={<ProjectsPage darkMode={darkMode} />} />
            <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
            <Route path="*" element={<NotFoundPage darkMode={darkMode} />} />
          </Routes>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
