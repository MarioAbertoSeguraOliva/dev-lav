
import React from 'react';
// Note: This assumes ProjectView.css is handled via CSS Modules or global scope. 
// For a real project, we'd use styled components or native framework pattern matching.
import './ProjectView.css'; 

// Mock function for status logic (to show clean separation)
const getStatusBadge = (status) => {
  let classes = '';
  switch (status) {
    case 'ACTIVE':
      classes = 'status-active';
      break;
    case 'BETA':
      classes = 'status-beta';
      break;
    default:
      return <span className="status-badge" style={{backgroundColor: '#7f8c8d', color: 'white'}}>UNKNOWN</span>;
  }
  return <span className={`status-badge ${classes}`}>{status}</span>;
};

// Mock function for navigation handlers (simulating React Router/Next.js router)
const handleNavigation = (link, label) => {
    console.log(`[NAV]: Routing to ${link} for "${label}"`);
    alert('Simulated Redirection: You clicked on ' + label + '. Target: ' + link);
};

// Component structure mimicking the HTML mockup
const ProjectOverview = ({ projectName = "Project Aurora AI Engine", projectStatus = 'ACTIVE', description = "Initial project description placeholder." }) => {
    return (
        <div className="container">
            {/* Header / Project Banner */}
            <header>
                <h1>{projectName}</h1>
                {getStatusBadge(projectStatus)}
                <p>The next generation platform for decentralized AI models and multi-agent orchestration.</p>
            </header>

            {/* Project Description Section */}
            <section id="projectDescription" style={{margin: '30px 0'}}>
                <h2>Overview</h2>
                <p>{description}</p>
                <p>Project Aurora is designed to create a single, unified interface for high-value AI capabilities. It abstracts the complexity of interacting with various models (GPT, Claude, Gemma), providers (Ollama, custom endpoints), and technologies like MCPs and agents. Our goal is to provide enterprises with an easy-to-adopt gateway, resulting in strong hiring value by proving mastery across diverse modern tech stacks.</p>
                <p>By centralizing access and enforcing robust governance within a Docker/Kubernetes ecosystem, we manage risk while maximizing feature velocity. This view page serves as the primary single source of truth for all stakeholders regarding the project's health and roadmap.</p>
            </section>

            {/* Key Metrics Grid */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <span className="metric-value">1.2M+</span>
                    <span className="metric-label">Images Processed YTD</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">95%</span>
                    <span className="metric-label">Service Uptime (SLA)</span>
                </div>
                <div className="metric-card">
                    <span className="metric-value">V3.1.0</span>
                    <span className="metric-label">Current Release Version</span>
                </div>
            </div >

            {/* Interactive/Key Sections */}
            <h2>Quick Links & Ecosystem Components</h2>
            <div className="key-sections">
                <div 
                    className="section-card" 
                    onClick={() => handleNavigation('/repo', 'Code Repository')}
                    style={{cursor: 'pointer'}}
                >
                    <h3>🧑‍💻 Code Repository</h3>
                    <p>Access the main codebase, branching strategies, and PR workflows here. (Link to Git/GitHub)</p>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'block', marginTop: '15px', color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>&rarr; View Codebase</a>
                </div>

                <div 
                    className="section-card" 
                    onClick={() => handleNavigation('/deployment', 'Deployment Dashboard')}
                    style={{cursor: 'pointer'}}
                >
                     <h3>🚀 Deployment Dashboard</h3>
                    <p>Monitor the live Docker/K8s deployment status, logs, and scaling metrics. (Link to K8s Portal)</p>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'block', marginTop: '15px', color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>&rarr; Check Status</a>
                </div>

                <div 
                    className="section-card" 
                    onClick={() => handleNavigation('/docs', 'Documentation & Design')}
                    style={{cursor: 'pointer'}}
                >
                    <h3>📚 Documentation & Design</h3>
                    <p>Refer to architecture diagrams, API specs, and the AI service implementation guides. (Link to Wiki)</p>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'block', marginTop: '15px', color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}>&rarr; View Docs</a>
                </div>
            </div>
        </div>
    );
};

export default ProjectOverview;