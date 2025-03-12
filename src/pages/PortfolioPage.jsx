import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Github, Linkedin } from 'lucide-react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { projects } from '../config/projects';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Extract unique tags from projects
  const tags = ['All', ...new Set(projects.flatMap(project => project.tags))];

  const filteredProjects = selectedTag === 'All' 
    ? projects 
    : projects.filter(project => project.tags.includes(selectedTag));

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
            <img 
              src="/assets/logo.png" 
              alt="Logo" 
              className="h-8 md:h-10 lg:h-12 rounded-full bg-white p-1 shadow-lg mt-1"
              loading="lazy"
            />
            <div className="ml-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Colm Coffey</h1>
              <h2 className="text-lg md:text-xl mb-4 leading-relaxed">Solutions Architect & AI Developer</h2>
              <p className="text-gray-300 leading-relaxed">
                Specializing in Cloud Architecture and AI/ML Applications
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
              <div className="flex justify-between items-start gap-2">
                <CardTitle>{project.title}</CardTitle>
                {project.isInteractive && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                    Interactive
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <img 
                src={project.image} 
                alt={project.title} 
                className="rounded-lg shadow-md mt-4 object-cover h-48 w-full"
                loading="lazy"
              />
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
              loading="lazy"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  closeModal();
                  navigate(`/${currentProject.route}`);
                }}
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
};

export default PortfolioPage;
