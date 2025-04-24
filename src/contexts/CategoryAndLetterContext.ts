import { createContext } from "react";
import { Category, SearchFilterProps } from "@/types";

type CategoryAndLetterContextType = {
  selectedCategory: Category | null;
  selectedLetter: string | null;
  selectedArea: string;
  updateSearchFilters: (props: SearchFilterProps) => void;
};

export default createContext<CategoryAndLetterContextType>(
  {} as CategoryAndLetterContextType
);
