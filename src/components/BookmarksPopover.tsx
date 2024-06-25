import { useBookmarkContext } from "../lib/hooks";
import { JobList } from "./";

export default function BookmarksPopover() {
  const { bookmarkJobItems, isLoading } = useBookmarkContext();

  return (
    <div className="bookmarks-popover">
      <JobList
        jobItems={bookmarkJobItems}
        isLoading={isLoading}
      />
    </div>
  );
}
