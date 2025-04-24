import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import CategoryAndLetterContext from "../contexts/CategoryAndLetterContext";

type Props = {
  letter: string;
  isDisabled: boolean;
  selected: boolean;
};

const selectedProps = {
  bg: "orange.solid",
  color: "white",
};

function Letter({ letter, isDisabled, selected }: Props) {
  const { updateSearchFilters } = useContext(CategoryAndLetterContext);

  return (
    <Button
      onClick={() => updateSearchFilters({ letter })}
      border="2px solid"
      borderColor="orange.solid"
      bg="orange.muted"
      color="orange.solid"
      fontWeight="bold"
      fontSize="16px"
      px={0}
      size="sm"
      rounded="sm"
      disabled={isDisabled}
      _hover={{ bg: "orange.solid", color: "white" }}
      {...(selected && selectedProps)}
    >
      {letter}
    </Button>
  );
}

export default Letter;
