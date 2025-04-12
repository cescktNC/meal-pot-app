import { Meal } from "@/types";
import { SimpleGrid } from "@chakra-ui/react";
import MealCard from "./MealCard";

type Props = {
  meals: Meal[];
  loading: boolean;
};

function MainContent({ meals, loading }: Props) {
  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: "10px", md: "20px" }}>
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </SimpleGrid>
  );
}

export default MainContent;
