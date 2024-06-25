import { SortBy } from "../lib/types";

type SortingProps = {
  sortBy: SortBy;
  onClick: (sortBy: SortBy) => void;
};
export default function Sorting({ sortBy, onClick }: SortingProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => onClick("relevant")}
        isActive={sortBy === "relevant"}
        text="Relevant"
      />
      <SortingButton
        onClick={() => onClick("recent")}
        isActive={sortBy === "recent"}
        text="Recent"
      />
    </section>
  );
}

type SortingButtonProps = {
  onClick: () => void;
  isActive: boolean;
  text: string;
};

function SortingButton({ text, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--relevant ${isActive ? "sorting__button--active" : ""}`}>
      {text}
    </button>
  );
}
