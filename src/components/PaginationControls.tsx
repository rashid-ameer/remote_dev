import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";

type PaginationControlsProps = {
  onClick: (direction: PageDirection) => void;
  currentPage: number;
  totalNoOfPages: number;
};

export default function PaginationControls({ onClick, currentPage, totalNoOfPages }: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          direction="previous"
          currentPage={currentPage}
          onClick={() => onClick("previous")}
        />
      )}

      {currentPage < totalNoOfPages && (
        <PaginationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => onClick("next")}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={onClick}>
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}

      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
