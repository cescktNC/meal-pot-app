import { Dialog, Portal } from "@chakra-ui/react";
import RecipeModalSkeleton from "./RecipeModalSkeleton";
import { MealDetails } from "@/types";
import RecipeModalContent from "./RecipeModalContent";
import AlertModalContent from "./AlertModalContent";

type Props = {
  data: MealDetails | undefined;
  error: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  loading: boolean;
};

function RecipeModal({ data, error, isOpen, setIsOpen, loading }: Props) {
  return (
    <Dialog.Root
      role={error ? "alertdialog" : "dialog"}
      lazyMount
      size="lg"
      placement="center"
      scrollBehavior="inside"
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {loading ? (
              <RecipeModalSkeleton />
            ) : (
              <>
                {data && <RecipeModalContent data={data} />}
                {error && <AlertModalContent error={error} />}
              </>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default RecipeModal;
