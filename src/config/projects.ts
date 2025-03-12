import { Project, ProjectRoute } from '../types/project';

export const projects: Project[] = [
  {
    title: 'Custom RAG Deployment with AWS',
    description: 'Serverless RAG architecture for medical knowledge retrieval, specializing in Cervical Dystonia literature. Built with AWS Bedrock, ChromaDB, and FastAPI.',
    image: '/assets/DepRag_architecture.png',
    tags: ['AWS', 'RAG', 'Healthcare', 'AI', 'Serverless'],
    githubLink: 'https://github.com/colmcoffey/RAG-Deployment',
    isInteractive: true,
    route: 'deprag',
    apiEndpoint: 'https://pp7ize56fqejnegjiuknrv3hbu0ijyij.lambda-url.eu-central-1.on.aws'
  },
  {
    title: 'Knowledge Base for Parkinson\'s Disease Research',
    description: 'A specialized knowledge retrieval system for Parkinson\'s Disease literature, enabling researchers to quickly access relevant information and insights.',
    image: '/assets/DepRag_architecture.png',
    tags: ['RAG', 'Healthcare', 'AI', 'Research', 'LLM'],
    githubLink: 'https://github.com/ColmCoffey/PD_Rag',
    isInteractive: true,
    route: 'PD_RAG',
    apiEndpoint: 'https://your-pd-rag-endpoint.aws'
  },
  {
    title: 'Microservice Architecture',
    description: 'Modular serverless microservices architecture for scalable healthcare applications.',
    image: '/assets/AWS Schema Image.png',
    tags: ['AWS', 'Microservices', 'DevOps'],
    githubLink: 'https://github.com/ColmCoffey/Modular-Architecture-Serverless-Microservices',
    route: 'microservices'
  },
  {
    title: 'Deploy WebApp with Amplify 2',
    description: 'Deploying a Serverless Web App with GitHub, React, and AWS Amplify.',
    image: '/assets/aws_amplify_web_app_architecture.png',
    tags: ['AWS', 'React', 'DevOps'],
    githubLink: 'https://github.com/ColmCoffey/website',
    route: 'webapp'
  },
  {
    title: 'BedRock RAG',
    description: 'Guide: Create Knowledge Base with Bedrock.',
    image: '/assets/rag_system_architecture.png',
    tags: ['AWS', 'RAG', 'Knowledge Base'],
    githubLink: 'https://github.com/ColmCoffey/AWS-Bedrock-RAG',
    route: 'bedrock'
  },
  {
    title: 'AI/ML Cybersecurity',
    description: 'Data-In-Use Encryption in Neural Networks Federated Learning Architecture.',
    image: '/assets/FederatedLearning.JPG',
    tags: ['AI', 'ML', 'Cybersecurity'],
    githubLink: 'https://github.com/ColmCoffey/CXR-Secure',
    route: 'federatedlearning'
  },
  {
    title: 'SmoothOp',
    description: 'A scheduling platform for operating theaters with real-time updates.',
    image: '/assets/SmoothOp.JPG',
    tags: ['Healthcare', 'AWS', 'Vue'],
    githubLink: 'https://github.com/ColmCoffey/SmoothOp',
    route: 'smoothop'
  },
  {
    title: 'VRx Health',
    description: 'VR-based healthcare solution for remote consultations and early diagnosis.',
    image: '/assets/VRx_Health.JPG',
    tags: ['VR', 'Healthcare', 'AI'],
    githubLink: 'https://github.com/ColmCoffey/VRxHealth',
    route: 'vrxhealth'
  },
  {
    title: 'EndoDetect',
    description: 'Minimally invasive diagnostic tool for endometriosis.',
    image: '/assets/Endodetect.JPG',
    tags: ['Diagnostics', 'Healthcare', 'ML'],
    githubLink: 'https://github.com/ColmCoffey/endodetect',
    route: 'endodetect'
  }
];

export const projectRoutes: Record<string, ProjectRoute> = {
  deprag: {
    githubRepo: 'https://github.com/colmcoffey/RAG-Deployment',
    markdownPath: 'README.md',
    isInteractive: true,
    apiEndpoint: 'https://pp7ize56fqejnegjiuknrv3hbu0ijyij.lambda-url.eu-central-1.on.aws'
  },
  PD_RAG: {
    githubRepo: 'https://github.com/ColmCoffey/PD_Rag',
    markdownPath: 'README.md',
    isInteractive: true,
    apiEndpoint: 'https://your-pd-rag-endpoint.aws'
  },
  microservices: {
    githubRepo: 'https://github.com/ColmCoffey/Modular-Architecture-Serverless-Microservices',
    markdownPath: 'README.md'
  },
  webapp: {
    githubRepo: 'https://github.com/ColmCoffey/website',
    markdownPath: 'README.md'
  },
  bedrock: {
    githubRepo: 'https://github.com/ColmCoffey/AWS-Bedrock-RAG',
    markdownPath: 'README.md'
  },
  federatedlearning: {
    githubRepo: 'https://github.com/ColmCoffey/CXR-Secure',
    markdownPath: 'README.md'
  },
  smoothop: {
    githubRepo: 'https://github.com/ColmCoffey/SmoothOp',
    markdownPath: 'README.md'
  },
  vrxhealth: {
    githubRepo: 'https://github.com/ColmCoffey/VRxHealth',
    markdownPath: 'README.md'
  },
  endodetect: {
    githubRepo: 'https://github.com/ColmCoffey/endodetect',
    markdownPath: 'README.md'
  }
}; 