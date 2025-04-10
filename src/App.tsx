import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoriesResponse, Category, Meal, MealCount } from "./types";
import useHttpData from "./hooks/useHttpData";

const makeMealUrl = (category: Category) => {
  return `${import.meta.env.VITE_API_URL_MEALS_FILTERED_BY_CATEGORY}?c=${
    category.strCategory
  }`;
};

function App() {
  const apiUrlAllCategories = import.meta.env.VITE_API_URL_ALL_CATEGORIES;

  const [selectedCategory, setSelectedCategory] = useState<Category>({
    strCategory: "Beef",
  });

  const { loading, data: categories } =
    useHttpData<Category>(apiUrlAllCategories);
  const [mealsCount, setMealsCount] = useState<MealCount>({});

  // Fetching meals based on selected category
  useEffect(() => {
    if (!categories.length) return; // Check if data is empty

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMealsCount = async () => {
      const mealsCount: MealCount = {};
      try {
        await Promise.all(
          categories.map(async (category) => {
            const url = makeMealUrl(category);
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

  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem h="80px" colSpan={6} bg={"blue.500"}>
        <Header />
      </GridItem>
      <GridItem h="calc(100vh - 80px)" p={5} overflowY="auto">
        <SideNav
          categories={categories}
          mealsCount={mealsCount}
          loading={loading}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </GridItem>
      <GridItem colSpan={5} bg={"green.500"}>
        <MainContent />
      </GridItem>
    </Grid>
  );
}

export default App;
