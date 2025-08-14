"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DevToPost } from "@/components/blog/BlogCard";

interface AppContextType {
  posts: DevToPost[];
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType>({ posts: [], loading: true, error: null });

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<DevToPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {

        const response = await fetch("https://dev.to/api/articles?username=mdhassanpatwary");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setPosts(data);
        setError(null);
      } catch (err) {

        setError(err instanceof Error ? err.message : 'Failed to fetch articles');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <AppContext.Provider value={{ posts, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);