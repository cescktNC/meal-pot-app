import { Flex } from "@chakra-ui/react";
import Letter from "./Letter";

type Props = {
  selectedLetter: string;
  setSelectedLetter: (letter: string) => void;
};

const alphabet = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

function LetterButton({ selectedLetter, setSelectedLetter }: Props) {
  return (
    <Flex gap={2} mb={5} wrap="wrap" justifyContent="center">
      {alphabet.map((letter) => (
        <Letter
          key={letter}
          letter={letter}
          selected={selectedLetter === letter}
          onSelect={setSelectedLetter}
        />
      ))}
    </Flex>
  );
}

export default LetterButton;
