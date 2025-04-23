import { createContext } from "react";
import { Category } from "@/types";

type CategoryAndLetterContextType = {
  selectedCategory: Category | null;
  selectedLetter: string | null;
  setCategoryAndLetter: (
    category: Category | null,
    letter: string | null
  ) => void;
};

export default createContext<CategoryAndLetterContextType>(
  {} as CategoryAndLetterContextType
);
