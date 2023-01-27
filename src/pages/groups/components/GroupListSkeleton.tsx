import { Box, Heading, HStack, Skeleton, SkeletonCircle, Stack, VStack } from '@chakra-ui/react'

export const GroupListSkeleton = ({ title }: { title: string }) => (
  <>
    <Heading mb={4} mt={3} size="lg">
      {title}
    </Heading>
    <VStack alignItems="stretch">
      <Box shadow="md" borderRadius={8} borderWidth={1}>
        <Stack direction={['column', 'row']}>
          <HStack flexGrow={1} p={4}>
            <SkeletonCircle size="48px" />
            <VStack flexGrow={1} alignItems="flex-start">
              <Skeleton height="20px" width="50%" />
              <Skeleton height="20px" width="20%" />
            </VStack>
          </HStack>
        </Stack>
      </Box>
      <Box shadow="md" borderRadius={8} borderWidth={1}>
        <Stack direction={['column', 'row']}>
          <HStack flexGrow={1} p={4}>
            <SkeletonCircle size="48px" />
            <VStack flexGrow={1} alignItems="flex-start">
              <Skeleton height="20px" width="60%" />
              <Skeleton height="20px" width="90%" />
            </VStack>
          </HStack>
        </Stack>
      </Box>
    </VStack>
  </>
)
