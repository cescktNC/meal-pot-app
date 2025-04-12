import { Button } from "@chakra-ui/react";

type Props = {
  letter: string;
  selected: boolean;
  onSelect: (letter: string) => void;
};

const selectedProps = {
  bg: "orange.600",
  color: "white",
};

function Letter({ letter, selected, onSelect }: Props) {
  return (
    <Button
      onClick={() => onSelect(letter)}
      border="2px solid"
      borderColor="orange.600"
      bg="orange.200"
      color="orange.600"
      fontWeight="bold"
      fontSize="16px"
      px={0}
      size="sm"
      rounded="sm"
      _hover={{ bg: "orange.600", color: "white" }}
      {...(selected && selectedProps)}
    >
      {letter}
    </Button>
  );
}

export default Letter;
