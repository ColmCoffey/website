import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { PlayCircle, Star } from 'lucide-react';
import { Project } from '../../types/project';
import ProgressiveImage from '../ProgressiveImage';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const projectId = project.title.replace(/\s+/g, '-').toLowerCase();
  
  return (
    <Card 
      className={`card-container relative group cursor-pointer h-full ${project.featured ? 'featured-card' : ''}`} 
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-labelledby={`project-title-${projectId}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {project.featured && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white p-1 rounded-full z-10" aria-label="Featured project">
          <Star className="w-4 h-4 fill-current" />
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle 
          id={`project-title-${projectId}`}
          className="flex items-center justify-between"
        >
          {project.title}
          {project.isInteractive && (
            <div className="flex items-center gap-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full text-sm"
                 aria-label="Interactive demonstration available">
              <PlayCircle className="w-4 h-4" />
              <span>Interactive Demo</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between h-[calc(100%-4rem)]">
        <div>
          <p className="line-clamp-3 mb-4">{project.description}</p>
          <div className="project-image-container h-[160px] overflow-hidden">
            <ProgressiveImage 
              src={project.image} 
              alt={project.title} 
              className="project-image" 
            />
            {project.isInteractive && (
              <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mt-4 gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;