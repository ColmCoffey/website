import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import PortfolioPage from "./pages/PortfolioPage";
import { ThemeProvider } from './contexts/ThemeProvider';

// Project route configuration
const projectRoutes = {
  PD_RAG: {
    githubRepo: "https://github.com/ColmCoffey/PD_Rag",
    markdownPath: "README.md",
    isInteractive: true,
    apiEndpoint: "https://pp7ize56fqejnegjiuknrv3hbu0ijyij.lambda-url.eu-central-1.on.aws",
    topic: "Parkinson's Disease"
  },
  deprag: {
    githubRepo: "https://github.com/ColmCoffey/RAG-Deployment",
    markdownPath: "README.md",
    isInteractive: true,
    apiEndpoint: "https://pp7ize56fqejnegjiuknrv3hbu0ijyij.lambda-url.eu-central-1.on.aws"
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
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/:projectId" element={<ProjectPage projectRoutes={projectRoutes} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);