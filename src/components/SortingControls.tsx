import { useJobItemsContext } from "../lib/hooks";

export default function Sorting() {
  const { sortBy, handleSortChange } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => handleSortChange("relevant")}
        isActive={sortBy === "relevant"}
        text="Relevant"
      />
      <SortingButton
        onClick={() => handleSortChange("recent")}
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
