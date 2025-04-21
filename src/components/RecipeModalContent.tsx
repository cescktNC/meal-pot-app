import { MealDetails } from "@/types";
import {
  AspectRatio,
  Button,
  CloseButton,
  Dialog,
  Heading,
  Image,
  List,
} from "@chakra-ui/react";

type Props = {
  data: MealDetails;
};

const joinIngredients = (data: MealDetails) => {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ingredient !== "" && ingredient != null) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return ingredients;
};

function RecipeModalContent({ data }: Props) {
  const ingredients = joinIngredients(data);
  return (
    <>
      <Dialog.Header>
        <Dialog.Title>{data.strMeal}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <AspectRatio maxW="100%">
          <Image src={data.strMealThumb} alt={data.strMeal} rounded="lg" />
        </AspectRatio>

        <Heading mt={4} mb={2} size="md">
          Ingredients
        </Heading>

        <List.Root as="ol" listStyle="decimal" ml={6}>
          {ingredients.map((ingredient) => (
            <List.Item key={ingredient} mb={2} _marker={{ color: "inherit" }}>
              {ingredient}
            </List.Item>
          ))}
        </List.Root>

        <Dialog.Description
          mb="4"
          whiteSpace="pre-line"
          mt={4}
          color={"gray.solid"}
        >
          <p>{data.strInstructions}</p>
        </Dialog.Description>
      </Dialog.Body>

      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button>Close</Button>
        </Dialog.ActionTrigger>
      </Dialog.Footer>
      <Dialog.CloseTrigger asChild>
        <CloseButton size="sm" />
      </Dialog.CloseTrigger>
    </>
  );
}

export default RecipeModalContent;
