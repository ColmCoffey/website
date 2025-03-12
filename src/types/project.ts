export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubLink: string;
  isInteractive?: boolean;
  route: string;
  apiEndpoint?: string;
}

export interface ProjectRoute {
  githubRepo: string;
  markdownPath: string;
  isInteractive?: boolean;
  apiEndpoint?: string;
}

export interface ProjectConfig {
  projects: Project[];
  projectRoutes: Record<string, ProjectRoute>;
}

export interface RAGResponse {
  is_complete: boolean;
  answer_text?: string;
  sources?: string[];
  query_id?: string;
}

export interface QueryHistoryItem {
  text: string;
  timestamp: number;
  id: string;
}

export interface RAGInterfaceProps {
  apiEndpoint: string;
  topic?: string;
  customSampleQueries?: string[];
  placeholder?: string;
} 