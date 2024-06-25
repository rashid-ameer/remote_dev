import { useState, useEffect, useContext } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchActiveJobItem, fetchJobItems } from "./api";
import { BookmarkContext } from "../context/BookmarkContextProvider";
import { JobItemExtended } from "./types";

export const useActiveJobItem = (id: number | null) => {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => (id ? fetchActiveJobItem(id) : null),
    enabled: !!id,
  });

  return { activeJobItem: data?.jobItem, isLoading: isInitialLoading } as const;
};

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchActiveJobItem(id),
    })),
  });

  const jobItems: JobItemExtended[] = results
    .map((result) => result.data?.jobItem)
    .filter((jobItem): jobItem is JobItemExtended => jobItem !== undefined);

  const isLoading = results.some((result) => result.isLoading);

  return [jobItems, isLoading] as const;
}

export function useSearchQuery(searchText: string) {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchJobItems(searchText),
    enabled: !!searchText,
  });

  return { jobItems: data?.jobItems || [], isLoading: isInitialLoading } as const;
}

export function useActiveJobId() {
  const [activeJobId, setActiveJobId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = window.location.hash.slice(1);
      setActiveJobId(parseInt(id, 10));
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeJobId;
}

export function useDebounce<T>(value: T, delay = 250): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(intervalId);
    };
  }, [value, delay]);

  return debounceValue;
}

export function useBookmarkContext() {
  const context = useContext(BookmarkContext);

  if (!context) {
    throw new Error("useBookmarkContext must be used within a BookmarkContextProvider");
  }

  return context;
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
