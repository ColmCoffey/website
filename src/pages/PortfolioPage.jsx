import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Github, Linkedin } from 'lucide-react';
import '../index.css';
import { useNavigate } from 'react-router-dom';


const PortfolioPage = () => {
  const navigate = useNavigate();  // Add this line
  const [activeSection, setActiveSection] = useState('experience');
  const [selectedTag, setSelectedTag] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '../assets/Colm_Coffey_CV.pdf';
    link.download = 'Colm_Coffey_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects = [

    {
      title: 'Demo: Deploy Custom RAG with AWS',
       description: 'Serverless RAG architecture for medical knowledge retrieval, specializing in Cervical Dystonia literature. Built with AWS Bedrock, ChromaDB, and FastAPI.',
       image: '../assets/DepRag_architecture.png',
       tags: ['AWS', 'RAG', 'Healthcare', 'AI', 'Serverless'],
      githubLink: 'https://github.com/colmcoffey/RAG-Deployment',
      route: 'deprag',
    },

    {
      title: 'Microservice Architecture',
      description: 'Modular serverless microservices architecture for scalable healthcare applications.',
      image: '../assets/AWS Schema Image.png',
      tags: ['AWS', 'Microservices', 'DevOps'],
      githubLink: 'https://github.com/ColmCoffey/Modular-Architecture-Serverless-Microservices',
      route: 'microservices'  // Add this line
    },
    {
      title: 'Deploy WebApp with Amplify 2',
      description: 'Deploying a Serverless Web App with GitHub, React, and AWS Amplify.',
      image: '../assets/aws_amplify_web_app_architecture.png',
      tags: ['AWS', 'React', 'DevOps'],
      githubLink: 'https://github.com/ColmCoffey/website',
      route: 'webapp'  // Add this line

    },
    {
      title: 'BedRock RAG',
      description: 'Guide: Create Knowledgebase with Bedrock.',
      image: '../assets/rag_system_architecture.png',
      tags: ['AWS', 'RAG', 'Knowledgebase'],
      githubLink: 'https://github.com/ColmCoffey/AWS-Bedrock-RAG',
      route: 'bedrock'  // Add this line

    },
    {
      title: 'AI/ML Cybersecurity',
      description: 'Data-In-Use Encryption in Neural Networks Federated Learning Architecture.',
      image: '../assets/FederatedLearning.JPG',
      tags: ['AI', 'ML', 'Cybersecurity'],
      githubLink: 'https://github.com/ColmCoffey/CXR-Secure',
      route: 'federatedlearning'  // Add this line

    },
    {
      title: 'SmoothOp',
      description: 'A scheduling platform for operating theaters with real-time updates.',
      image: '../assets/SmoothOp.JPG',
      tags: ['Healthcare', 'AWS', 'Vue'],
      githubLink: 'https://github.com/ColmCoffey/SmoothOp',
      route: 'smoothop'  // Add this line

    },
    {
      title: 'VRx Health',
      description: 'VR-based healthcare solution for remote consultations and early diagnosis.',
      image: '../assets/VRx_Health.JPG',
      tags: ['VR', 'Healthcare', 'AI'],
      githubLink: 'https://github.com/ColmCoffey/VRxHealth',
      route: 'vrxhealth'  // Add this line
    },
    {
      title: 'EndoDetect',
      description: 'Minimally invasive diagnostic tool for endometriosis.',
      image: '../assets/Endodetect.JPG',
      tags: ['Diagnostics', 'Healthcare', 'ML'],
      githubLink: 'https://github.com/ColmCoffey/endodetect',
      route: 'endodetect'  // Add this line

    }
  ];
  
  const tags = ['All', 'Healthcare', 'AI', 'AWS', 'ML', 'Diagnostics', 'DevOps', 'React', 'RAG', 'Cybersecurity', 'VR', 'Vue'];
  

  const filteredProjects = selectedTag === 'All' ? projects : projects.filter(project => project.tags.includes(selectedTag));

  const openModal = (project) => {
    setCurrentProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-gray-800 to-blue-600 text-white shadow-lg py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <img src="../assets/logo.png" alt="Logo" className="h-8 md:h-10 lg:h-12 rounded-full bg-white p-1 shadow-lg mt-1" />
            <div className="ml-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Colm Coffey</h1>
              <h2 className="text-lg md:text-xl mb-4 leading-relaxed">Solutions Architect & AI Developer</h2>
              <p className="text-gray-300 leading-relaxed">
                Specializing in healthcare AI solutions and medical device security
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/ColmCoffey" target="_blank" rel="noopener noreferrer" className="social-icon github">
              <Github className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://www.linkedin.com/in/colm-coffey/" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <section className="py-6 bg-gray-100 text-center">
        <h3 className="text-lg font-semibold mb-4">Filter Projects</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              className={`px-3 py-1 btn-primary ${selectedTag === tag ? 'bg-indigo-700' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
        {filteredProjects.map(project => (
          <Card key={project.title} className="card-container" onClick={() => openModal(project)}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <img src={project.image} alt={project.title} className="rounded-lg shadow-md mt-4 object-cover h-48 w-full" />
              <div className="flex flex-wrap mt-4 space-x-2">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      {showModal && (
  <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="modal-content bg-white p-6 rounded-lg shadow-lg max-w-lg relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
      >
        X
      </button>
      <h2 className="text-2xl font-bold mb-4">{currentProject?.title}</h2>
      <p className="mb-4">{currentProject?.description}</p>
      <img
        src={currentProject?.image}
        alt={currentProject?.title}
        className="rounded-lg mt-4 w-full"
      />
<div className="flex justify-end mt-4">
          <button
            onClick={() => {
              closeModal();
              navigate(`/${currentProject.route}`)}
            }
            className="btn-primary"
          >
            Read More
          </button>
        </div>
      </div>
  </div>
)}




      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Colm Coffey. All Rights Reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="#" className="text-blue-400">Privacy Policy</a>
            <a href="#" className="text-blue-400">Terms of Service</a>
            <a href="#" className="text-blue-400">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );

  const ProjectPage = () => {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-br from-gray-800 to-blue-600 text-white py-16 text-center">
          <h1 className="text-4xl font-bold">Project Details</h1>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
          <p className="mb-4">
            This page provides detailed information about a specific project.
          </p>
          <pre className="bg-gray-100 p-4 rounded shadow">
            <code>
              {`const sampleCode = "This is a code snippet";`}
            </code>
          </pre>
          <div className="mt-6">
            <a
              href="https://github.com/your-repo-link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View on GitHub
            </a>
          </div>
        </main>
      </div>
    );
  };
  


};



export default PortfolioPage;
