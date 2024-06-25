import { useState } from "react";
import {
  Background,
  BookmarksButton,
  Container,
  Footer,
  Header,
  HeaderTop,
  JobItemContent,
  JobList,
  Logo,
  PaginationControls,
  ResultsCount,
  SearchForm,
  Sidebar,
  SidebarTop,
  SortingControls,
} from "./";
import { useDebounce, useSearchQuery } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { PageDirection, SortBy } from "../lib/types";

function App() {
  // state
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");
  const debounceSearchText = useDebounce(searchText);
  const { jobItems, isLoading } = useSearchQuery(debounceSearchText);
  // dervied state
  const noOfJobs = jobItems.length;
  const totalNoOfPages = noOfJobs / RESULTS_PER_PAGE;
  const jobItemsSorted = [...jobItems].sort((a, b) => {
    if (sortBy === "relevant") {
      return b.relevanceScore - a.relevanceScore;
    } else if (sortBy === "recent") {
      return a.daysAgo - b.daysAgo;
    }
    return 0;
  });

  const jobItemsSlicedAndSorted = jobItemsSorted.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  // handlers
  const handleChangePage = (direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortChange = (sortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(sortBy);
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount count={noOfJobs} />
            <SortingControls
              onClick={handleSortChange}
              sortBy={sortBy}
            />
          </SidebarTop>

          <JobList
            jobItems={jobItemsSlicedAndSorted}
            isLoading={isLoading}
          />
          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
            totalNoOfPages={totalNoOfPages}
          />
        </Sidebar>

        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
