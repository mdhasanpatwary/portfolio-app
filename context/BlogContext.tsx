"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DevToPost } from "@/components/blog/BlogCard";
import blogData from "@/data/blog.json";

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
    const loadPosts = async () => {
      try {
        // Use local blog data instead of external API
        const data = blogData.posts;
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog articles');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <AppContext.Provider value={{ posts, loading, error }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);