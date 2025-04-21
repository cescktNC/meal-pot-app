import { Button, CloseButton, Dialog } from "@chakra-ui/react";

type Props = {
  error: string | null;
};

function AlertModalContent({ error }: Props) {
  return (
    <>
      <Dialog.Header>
        <Dialog.Title>Error</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <Dialog.Description whiteSpace="pre-line" mt={4} color={"gray.solid"}>
          <p>{error}</p>
        </Dialog.Description>
      </Dialog.Body>

      <Dialog.Footer>
        <Dialog.ActionTrigger asChild>
          <Button colorPalette="red">Close</Button>
        </Dialog.ActionTrigger>
      </Dialog.Footer>

      <Dialog.CloseTrigger asChild>
        <CloseButton size="sm" />
      </Dialog.CloseTrigger>
    </>
  );
}

export default AlertModalContent;
