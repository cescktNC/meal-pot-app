import { Meal, MealDetails } from "@/types";
import useFetch from "./useFetch";
import { useState } from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrlMealById = `${baseUrl}${import.meta.env.VITE_API_URL_MEAL_BY_ID}`;

export function useRecipeDetails() {
  // Estado para manejar la apertura y cierre del modal
  const [isOpen, setIsOpen] = useState(false);

  // Obtener detalles de la receta
  const {
    loading: loadingMealDetails,
    data: mealDetailData,
    error: errorMealDetails,
    fetch,
  } = useFetch<MealDetails>();

  // Función para buscar detalles de una receta y abrir el modal
  const searchMealDetails = (meal: Meal) => {
    setIsOpen(true);
    fetch(`${apiUrlMealById}${meal.idMeal}`, {
      onNotFound: "The selected recipe was not found.",
      onError: "Server error. Please try again later.",
    });
  };

  return {
    isOpen,
    setIsOpen,
    mealDetailData,
    errorMealDetails,
    loadingMealDetails,
    searchMealDetails,
  };
}
