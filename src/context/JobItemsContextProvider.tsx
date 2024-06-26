import { createContext, useCallback, useMemo, useState } from "react";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContextProps = {
  jobItems: JobItem[];
  isLoading: boolean;
  currentPage: number;
  sortBy: SortBy;
  noOfJobs: number;
  totalNoOfPages: number;
  jobItemsSortedAndSliced: JobItem[];
  handleChangePage: (direction: PageDirection) => void;
  handleSortChange: (sortBy: SortBy) => void;
};

type JobItemsContextProvider = {
  children: React.ReactNode;
};

export const JobItemsContext = createContext<JobItemsContextProps | null>(null);

export default function JobItemsContextProvider({ children }: JobItemsContextProvider) {
  // state
  const { debounceSearchText } = useSearchTextContext();
  const { jobItems, isLoading } = useSearchQuery(debounceSearchText);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");
  // dervied state
  const noOfJobs = jobItems.length;
  const totalNoOfPages = noOfJobs / RESULTS_PER_PAGE;
  const jobItemsSorted = useMemo(
    () =>
      [...jobItems].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else if (sortBy === "recent") {
          return a.daysAgo - b.daysAgo;
        }
        return 0;
      }),
    [jobItems, sortBy]
  );

  const jobItemsSortedAndSliced = useMemo(
    () => jobItemsSorted.slice((currentPage - 1) * RESULTS_PER_PAGE, currentPage * RESULTS_PER_PAGE),
    [currentPage, jobItemsSorted]
  );

  // handlers
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleSortChange = useCallback((sortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  }, []);

  const context = useMemo(
    () => ({
      jobItems,
      isLoading,
      currentPage,
      sortBy,
      noOfJobs,
      totalNoOfPages,
      jobItemsSortedAndSliced,
      handleChangePage,
      handleSortChange,
    }),
    [
      jobItems,
      isLoading,
      currentPage,
      sortBy,
      noOfJobs,
      totalNoOfPages,
      jobItemsSortedAndSliced,
      handleChangePage,
      handleSortChange,
    ]
  );

  return <JobItemsContext.Provider value={context}>{children}</JobItemsContext.Provider>;
}
