import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemExtended } from "../lib/types";
import toast from "react-hot-toast";

type PropsBookmarkContext = {
  bookmarkIds: number[];
  toggleBookmarkId: (id: number) => void;
  bookmarkJobItems: JobItemExtended[];
  isLoading: boolean;
} | null;

type PropsBookmarkContextProvider = {
  children: React.ReactNode;
};

export const BookmarkContext = createContext<PropsBookmarkContext>(null);

function BookmarkContextProvider({ children }: PropsBookmarkContextProvider) {
  const [bookmarkIds, setBookmarkIds] = useLocalStorage<number[]>("bookmarkIds", []);

  const [bookmarkJobItems, isLoading] = useJobItems(bookmarkIds);

  const toggleBookmarkId = (id: number) => {
    if (bookmarkIds.includes(id)) {
      setBookmarkIds((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
      toast.success("Bookmark removed");
    } else {
      setBookmarkIds((prev) => [...prev, id]);
      toast.success("Bookmark added");
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkIds,
        toggleBookmarkId,
        bookmarkJobItems,
        isLoading,
      }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkContextProvider;
