import { useState, useEffect, useCallback } from "react";

export interface Task {
  id: string;
  title: string;
  hours: number;
  proofLink: string;
  completed: boolean;
}

export interface AnalysisData {
  jobTitle: string;
  skillsFound: string[];
  skillGaps: string[];
  tasks: Task[];
  matchPercentage: number;
}

export interface SearchHistoryEntry {
  id: string;
  jobTitle: string;
  jobDescriptionSnippet: string;
  matchPercentage: number;
  createdAt: string;
  analysisData: AnalysisData;
}

const HISTORY_STORAGE_KEY = "careerhq_search_history";

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse search history:", e);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  const saveHistory = useCallback((newHistory: SearchHistoryEntry[]) => {
    setHistory(newHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
  }, []);

  const addEntry = useCallback((jobDescription: string, analysisData: AnalysisData) => {
    // Extract job title from the first line or first few words
    const lines = jobDescription.trim().split('\n');
    const firstLine = lines[0] || "Untitled Position";
    const jobTitle = firstLine.length > 50 ? firstLine.substring(0, 50) + "..." : firstLine;
    
    // Create a snippet from the job description
    const fullText = jobDescription.trim();
    const jobDescriptionSnippet = fullText.length > 150 
      ? fullText.substring(0, 150) + "..." 
      : fullText;

    const newEntry: SearchHistoryEntry = {
      id: Date.now().toString(),
      jobTitle,
      jobDescriptionSnippet,
      matchPercentage: analysisData.matchPercentage,
      createdAt: new Date().toISOString(),
      analysisData,
    };

    saveHistory([newEntry, ...history]);
  }, [history, saveHistory]);

  const deleteEntry = useCallback((id: string) => {
    const newHistory = history.filter(entry => entry.id !== id);
    saveHistory(newHistory);
  }, [history, saveHistory]);

  const updateEntryProgress = useCallback((id: string, tasks: Task[]) => {
    const newHistory = history.map(entry => {
      if (entry.id === id) {
        // Recalculate match percentage based on completed tasks
        const completedCount = tasks.filter(t => t.completed).length;
        const baseMatch = 68;
        const newMatchPercentage = baseMatch + Math.round((completedCount / tasks.length) * 32);
        
        return {
          ...entry,
          matchPercentage: newMatchPercentage,
          analysisData: {
            ...entry.analysisData,
            tasks,
            matchPercentage: newMatchPercentage,
          },
        };
      }
      return entry;
    });
    saveHistory(newHistory);
  }, [history, saveHistory]);

  return {
    history,
    addEntry,
    deleteEntry,
    updateEntryProgress,
  };
}
