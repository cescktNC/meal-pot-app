import { Flex } from "@chakra-ui/react";
import Letter from "./Letter";
import { useContext } from "react";
import CategoryAndLetterContext from "./contexts/CategoryAndLetterContext";

type Props = {
  loading: boolean;
};

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

function LetterButton({ loading }: Props) {
  const { selectedLetter } = useContext(CategoryAndLetterContext);

  return (
    <Flex gap={2} mb={5} wrap="wrap" justifyContent="center">
      {alphabet.map((letter) => (
        <Letter
          key={letter}
          letter={letter}
          isDisabled={loading}
          selected={selectedLetter === letter}
        />
      ))}
    </Flex>
  );
}

export default LetterButton;
