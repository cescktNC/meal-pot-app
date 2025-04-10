import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoriesResponse, Category, Meal, MealCount } from "./types";

function App() {
  const apiUrlAllCategories = import.meta.env.VITE_API_URL_ALL_CATEGORIES;
  const [data, setData] = useState<Category[]>([]);
  const [mealsCount, setMealsCount] = useState<MealCount>({});
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    strCategory: "Beef",
  });

  // Fetching all categories from the API
  useEffect(() => {
    const controller = new AbortController(); // Create a new AbortController instance
    const signal = controller.signal; // Get the signal from the controller
    setLoading(true);
    axios
      .get<CategoriesResponse>(apiUrlAllCategories, { signal }) // Pass the signal to the request
      .then(({ data }) => setData(data.meals))
      .finally(() => setLoading(false));

    return () => controller.abort(); // Cleanup function to abort the request
  }, []);

  // Fetching meals based on selected category
  useEffect(() => {
    if (!data.length) return; // Check if data is empty

    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    const fetchMealsCount = async () => {
      const url = import.meta.env.VITE_API_URL_FILTERED_BY_CATEGORY;
      try {
        let counts: MealCount = {};
        await Promise.all(
          data.map(async (category) => {
            const { data } = await axios.get<CategoriesResponse>(url, {
              params: { c: category.strCategory },
              signal,
            });
            counts[category.strCategory] = data.meals.length;
          })
        );
        setMealsCount(counts);
      } catch (error) {
        console.error("Error al obtener el número de meals:", error);
      }
    };

    fetchMealsCount();
    setLoading(false);

    return () => controller.abort(); // Cleanup function to abort the request
  }, [data]);

  return (
    <Grid templateColumns="repeat(6, 1fr)">
      <GridItem h="80px" colSpan={6} bg={"blue.500"}>
        <Header />
      </GridItem>
      <GridItem h="calc(100vh - 80px)" p={5} overflowY="auto">
        <SideNav
          categories={data}
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
