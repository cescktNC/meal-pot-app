// ─── Category ─────────────────────────────
export type Category = {
  strCategory: string;
};

export type CategoriesResponse = {
  meals: Meal[];
};

// ─── Meals ────────────────────────────────
export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type MealCount = {
  [key: string]: number;
};

export type MealDetails = {
  [key: string]: string;
};

// ─── Forms ────────────────────────────────
export type SearchForm = {
  search: string;
};

// ─── Context Props ────────────────────────
export type SearchFilterProps = {
  category?: Category | null;
  letter?: string | null;
  mealName?: SearchForm | null;
  area?: string;
};
