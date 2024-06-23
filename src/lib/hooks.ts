import { useState, useEffect } from "react";
import { JobItem, JobItemExtended } from "./types";
import { BASE_API_URL } from "./constants";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const noOfJobs = jobItems.length;

  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) {
      return;
    }

    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}?search=${searchText}`);
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        setJobItems(data.jobItems);
      } catch {
        console.log("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [searchText]);

  return [jobItemsSliced, isLoading, noOfJobs] as const;
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

export const useActiveJobItem = (id: number | null) => {
  const [activeJobItem, setActiveJobItem] = useState<JobItemExtended | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJobItem = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_API_URL}/${id}`);
        if (!res.ok) {
          throw new Error();
        }
        const data = await res.json();
        setActiveJobItem(data.jobItem);
      } catch {
        console.log("Error in useActiveJobItem");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobItem();
  }, [id]);

  return [activeJobItem, isLoading] as const;
};

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
