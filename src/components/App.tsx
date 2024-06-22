import { useEffect, useState } from "react";
import {
  Background,
  Container,
  Footer,
  Header,
  HeaderTop,
  JobItemContent,
  JobList,
  PaginationControls,
  SearchForm,
  Sidebar,
  SidebarTop,
} from "./";

function App() {
  const [searchText, setSearchText] = useState<string>("");
  const [jobItems, setJobItems] = useState([]);

  useEffect(() => {
    if (!searchText) {
      return;
    }

    const fetchJobs = async () => {
      const res = await fetch(`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`);
      const data = await res.json();
      setJobItems(data.jobItems);
    };

    fetchJobs();
  }, [searchText]);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop />

        <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop />
          <JobList jobItems={jobItems} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
