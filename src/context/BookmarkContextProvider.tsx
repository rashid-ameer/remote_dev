import { createContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemExtended } from "../lib/types";

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
    } else {
      setBookmarkIds((prev) => [...prev, id]);
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
