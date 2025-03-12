import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import RAGInterface from '../components/RAGInterface';
import { cn } from "../components/ui/lib/utils";
import 'github-markdown-css/github-markdown.css';
import "../index.css";
import { projectRoutes } from '../config/projects';

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const projectConfig = projectRoutes[projectId];
  const isInteractive = projectConfig?.isInteractive || false;

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

  const Header = () => (
    <header className="relative bg-gradient-to-br from-gray-800 to-blue-600 text-white shadow-lg py-16">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="h-12 rounded-full bg-white p-1 shadow-lg cursor-pointer"
          onClick={() => navigate("/")}
          loading="lazy"
        />
        <h1 className="text-3xl font-bold capitalize">{projectId}</h1>
      </div>
    </header>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
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
    <div className="min-h-screen bg-gray-50">
      <Header />    
      <main className="max-w-4xl mx-auto py-8 px-4">
        {isInteractive && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4">Interactive RAG Demo</h2>
              <p className="text-gray-600 mb-6">
                Ask questions about our services and get instant answers powered by our AI knowledge base.
              </p>
            </div>
            <RAGInterface apiEndpoint={projectConfig?.apiEndpoint} />
          </div>
        )}
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <article className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              children={content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <pre>
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
                    className="text-blue-600 hover:text-blue-800 hover:underline"
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