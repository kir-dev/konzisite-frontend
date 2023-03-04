import { Box, HStack, Skeleton, SkeletonCircle, Stack, VStack } from '@chakra-ui/react'

export const LoadingConsultationList = () => {
  return (
    <>
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
      <Box shadow="md" borderRadius={8} borderWidth={1}>
        <Stack direction={['column', 'row']}>
          <HStack flexGrow={1} p={4}>
            <SkeletonCircle size="48px" />
            <VStack flexGrow={1} alignItems="flex-start">
              <Skeleton height="20px" width="30%" />
              <Skeleton height="20px" width="90%" />
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
              <Skeleton height="20px" width="50%" />
            </VStack>
          </HStack>
        </Stack>
      </Box>
    </>
  )
}
