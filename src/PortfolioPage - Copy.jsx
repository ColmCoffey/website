import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Github, Linkedin, Mail, Download, X } from 'lucide-react';
import './index.css';

const PortfolioPage = () => {
  const [activeSection, setActiveSection] = useState('experience');
  const [selectedTag, setSelectedTag] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/Colm_Coffey_CV.pdf';
    link.download = 'Colm_Coffey_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const projects = [
    {
      title: 'SmoothOp App',
      description: 'A scheduling platform for operating theaters with real-time updates.',
      image: '/assets/SmoothOp.JPG',
      tags: ['Healthcare', 'AWS', 'Vue']
    },
    {
      title: 'VRx Health',
      description: 'VR-based healthcare solution for remote consultations and early diagnosis.',
      image: '/assets/VRx_Health.JPG',
      tags: ['VR', 'Telemedicine', 'AI']
    },
    {
      title: 'EndoDetect',
      description: 'Minimally invasive diagnostic tool for endometriosis.',
      image: '/assets/Endodetect.JPG',
      tags: ['Medical Device', 'ML', 'Diagnostics']
    },
    {
      title: 'Microservice Architecture',
      description: 'Modular serverless microservices architecture for scalable healthcare applications.',
      image: '/assets/AWS Schema Image.png',
      tags: ['AWS Lambda', 'Microservices', 'DevOps']
    }
  ];

  const tags = ['All', 'Healthcare', 'AI', 'AWS', 'ML', 'Diagnostics', 'DevOps'];

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
      <header className="relative bg-gradient-to-br from-gray-800 to-blue-600 text-white shadow-lg py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <img src="/assets/logo.png" alt="Logo" className="h-8 md:h-10 lg:h-12 rounded-full bg-white p-1 shadow-lg mt-1" />
            <div className="ml-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Colm Coffey</h1>
              <h2 className="text-lg md:text-xl mb-4 leading-relaxed">Solutions Architect & AI Developer</h2>
              <p className="text-gray-300 leading-relaxed">
                Specializing in healthcare AI solutions and medical device security
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon github">
              <Github className="w-5 h-5 md:w-6 md:h-6" />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
              <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </header>

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
};

export default PortfolioPage;
