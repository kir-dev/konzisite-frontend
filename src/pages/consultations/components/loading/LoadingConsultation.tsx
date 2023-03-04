import { Box, Heading, HStack, Skeleton, SkeletonCircle, Stack, VStack } from '@chakra-ui/react'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'

export const LoadingConsultation = () => {
  return (
    <>
      <VStack mb={3} alignItems="flex-start">
        <Skeleton height="44px" width="50%" mb={3} alignSelf="center" />
        <Skeleton height="24px" width="40%" alignSelf="center" />
      </VStack>
      <VStack alignItems="flex-start" spacing={3} flexGrow={1} mb={2}>
        <HStack>
          <FaMapMarkerAlt />
          <Skeleton height="20px" width="50px" />
        </HStack>
        <HStack>
          <FaClock />
          <Skeleton height="20px" width="90px" />
        </HStack>
      </VStack>
      <Box shadow="md" borderRadius={8} borderWidth={1} p={4} width="100%" mb={2}>
        <VStack alignItems="flex-start">
          <Skeleton height="24px" width="40%" />
          <Skeleton height="20px" width="80%" />
          <Skeleton height="20px" width="60%" />
        </VStack>
      </Box>
      <Heading size="lg" mb={2}>
        Konzitartók
      </Heading>
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
}
