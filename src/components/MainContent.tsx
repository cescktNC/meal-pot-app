import { Meal } from "@/types";
import { Center, Heading, Highlight, SimpleGrid } from "@chakra-ui/react";
import MealCard from "./MealCard";
import SkeletonCard from "./SkeletonCard";

type Props = {
  meals: Meal[];
  loading: boolean;
  openRecipe: (meal: Meal) => void;
};

function MainContent({ meals, loading, openRecipe }: Props) {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <SimpleGrid
        columns={{ base: 2, md: 4 }}
        gap={{ base: "10px", md: "20px" }}
      >
        {loading &&
          skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}
        {!loading &&
          meals.length > 0 &&
          meals.map((meal) => (
            <MealCard
              openRecipe={() => openRecipe(meal)}
              key={meal.idMeal}
              meal={meal}
            />
          ))}
      </SimpleGrid>
      {!loading && meals.length === 0 && (
        <Center mt={100}>
          <Heading lineHeight="tall">
            <Highlight
              query={["category", "search term", "country"]}
              styles={{ px: "0.5", bg: "orange.muted" }}
            >
              Oops! We couldn’t find any recipes. Try selecting a category,
              typing a search term, or choosing a country.
            </Highlight>
          </Heading>
        </Center>
      )}
    </>
  );
}

export default MainContent;
