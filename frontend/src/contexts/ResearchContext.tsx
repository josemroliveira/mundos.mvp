import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ResearchBlock {
  id: number;
  content: string;
  source: string;
  comments: Comment[];
}

interface Comment {
  user: string;
  content: string;
  expertise: number;
  type: 'question' | 'hypothesis';
}

interface ResearchContextType {
  researchBlocks: ResearchBlock[];
  addResearchBlock: (block: Omit<ResearchBlock, 'id'>) => void;
  addComment: (blockId: number, comment: Omit<Comment, 'user'>) => void;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [researchBlocks, setResearchBlocks] = useState<ResearchBlock[]>([
    { 
      id: 1, 
      content: "EdTech market in Brazil expected to reach $3.6 billion by 2025", 
      source: "https://www.example.com/edtech-market-report",
      comments: [
        { user: "Ana", content: "This aligns with our growth projections for the sector.", expertise: 5, type: "hypothesis" },
        { user: "Pedro", content: "How does this compare to other emerging markets?", expertise: 3, type: "question" }
      ]
    },
    { 
      id: 2, 
      content: "70% of Brazilian schools plan to implement more digital learning tools in the next 12 months", 
      source: "https://www.example.com/digital-learning-survey",
      comments: []
    },
  ]);

  const addResearchBlock = (block: Omit<ResearchBlock, 'id'>) => {
    setResearchBlocks(prev => [...prev, { ...block, id: prev.length + 1 }]);
  };

  const addComment = (blockId: number, comment: Omit<Comment, 'user'>) => {
    setResearchBlocks(prev => prev.map(block => 
      block.id === blockId 
        ? { ...block, comments: [...block.comments, { ...comment, user: "You" }] }
        : block
    ));
  };

  return (
    <ResearchContext.Provider value={{ researchBlocks, addResearchBlock, addComment }}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
};