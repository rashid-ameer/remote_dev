import { forwardRef } from "react";
import { useBookmarkContext } from "../lib/hooks";
import { JobList } from "./";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkJobItems, isLoading } = useBookmarkContext();

  return (
    <div
      ref={ref}
      className="bookmarks-popover">
      <JobList
        jobItems={bookmarkJobItems}
        isLoading={isLoading}
      />
    </div>
  );
});

export default BookmarksPopover;
