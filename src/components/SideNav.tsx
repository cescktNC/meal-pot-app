import { Category, MealCount } from "@/types";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";

// Importing images for categories
import beefIcon from "@/assets/images/beef.png";
import breakfastIcon from "@/assets/images/breakfast.png";
import chickenIcon from "@/assets/images/chicken.png";
import dessertIcon from "@/assets/images/dessert.png";
import goatIcon from "@/assets/images/goat.png";
import lambIcon from "@/assets/images/lamb.png";
import miscellaneousIcon from "@/assets/images/miscellaneous.png";
import pastaIcon from "@/assets/images/pasta.png";
import porkIcon from "@/assets/images/pork.png";
import seafoodIcon from "@/assets/images/seafood.png";
import sideIcon from "@/assets/images/side.png";
import starterIcon from "@/assets/images/starter.png";
import veganIcon from "@/assets/images/vegan.png";
import vegetarianIcon from "@/assets/images/vegetarian.png";

// Mapping category names to their respective icons
// This mapping is used to display the correct icon for each category in the UI
const categoriesIcons: Record<string, string> = {
  Beef: beefIcon,
  Breakfast: breakfastIcon,
  Chicken: chickenIcon,
  Dessert: dessertIcon,
  Goat: goatIcon,
  Lamb: lambIcon,
  Miscellaneous: miscellaneousIcon,
  Pasta: pastaIcon,
  Pork: porkIcon,
  Seafood: seafoodIcon,
  Side: sideIcon,
  Starter: starterIcon,
  Vegan: veganIcon,
  Vegetarian: vegetarianIcon,
};

const selectedProps = {
  outline: "2px solid orange",
};

type Props = {
  categories: Category[];
  mealsCount: MealCount;
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};

function SideNav({
  categories,
  mealsCount,
  loading,
  selectedCategory,
  setSelectedCategory,
}: Props) {
  console.log(loading);
  return loading ? (
    <SkeletonText
      noOfLines={8}
      gap="4"
      variant="shine"
      width="full"
      height="5"
    />
  ) : (
    <>
      <Heading fontWeight="bold" fontSize={18} color="gray.800" mb={4}>
        Categories
      </Heading>
      <ButtonGroup variant="ghost" w="100%">
        <Stack w="100%">
          {categories.map((category) => (
            <Button
              onClick={() => setSelectedCategory(category)}
              key={category.strCategory}
              justifyContent="flex-start"
              boxShadow="sm"
              rounded="sm"
              h="60px"
              _hover={{ bg: "gray.100" }}
              {...(selectedCategory.strCategory === category.strCategory &&
                selectedProps)}
            >
              <Image
                src={categoriesIcons[category.strCategory]}
                h="80%"
                maxH="60px"
                fit="cover"
                alt="category image"
              />
              <Flex direction="column" flex={1} align="flex-start" ml={3}>
                <Text fontSize={16} fontWeight="bold">
                  {category.strCategory}
                </Text>
                <Box fontSize={12} color="gray.400">
                  {mealsCount[category.strCategory] ?? 0} Meals
                </Box>
              </Flex>
            </Button>
          ))}
        </Stack>
      </ButtonGroup>
    </>
  );
}

export default SideNav;
