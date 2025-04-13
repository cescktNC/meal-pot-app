import { Flex } from "@chakra-ui/react";
import Letter from "./Letter";

type Props = {
  loading: boolean;
  selectedLetter: string;
  setSelectedLetter: (letter: string) => void;
};

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

function LetterButton({ loading, selectedLetter, setSelectedLetter }: Props) {
  return (
    <Flex gap={2} mb={5} wrap="wrap" justifyContent="center">
      {alphabet.map((letter) => (
        <Letter
          key={letter}
          letter={letter}
          isDisabled={loading}
          selected={selectedLetter === letter}
          onSelect={setSelectedLetter}
        />
      ))}
    </Flex>
  );
}

export default LetterButton;
