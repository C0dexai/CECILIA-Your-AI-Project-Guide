import React from 'react';
import { WorkflowStageData } from './types';

const ConceptionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

const DesignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const ImplementationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const DeploymentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


export const WORKFLOW_STAGES: WorkflowStageData[] = [
  {
    title: 'Project Conception and Definition',
    description: 'Think of it as our opening act!',
    icon: <ConceptionIcon />,
    items: [
      'Vision Document: Start with a clear and compelling vision. What problem are we solving? Who is our audience?',
      'Requirements Gathering: User stories are our friends here! We\'ll need detailed requirements – think functionality, performance, and user experience.',
      'Scope Definition: Scope creep is a terrible monster! Carefully define what\'s in and what\'s decidedly out of scope.'
    ],
  },
  {
    title: 'Design and Planning',
    description: 'The blueprints to our masterpiece!',
    icon: <DesignIcon />,
    items: [
      'High-Level Design: Sketch out the overall architecture. Think elegant diagrams and well-defined modules.',
      'Detailed Design: Dive into the nitty-gritty! Class diagrams, database schemas, API specifications...',
      'Technology Selection: Choosing the right tools is paramount! Languages, frameworks, databases - let\'s ensure they are a perfect fit.',
      'Task Breakdown: Break down the project into manageable tasks, estimate their effort, and assign them.'
    ],
  },
  {
    title: 'Implementation and Testing',
    description: 'Where the magic happens... with a dash of debugging!',
    icon: <ImplementationIcon />,
    items: [
      'Version Control: GitHub, GitLab, Bitbucket – pick your poison, but use it religiously!',
      'Coding Standards: Maintain consistency! A style guide is a must. Clean code is happy code!',
      'Unit Testing: Test, test, test! Early and often. Each component should be thoroughly tested in isolation.',
      'Integration Testing: Ensure all the pieces play nicely together.',
      'User Acceptance Testing (UAT): Get some feedback from real users! Their opinions are invaluable.'
    ],
  },
  {
    title: 'Deployment and Maintenance',
    description: 'The grand finale and beyond!',
    icon: <DeploymentIcon />,
    items: [
      'Deployment Strategy: Automated deployments are oh-so-chic! Plan a smooth and reliable deployment process.',
      'Monitoring: Keep a watchful eye on our creation. Performance monitoring and error logging are essential.',
      'Maintenance and Updates: Software is a living thing! Regular maintenance and updates are crucial.'
    ],
  }
];