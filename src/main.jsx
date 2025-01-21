import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import PortfolioPage from "./PortfolioPage";

// Project route configuration
const projectRoutes = {
  microservices: {
    githubRepo: "https://github.com/ColmCoffey/Modular-Architecture-Serverless-Microservices",
    markdownPath: "README.md"
  },
  webapp: {
    githubRepo: "https://github.com/ColmCoffey/website",
    markdownPath: "README.md"
  },
  bedrock: {
    githubRepo: "https://github.com/ColmCoffey/AWS-Bedrock-RAG",
    markdownPath: "README.md"
  },
  federatedlearning: {
    githubRepo: "https://github.com/ColmCoffey/CXR-Secure",
    markdownPath: "README.md"
  },
  smoothop: {
    githubRepo: "https://github.com/ColmCoffey/Medical-Device-Portfolio",
    markdownPath: "README.md"
  },
  vrxhealth: {
    githubRepo: "https://github.com/ColmCoffey/Medical-Device-Portfolio",
    markdownPath: "README.md"
  },
  endodetect: {
    githubRepo: "https://github.com/ColmCoffey/Medical-Device-Portfolio",
    markdownPath: "README.md"
  }
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