import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { Category, SearchForm } from "./types";
import useHttpData from "./hooks/useHttpData";
import LetterButton from "./components/LetterButton";
import RecipeModal from "./components/RecipeModal";
import CategoryAndLetterContext from "./contexts/CategoryAndLetterContext";
import { useForm } from "react-hook-form";
import { useRecipeFilters } from "./hooks/useRecipeFilters";
import { useRecipeDetails } from "./hooks/useRecipeDetails";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiUrlAllCategories = `${baseUrl}${
  import.meta.env.VITE_API_URL_ALL_CATEGORIES
}`;

function App() {
  // Hook para manejar el formulario de búsqueda
  const form = useForm<SearchForm>();

  // Obtener categorías
  const { loading, data: categories } =
    useHttpData<Category>(apiUrlAllCategories);

  // Hook personalizado para manejar filtros y búsquedas
  const {
    mealsCount,
    selectedCategory,
    selectedLetter,
    selectedArea,
    dataMeal,
    loadingMeal,
    updateSearchFilters,
    handleNameSubmit,
    handleAreaChange,
  } = useRecipeFilters(form, categories);

  // Hook personalizado para manejar detalles de recetas y modal
  const {
    isOpen,
    setIsOpen,
    mealDetailData,
    errorMealDetails,
    loadingMealDetails,
    searchMealDetails,
  } = useRecipeDetails();

  return (
    <CategoryAndLetterContext.Provider
      value={{
        selectedCategory,
        selectedLetter,
        selectedArea,
        updateSearchFilters,
      }}
    >
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
            form={form}
            onSubmit={handleNameSubmit}
            onChange={handleAreaChange}
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
          />
        </GridItem>
        <GridItem colSpan={5} p={5} bgColor="gray.100">
          <LetterButton loading={loadingMeal} />
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
    </CategoryAndLetterContext.Provider>
  );
}

export default App;
