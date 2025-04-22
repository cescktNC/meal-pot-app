import { Flex } from "@chakra-ui/react";
import Letter from "./Letter";

type Props = {
  loading: boolean;
  selectedLetter: string | null;
  setCategoryAndLetter: (category: null, letter: string) => void;
};

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

function LetterButton({
  loading,
  selectedLetter,
  setCategoryAndLetter,
}: Props) {
  return (
    <Flex gap={2} mb={5} wrap="wrap" justifyContent="center">
      {alphabet.map((letter) => (
        <Letter
          key={letter}
          letter={letter}
          isDisabled={loading}
          selected={selectedLetter === letter}
          setCategoryAndLetter={setCategoryAndLetter}
        />
      ))}
    </Flex>
  );
}

export default LetterButton;
