import { useActiveJobId } from "../lib/hooks";
import { JobItem } from "../lib/types";
import { JobListItem, Spinner } from "./";

type JobListProps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  const activeJobId = useActiveJobId();

  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeJobId}
          />
        ))
      )}
    </ul>
  );
}

export default JobList;
