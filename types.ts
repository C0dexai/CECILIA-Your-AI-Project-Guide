
import React from 'react';

export interface WorkflowStageData {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
}

export enum ChatRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export interface ChatMessage {
  role: ChatRole;
  content: string;
}
