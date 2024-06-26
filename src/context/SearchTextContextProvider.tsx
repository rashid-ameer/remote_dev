import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContextProps = {
  searchText: string;
  debounceSearchText: string;
  handleSearchTextChange: (searchText: string) => void;
};

type SearchTextContextProviderProps = {
  children: React.ReactNode;
};

export const SearchTextContext = createContext<SearchTextContextProps | null>(null);

export default function SearchTextContextProvider({ children }: SearchTextContextProviderProps) {
  const [searchText, setSearchText] = useState<string>("");
  const debounceSearchText = useDebounce(searchText);

  const handleSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
  };

  return (
    <SearchTextContext.Provider value={{ searchText, debounceSearchText, handleSearchTextChange }}>
      {children}
    </SearchTextContext.Provider>
  );
}
