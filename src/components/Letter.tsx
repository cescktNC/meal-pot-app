import { Button } from "@chakra-ui/react";

type Props = {
  letter: string;
  isDisabled: boolean;
  selected: boolean;
  onSelect: (letter: string) => void;
};

const selectedProps = {
  bg: "orange.solid",
  color: "white",
};

function Letter({ letter, isDisabled, selected, onSelect }: Props) {
  return (
    <Button
      onClick={() => onSelect(letter)}
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
