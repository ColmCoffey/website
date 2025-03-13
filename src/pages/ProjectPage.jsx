import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import RAGInterface from '../components/RAGInterface';
import { cn } from "../components/ui/lib/utils";
import 'github-markdown-css/github-markdown.css';
import "../index.css";
import { projectRoutes, projects } from '../config/projects';
import NavBar from '../components/NavBar';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const projectConfig = projectRoutes[projectId];
  const isInteractive = projectConfig?.isInteractive || false;
  
  // Find the project title from the projects array
  const projectTitle = projects.find(p => p.route === projectId)?.title || projectId;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (!projectConfig) {
          navigate('/');
          return;
        }

        const { githubRepo, markdownPath } = projectConfig;
        const [_, owner, repo] = githubRepo.match(/github\.com\/([^/]+)\/([^/]+)/);
        
        const branches = ['main', 'master'];
        let markdownContent = null;
        let fetchError = null;

        for (const branch of branches) {
          try {
            const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${markdownPath}`;
            const response = await fetch(rawUrl);
            
            if (response.ok) {
              markdownContent = await response.text();
              break;
            }
          } catch (err) {
            fetchError = err;
          }
        }

        if (!markdownContent) {
          throw fetchError || new Error('Failed to fetch content from any branch');
        }

        setContent(markdownContent);
        
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to load content. Please check if the repository and file exist.`);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [projectId, projectConfig, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <header className="relative bg-gradient-to-br from-gray-800 to-blue-600 text-white shadow-lg py-16">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{projectTitle}</h1>
          </div>
        </header>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <NavBar />
        <header className="relative bg-gradient-to-br from-gray-800 to-blue-600 text-white shadow-lg py-16">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{projectTitle}</h1>
          </div>
        </header>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
          <div className="text-red-500 text-xl text-center max-w-md">
            <p>{error}</p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <header className="relative bg-gradient-to-br from-gray-800 to-blue-600 text-white shadow-lg py-16">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{projectTitle}</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto py-8 px-4">
        {isInteractive && (
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
            <div className="prose dark:prose-invert max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Interactive RAG Demo</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Ask questions about {projectConfig?.topic || 'our services'} and get instant answers powered by our AI knowledge base.
              </p>
            </div>
            <RAGInterface 
              apiEndpoint={projectConfig?.apiEndpoint} 
              topic={projectConfig?.topic === 'Cervical Dystonia' ? 'cervicalDystonia' : 'parkinsons'}
            />
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <article className="markdown-body dark:bg-gray-800 dark:text-gray-100">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              children={content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <pre className="dark:bg-gray-900">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                a: ({ node, ...props }) => (
                  <a 
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {props.children}
                  </a>
                ),
                img: ({ node, ...props }) => (
                  <img
                    {...props}
                    loading="lazy"
                    className="max-w-full h-auto"
                  />
                ),
              }}
            />
          </article>
        </div>
      </main>

      <footer className="text-center mt-8 pb-8">
        <a
          href={projectConfig?.githubRepo}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
};

export default ProjectPage;