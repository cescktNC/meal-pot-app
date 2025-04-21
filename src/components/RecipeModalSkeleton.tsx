import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

type Props = {};

function RecipeModalSkeleton({}: Props) {
  return (
    <Stack gap={4} p={4} pb={10}>
      <SkeletonText noOfLines={1} mt={10} height={8} />
      <Skeleton height={280} />
      <SkeletonText noOfLines={5} gap={4} />
    </Stack>
  );
}

export default RecipeModalSkeleton;
