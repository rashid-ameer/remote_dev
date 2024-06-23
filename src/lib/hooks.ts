import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveJobItem, fetchJobItems } from "./api";

export const useActiveJobItem = (id: number | null) => {
  const { data, isInitialLoading } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => (id ? fetchActiveJobItem(id) : null),
    enabled: !!id,
  });

  return { activeJobItem: data?.jobItem, isLoading: isInitialLoading } as const;
};

export function useJobItems(searchText: string) {
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
