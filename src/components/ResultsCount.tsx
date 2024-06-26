import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { noOfJobs } = useJobItemsContext();
  return (
    <p className="count">
      <span className="u-bold">{noOfJobs}</span> results
    </p>
  );
}
