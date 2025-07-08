"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { DevToPost } from "@/components/blog/BlogCard";

interface AppContextType {
  posts: DevToPost[];
  loading: boolean;
}

const AppContext = createContext<AppContextType>({ posts: [], loading: true });

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<DevToPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=mdhassanpatwary")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AppContext.Provider value={{ posts, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);