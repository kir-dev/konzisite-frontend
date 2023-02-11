import { Box, SimpleGrid, SkeletonCircle, SkeletonText } from '@chakra-ui/react'

export const LoadingUserList = ({ count }: { count: number }) => {
  return (
    <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={4}>
      {Array(count)
        .fill(0)
        .map((_e, i) => (
          <Box p={4} key={i} shadow="md" borderRadius={8} borderWidth={1}>
            <SkeletonCircle mb={6} size="12" />
            <SkeletonText noOfLines={2} skeletonHeight="4" />
          </Box>
        ))}
    </SimpleGrid>
  )
}
