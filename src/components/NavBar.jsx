import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Sun, Moon, Mail } from 'lucide-react';
import { useTheme } from '../contexts/ThemeProvider';

const NavBar = ({ currentPage = 'home' }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const handleContactClick = (e) => {
    e.preventDefault();
    window.location.href = 'mailto:coffeycolm@gmail.com';
  };
  
  return (
    <nav className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <img 
            src="/assets/logo.png" 
            alt="Logo" 
            className="h-10 rounded-full bg-white dark:bg-gray-800 p-1 shadow cursor-pointer" 
            onClick={() => navigate('/')}
            loading="lazy"
          />
          
          <div className="hidden md:flex space-x-6">
            <a 
              href="/" 
              className={`transition-colors ${currentPage === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'}`}
            >
              Projects
            </a>
            <a 
              href="https://github.com/ColmCoffey" 
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400`}
            >
              About
            </a>
            <a 
              href="#" 
              onClick={handleContactClick}
              className={`transition-colors text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400`}
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <a 
            href="https://github.com/ColmCoffey" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub Profile" 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          
          <a 
            href="https://www.linkedin.com/in/colm-coffey/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn Profile"
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 