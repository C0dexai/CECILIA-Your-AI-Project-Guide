import React, { useState } from 'react';
import { WorkflowStageData } from '../types';

interface WorkflowStageProps {
  stage: WorkflowStageData;
  isInitiallyOpen?: boolean;
}

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const WorkflowStage: React.FC<WorkflowStageProps> = ({ stage, isInitiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  return (
    <div className="border border-gray-700 rounded-2xl shadow-lg overflow-hidden bg-gray-800/50 backdrop-blur-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 rounded-2xl"
      >
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0 p-3 bg-violet-900/50 rounded-full">
            {stage.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-100">{stage.title}</h3>
            <p className="text-sm text-gray-400 italic mt-1">{stage.description}</p>
          </div>
        </div>
        <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <ChevronDownIcon />
        </div>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className="px-8 pb-6 pt-2">
          <ul className="space-y-3 text-gray-300 list-disc list-inside">
            {stage.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkflowStage;