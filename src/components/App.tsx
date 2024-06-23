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
import { useDebounce, useJobItems } from "../lib/hooks";

function App() {
  // state
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const debounceSearchText = useDebounce(searchText);
  const { jobItems, isLoading } = useJobItems(debounceSearchText);
  // dervied state
  const noOfJobs = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  // handlers
  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
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
            <SortingControls />
          </SidebarTop>

          <JobList
            jobItems={jobItemsSliced}
            isLoading={isLoading}
          />
          <PaginationControls
            currentPage={currentPage}
            onClick={handleChangePage}
          />
        </Sidebar>

        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
