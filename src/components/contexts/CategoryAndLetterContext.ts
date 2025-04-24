import { createContext } from "react";
import { Category, CategoryAndLetterProps } from "@/types";

type CategoryAndLetterContextType = {
  selectedCategory: Category | null;
  selectedLetter: string | null;
  selectedArea: string;
  setCategoryAndLetter: (props: CategoryAndLetterProps) => void;
};

export default createContext<CategoryAndLetterContextType>(
  {} as CategoryAndLetterContextType
);
