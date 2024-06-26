import { JobList } from ".";
import { useJobItemsContext } from "../lib/hooks";

function JobListSearch() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();
  return (
    <JobList
      jobItems={jobItemsSortedAndSliced}
      isLoading={isLoading}
    />
  );
}
export default JobListSearch;
