import {
  CategoriesResponse,
  Category,
  Meal,
  MealCount,
  SearchFilterProps,
  SearchForm,
} from "@/types";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import useHttpData from "./useHttpData";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const makeMealUrl = (
  category: Category | null,
  letter: string | null,
  mealName: SearchForm | null,
  area: string
) => {
  if (letter) {
    return `${baseUrl}${import.meta.env.VITE_API_URL_MEAL_BY_LETTER}${letter}`;
  }

  if (mealName?.search) {
    return `${baseUrl}${import.meta.env.VITE_API_URL_MEAL_BY_NAME}${
      mealName.search
    }`;
  }

  if (area !== "Select the country") {
    return `${baseUrl}${import.meta.env.VITE_API_URL_MEAL_BY_AREA}${area}`;
  }

  return `${baseUrl}${import.meta.env.VITE_API_URL_MEALS_FILTERED_BY_CATEGORY}${
    category?.strCategory
  }`;
};

export function useRecipeFilters(
  form: UseFormReturn<SearchForm>,
  categories: Category[] | undefined
) {
  // Estados
  const [mealsCount, setMealsCount] = useState<MealCount>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>({
    strCategory: "Beef",
  });
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] =
    useState<string>("Select the country");
  const [searchForm, setSearchForm] = useState<SearchForm | null>(null);

  // Obtener datos basados en los filtros
  const {
    loading: loadingMeal,
    data: dataMeal,
    setData: setDataMeal,
  } = useHttpData<Meal>(
    makeMealUrl(selectedCategory, selectedLetter, searchForm, selectedArea)
  );

  // Función para actualizar los filtros
  const updateSearchFilters = ({
    category = null,
    letter = null,
    mealName = null,
    area = "Select the country",
  }: SearchFilterProps) => {
    setSelectedCategory(category);
    setSelectedLetter(letter);
    setSearchForm(mealName);
    setSelectedArea(area);

    form.setValue("search", mealName?.search || "");
  };

  // Handlers específicos
  const handleNameSubmit = (mealName: SearchForm) =>
    mealName.search === ""
      ? setDataMeal([])
      : updateSearchFilters({ mealName });

  const handleAreaChange = (area: string) =>
    area === "Select the country"
      ? setDataMeal([])
      : updateSearchFilters({ area });

  // Efecto para obtener el conteo de comidas por categoría
  useEffect(() => {
    if (!categories || !categories.length) return; // Check if data is empty

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMealsCount = async () => {
      const mealsCount: MealCount = {};
      try {
        await Promise.all(
          categories.map(async (category) => {
            const url = makeMealUrl(category, null, searchForm, selectedArea);
            const { data } = await axios.get<CategoriesResponse>(url, {
              signal,
            });
            mealsCount[category.strCategory] = data.meals.length;
          })
        );
        setMealsCount(mealsCount);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching meals count:", error);
        }
      }
    };

    fetchMealsCount();
    return () => controller.abort(); // Cleanup function to abort the request
  }, [categories]);

  return {
    // Estados
    mealsCount,
    selectedCategory,
    selectedLetter,
    selectedArea,
    searchForm,

    // Datos y carga
    dataMeal,
    loadingMeal,
    setDataMeal,

    // Funciones
    updateSearchFilters,
    handleNameSubmit,
    handleAreaChange,
  };
}
