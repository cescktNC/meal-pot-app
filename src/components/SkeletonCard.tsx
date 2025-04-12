import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

type Props = {};

function SkeletonCard({}: Props) {
  return (
    <Card.Root maxW="sm" boxShadow="lg" overflow="hidden">
      <Card.Body p={4} gap="4">
        <Skeleton height="280px" />
        <SkeletonText
          noOfLines={2}
          gap="4"
          variant="shine"
          width="full"
          height="5"
        />
      </Card.Body>
    </Card.Root>
  );
}

export default SkeletonCard;
