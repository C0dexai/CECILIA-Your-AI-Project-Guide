import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { WORKFLOW_STAGES } from './constants';
import WorkflowStage from './components/WorkflowStage';
import { createChatSession } from './services/geminiService';
import type { ChatMessage } from './types';
import { ChatRole } from './types';

const App: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatSession = createChatSession();
    setChat(chatSession);

    setMessages([
      {
        role: ChatRole.MODEL,
        content: "Greetings, darling! I'm CECILIA, your very own AI project guide. To truly tailor this workflow to your project, tell me a little bit about it! What kind of software are we building? Who's on the team? And what's the timeline? I'm simply dying to hear all the details!"
      }
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = { role: ChatRole.USER, content: userInput };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput('');
    setIsLoading(true);
    
    try {
      const stream = await chat.sendMessageStream({ message: currentInput });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: ChatRole.MODEL, content: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === ChatRole.MODEL) {
              lastMessage.content = modelResponse;
            }
            return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: ChatRole.MODEL, content: "Oh, dear. It seems I've had a slight technical hiccup. Please try again, darling." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderMessageContent = (content: string) => {
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];
    const lines = content.split('\n');

    const flushList = (key: string) => {
        if (listItems.length > 0) {
            elements.push(<ul key={key} className="list-disc list-inside space-y-1 my-2">{listItems}</ul>);
            listItems = [];
        }
    };

    lines.forEach((line, i) => {
        if (line.startsWith('* ')) {
            listItems.push(<li key={i}>{line.substring(2)}</li>);
        } else {
            flushList(`ul-${i}`);
            if (line.startsWith('### ')) {
                elements.push(<h3 key={i} className="text-lg font-semibold mt-2">{line.substring(4)}</h3>);
            } else if (line.startsWith('## ')) {
                elements.push(<h2 key={i} className="text-xl font-bold mt-3">{line.substring(3)}</h2>);
            } else if (line.startsWith('# ')) {
                elements.push(<h1 key={i} className="text-2xl font-bold mt-4">{line.substring(2)}</h1>);
            } else if (line.trim() !== '') {
                elements.push(<p key={i} className="leading-relaxed">{line}</p>);
            }
        }
    });

    flushList('ul-last');
    return <>{elements.length > 0 ? elements : <p className="leading-relaxed">{content}</p>}</>;
  };

  const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );

  const CeciliaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3.75h9m-9 3.75h9M3.375 3.375c-1.092 1.092-1.092 2.858 0 3.95l1.06 1.06c.546.546 1.432.546 1.978 0s.546-1.432 0-1.978l-1.06-1.06c-1.092-1.092-2.858-1.092-3.95 0zM16.5 16.5c1.092 1.092 1.092 2.858 0 3.95l-1.06 1.06c-.546.546-1.432.546-1.978 0s-.546-1.432 0-1.978l1.06-1.06c1.092-1.092 2.858-1.092 3.95 0zM12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-violet-400" style={{fontFamily: "'Lora', serif"}}>CECILIA</h1>
        <p className="text-lg text-gray-400 mt-2 italic">Your AI Project Guide</p>
      </header>
      
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto w-full">
        <section className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold text-gray-300" style={{fontFamily: "'Lora', serif"}}>The Harmonious Workflow</h2>
            {WORKFLOW_STAGES.map((stage, index) => (
                <WorkflowStage key={index} stage={stage} isInitiallyOpen={index === 0} />
            ))}
        </section>

        <section className="flex flex-col bg-gray-800 rounded-2xl shadow-lg border border-gray-700 h-[80vh] lg:h-auto">
          <div ref={chatContainerRef} className="flex-grow p-6 space-y-6 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.role === ChatRole.USER ? 'justify-end' : ''}`}>
                {msg.role === ChatRole.MODEL && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-900/50 flex items-center justify-center p-1 border border-violet-800">
                        <CeciliaIcon />
                    </div>
                )}
                <div className={`p-4 rounded-2xl max-w-md md:max-w-lg text-sm sm:text-base ${msg.role === ChatRole.USER ? 'bg-violet-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                  {renderMessageContent(msg.content)}
                  {isLoading && msg.role === ChatRole.MODEL && index === messages.length - 1 && (
                    <span className="inline-block w-2 h-2 ml-2 bg-violet-500 rounded-full animate-pulse"></span>
                  )}
                </div>
                 {msg.role === ChatRole.USER && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center p-1 border border-gray-500">
                        <UserIcon />
                    </div>
                )}
              </div>
            ))}
             {isLoading && messages.length > 0 && messages[messages.length - 1].role === ChatRole.USER && (
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-violet-900/50 flex items-center justify-center p-1 border border-violet-800">
                        <CeciliaIcon />
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-700 text-gray-300 rounded-bl-none">
                        <div className="flex items-center">
                            <span className="inline-block w-2 h-2 mr-2 bg-violet-500 rounded-full animate-ping"></span>
                            <span>Thinking, darling...</span>
                        </div>
                    </div>
                </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-800/80 backdrop-blur-sm rounded-b-2xl sticky bottom-0">
            <div className="flex items-center space-x-3">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Tell me about your project, darling..."
                    className="flex-grow w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
                    disabled={isLoading}
                    aria-label="Chat input"
                />
                <button 
                    type="submit" 
                    className="bg-violet-600 text-white p-3 rounded-full hover:bg-violet-700 disabled:bg-violet-800 disabled:text-gray-400 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 transition-colors flex-shrink-0"
                    disabled={isLoading || !userInput.trim()}
                    aria-label="Send message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default App;