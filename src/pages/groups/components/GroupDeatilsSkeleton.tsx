import { Box, HStack, Skeleton, SkeletonCircle, Stack, VStack } from '@chakra-ui/react'

export const GroupDetailsSkeleton = () => (
  <>
    <VStack mb={3} alignItems="flex-start">
      <Skeleton height="44px" width="50%" mb={3} alignSelf="center" />
      <Skeleton height="36px" width="60%" />
      <Skeleton height="36px" width="90%" />
      <Skeleton height="36px" width="40%" />
    </VStack>
    <VStack alignItems="stretch">
      <Box shadow="md" borderRadius={8} borderWidth={1}>
        <Stack direction={['column', 'row']}>
          <HStack flexGrow={1} p={4}>
            <SkeletonCircle size="48px" />
            <VStack flexGrow={1} alignItems="flex-start">
              <Skeleton height="20px" width="60%" />
              <Skeleton height="20px" width="80%" />
            </VStack>
          </HStack>
        </Stack>
      </Box>
      <Box shadow="md" borderRadius={8} borderWidth={1}>
        <Stack direction={['column', 'row']}>
          <HStack flexGrow={1} p={4}>
            <SkeletonCircle size="48px" />
            <VStack flexGrow={1} alignItems="flex-start">
              <Skeleton height="20px" width="40%" />
              <Skeleton height="20px" width="50%" />
            </VStack>
          </HStack>
        </Stack>
      </Box>
      <Box shadow="md" borderRadius={8} borderWidth={1}>
        <Stack direction={['column', 'row']}>
          <HStack flexGrow={1} p={4}>
            <SkeletonCircle size="48px" />
            <VStack flexGrow={1} alignItems="flex-start">
              <Skeleton height="20px" width="90%" />
              <Skeleton height="20px" width="100%" />
            </VStack>
          </HStack>
        </Stack>
      </Box>
    </VStack>
  </>
)
