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
  const [searchText, setSearchText] = useState<string>("");
  const debounceSearchText = useDebounce(searchText);
  const [jobItemsSliced, isLoading, noOfJobs] = useJobItems(debounceSearchText);

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
          <PaginationControls />
        </Sidebar>

        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
