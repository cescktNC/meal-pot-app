import { Meal } from "@/types";
import { Button, Card, Image } from "@chakra-ui/react";

type Props = { meal: Meal };

function MealCard({ meal }: Props) {
  return (
    <Card.Root maxW="sm" boxShadow="lg" overflow="hidden">
      <Image src={meal.strMealThumb} alt={meal.strMeal} p={5} />
      <Card.Body pt={0} pb={0}>
        <Card.Title>{meal.strMeal}</Card.Title>
      </Card.Body>
      <Card.Footer mt={5}>
        <Button variant="solid" bgColor="orange.600">
          Show recipe
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

export default MealCard;
