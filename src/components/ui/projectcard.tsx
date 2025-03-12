import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <Card className="card-container relative group cursor-pointer" onClick={onClick}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project.title}
          {project.isInteractive && (
            <div className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm">
              <PlayCircle className="w-4 h-4" />
              <span>Interactive Demo</span>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{project.description}</p>
        <div className="relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="rounded-lg shadow-md mt-4 object-cover h-48 w-full" 
          />
          {project.isInteractive && (
            <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-all duration-300 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle className="w-12 h-12 text-white" />
              </div>
            </div>
          )}
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