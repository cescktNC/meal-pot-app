export type Category = {
  strCategory: string;
};

// This is the type for the meal object returned from the API
export type CategoriesResponse = {
  meals: Category[];
};

export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type MealCount = {
  [key: string]: number;
};
