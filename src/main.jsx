import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import PortfolioPage from "./pages/PortfolioPage";

// Project route configuration
const projectRoutes = {
  deprag: {
    githubRepo: "https://github.com/ColmCoffey/RAG-Deployment",
    markdownPath: "README.md",
    isInteractive: true  // This should show RAG interface
  },
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
    githubRepo: "https://github.com/ColmCoffey/SmoothOp",
    markdownPath: "README.md"
  },
  vrxhealth: {
    githubRepo: "https://github.com/ColmCoffey/VRxHealth",
    markdownPath: "README.md"
  },
  endodetect: {
    githubRepo: "https://github.com/ColmCoffey/endodetect",
    markdownPath: "README.md"
  },
  PD_RAG: {
    githubRepo: "https://github.com/ColmCoffey/PD_Rag",
    markdownPath: "README.md",
    isInteractive: true
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