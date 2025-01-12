import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Github, Linkedin, Mail, Download } from 'lucide-react';

const PortfolioPage = () => {
  const [activeSection, setActiveSection] = useState('experience');

  // Function to download CV
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/Colm_Coffey_CV.pdf'; // Path to CV in public/assets/
    link.download = 'Colm_Coffey_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Skills section
  const skills = {
    'Cloud & Security': ['AWS Shield', 'AWS WAF', 'KMS Encryption', 'HIPAA/GDPR Compliance'],
    'AI & Data Science': ['Machine Learning', 'Model Development', 'Generative AI', 'RAG'],
    'Development': ['Python', 'Java', 'Kotlin', 'TypeScript', 'React', 'SQL'],
    'Project Management': ['Agile', 'Scrum', 'Waterfall', 'Product Lifecycle']
  };

  // Projects section
  const projects = [
    {
      title: 'SmoothOp App',
      description: 'A scheduling platform for operating theaters with real-time updates.',
      image: '/assets/SmoothOp.JPG', // Correct path based on public folder
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

  console.log('Projects Array:', projects); // Debug log

  try {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4">Colm Coffey</h1>
                <h2 className="text-xl mb-6">Solutions Architect & AI Developer</h2>
                <p className="text-blue-100 mb-8">
                  Specializing in healthcare AI solutions and medical device security
                </p>
                <div className="flex space-x-4">
                  {/* Contact Button */}
                  <a
                    href="mailto:coffeycolm@gmail.com?subject=Portfolio Contact"
                    className="flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Me
                  </a>
                  {/* Download CV Button */}
                  <button
                    onClick={handleDownloadCV}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
          {projects.map((project, index) => {
            console.log(`Rendering project ${index + 1}:`, project.title); // Debug log
            return (
              <Card key={project.title} className="overflow-visible border border-gray-300">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                  <img src={project.image} alt={project.title} className="rounded-lg shadow-md mt-4" />
                  <div className="flex flex-wrap mt-4 space-x-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Test for Tailwind */}
        <div className="test-class">
          Tailwind Test Works
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering PortfolioPage:', error);
  }
};

export default PortfolioPage;
