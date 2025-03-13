import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Github, Linkedin, PlayCircle } from 'lucide-react';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { projects } from '../config/projects.ts';
import NavBar from '../components/NavBar';
import SkeletonCard from '../components/ui/SkeletonCard';
import ProjectCard from '../components/ui/projectcard';
import ProgressiveImage from '../components/ProgressiveImage';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define main categories for filtering
  const mainCategories = ['All', 'AI/ML', 'Healthcare', 'AWS', 'DevOps'];
  
  // Map all tags to main categories for filtering
  const mapTagToCategory = (tag) => {
    if (tag === 'RAG' || tag === 'ML' || tag === 'LLM' || tag === 'AI') return 'AI/ML';
    if (tag === 'Healthcare' || tag === 'Diagnostics') return 'Healthcare';
    if (tag === 'AWS' || tag === 'Serverless') return 'AWS';
    if (tag === 'DevOps' || tag === 'Microservices') return 'DevOps';
    return tag;
  };

  const filteredProjects = selectedTag === 'All' 
    ? projects 
    : projects.filter(project => 
        project.tags.some(tag => mapTagToCategory(tag) === selectedTag)
      );

  // Organize projects to avoid empty spaces
  const organizeProjects = (projects) => {
    // Sort projects so featured ones come first
    const sortedProjects = [...projects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
    
    return sortedProjects;
  };

  const organizedProjects = organizeProjects(filteredProjects);

  useEffect(() => {
    // Simulate loading for demonstration
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const openModal = (project) => {
    setCurrentProject(project);
    setShowModal(true);
    // Add a class to prevent scrolling when modal is open
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentProject(null);
    // Remove the class to allow scrolling again
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <NavBar currentPage="home" />

      {/* Header */}
      <header className="relative bg-gradient-to-br from-gray-800 to-blue-600 text-white shadow-lg py-16">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center text-center md:text-left mb-6 md:mb-0">
            <img 
              src="/assets/logo.png" 
              alt="Logo" 
              className="h-16 rounded-full bg-white p-2 shadow-lg mb-4 md:mb-0 md:mr-6" 
              loading="lazy"
            />
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">Colm Coffey</h1>
              <h2 className="text-xl mb-2 leading-relaxed">Solutions Architect & AI Developer</h2>
              <p className="text-gray-300 leading-relaxed max-w-lg">
                Specializing in Cloud Architecture and AI/ML Applications
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <section className="py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-lg font-semibold mb-4 text-center">Filter Projects</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {mainCategories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === category 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-gray-600'
                }`}
                onClick={() => setSelectedTag(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      {loading ? (
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
          </div>
        </main>
      ) : (
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {organizedProjects.map((project, index) => (
              <div 
                key={project.title} 
                className="h-full"
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => openModal(project)} 
                />
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full relative overflow-hidden"
            style={{animation: 'modal-pop 0.3s ease-out'}}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-full p-1 text-gray-500 hover:text-red-500 transition-colors z-10"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="w-full h-48 overflow-hidden">
              <ProgressiveImage
                src={currentProject?.image}
                alt={currentProject?.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <h2 id="modal-title" className="text-2xl font-bold mb-2">{currentProject?.title}</h2>
              <p className="mb-4">{currentProject?.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {currentProject?.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              
              <div className="flex justify-end gap-4">
                <a
                  href={currentProject?.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <button
                  onClick={() => {
                    closeModal();
                    navigate(`/${currentProject.route}`);
                  }}
                  className="btn-primary"
                >
                  View Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Colm Coffey. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;
