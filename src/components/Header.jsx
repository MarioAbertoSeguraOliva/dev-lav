import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { SunFill, MoonFill } from 'react-bootstrap-icons';

function Header({ darkMode, toggleTheme }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      sticky="top"
      aria-label="Main"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 999 }}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" end>
          Mario Segura
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          aria-expanded={expanded}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/projects">
              Projects
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About Me
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
          <Button
            variant={darkMode ? 'outline-light' : 'outline-dark'}
            onClick={toggleTheme}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <SunFill /> : <MoonFill />}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
