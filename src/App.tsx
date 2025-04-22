import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CategoriesResponse,
  Category,
  Meal,
  MealCount,
  MealDetails,
} from "./types";
import useHttpData from "./hooks/useHttpData";
import LetterButton from "./components/LetterButton";
import RecipeModal from "./components/RecipeModal";
import useFetch from "./hooks/useFetch";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrlAllCategories = `${baseUrl}${
  import.meta.env.VITE_API_URL_ALL_CATEGORIES
}`;
const apiUrlMealById = `${baseUrl}${import.meta.env.VITE_API_URL_MEAL_BY_ID}`;

const makeMealUrl = (category: Category | null, letter: string | null) => {
  if (letter) {
    return `${baseUrl}${import.meta.env.VITE_API_URL_MEAL_BY_LETTER}${letter}`;
  }

  return `${baseUrl}${import.meta.env.VITE_API_URL_MEALS_FILTERED_BY_CATEGORY}${
    category?.strCategory
  }`;
};

function App() {
  const [mealsCount, setMealsCount] = useState<MealCount>({});
  const [selectedCategory, setSelectedCategory] = useState<Category | null>({
    strCategory: "Beef",
  });
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { loading, data: categories } =
    useHttpData<Category>(apiUrlAllCategories);

  const {
    loading: loadingMeal,
    data: dataMeal,
    setData: setDataMeal,
    fetchMealsByName,
    fetchMealsByArea,
  } = useHttpData<Meal>(makeMealUrl(selectedCategory, selectedLetter));

  const {
    loading: loadingMealDetails,
    data: mealDetailData,
    error: errorMealDetails,
    fetch,
  } = useFetch<MealDetails>();

  // Fetching meals based on selected category
  useEffect(() => {
    if (!categories || !categories.length) return; // Check if data is empty

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMealsCount = async () => {
      const mealsCount: MealCount = {};
      try {
        await Promise.all(
          categories.map(async (category) => {
            const url = makeMealUrl(category, null);
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

  // Fetch a meal by its ID
  // This function is called when the user clicks on a meal to view its details
  // It sets the modal to open and fetches the meal details
  // It also handles errors and loading states
  // The fetch function is passed as a prop to the RecipeModal component
  // The RecipeModal component is responsible for displaying the meal details
  // and handling the modal state
  // The fetch function is called with the meal ID and the modal is opened
  // The modal is closed when the user clicks the close button or outside the modal
  // The modal is also closed when the user clicks the close button or outside the modal
  const searchMealDetails = (meal: Meal) => {
    setIsOpen(true);
    fetch(`${apiUrlMealById}${meal.idMeal}`, {
      onNotFound: "The selected recipe was not found.",
      onError: "Server error. Please try again later.",
    });
  };

  const setCategoryAndLetter = (
    category: Category | null,
    letter: string | null
  ) => {
    setSelectedCategory(category);
    setSelectedLetter(letter);
  };

  return (
    <>
      <Grid templateColumns="repeat(6, 1fr)">
        <GridItem
          pos="sticky"
          top="0"
          left="0"
          zIndex={1}
          h="80px"
          colSpan={6}
          bg={"white"}
          boxShadow="lg"
          p={5}
        >
          <Header
            setCategoryAndLetter={setCategoryAndLetter}
            onSubmit={(mealName) => {
              mealName.search === ""
                ? setDataMeal([])
                : fetchMealsByName(mealName);
            }}
            onChange={(area) =>
              area === "Select the country"
                ? setDataMeal([])
                : fetchMealsByArea(area)
            }
          />
        </GridItem>
        <GridItem
          pos="sticky"
          top="80px"
          left="0"
          h="calc(100vh - 80px)"
          p={5}
          overflowY="auto"
        >
          <SideNav
            categories={categories}
            mealsCount={mealsCount}
            loading={loading}
            selectedCategory={selectedCategory}
            setCategoryAndLetter={setCategoryAndLetter}
          />
        </GridItem>
        <GridItem colSpan={5} p={5} bgColor="gray.100">
          <LetterButton
            loading={loadingMeal}
            selectedLetter={selectedLetter}
            setCategoryAndLetter={setCategoryAndLetter}
          />
          <MainContent
            openRecipe={searchMealDetails}
            meals={dataMeal}
            loading={loadingMeal}
          />
        </GridItem>
      </Grid>
      <RecipeModal
        data={mealDetailData}
        error={errorMealDetails}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        loading={loadingMealDetails}
      />
    </>
  );
}

export default App;
