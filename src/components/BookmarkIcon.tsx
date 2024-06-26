import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../lib/hooks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkIds, toggleBookmarkId } = useBookmarkContext();

  return (
    <button
      className="bookmark-btn"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleBookmarkId(id);
      }}>
      <BookmarkFilledIcon className={bookmarkIds.includes(id) ? "filled" : ""} />
    </button>
  );
}
