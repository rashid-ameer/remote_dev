type ResultsCountProps = {
  count: number;
};

export default function ResultsCount({ count }: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{count}</span> results
    </p>
  );
}
