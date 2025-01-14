import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import PortfolioPage from "./PortfolioPage";

// Project route configuration
const projectRoutes = {
  microservices: {
    githubRepo: "https://github.com/ColmCoffey/Modular-Architecture-Serverless-Microservices",
    markdownPath: "README.md" // Path to markdown file in repo
  },
  smoothop: {
    githubRepo: "https://github.com/ColmCoffey/Medical-Device-Portfolio",
    markdownPath: "SmoothOp/README.md"
  }
  // Add more project routes as needed
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/:projectId" element={<ProjectPage projectRoutes={projectRoutes} />} />
      </Routes>
    </Router>
  </React.StrictMode>
);