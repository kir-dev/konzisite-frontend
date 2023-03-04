import { Skeleton, VStack } from '@chakra-ui/react'

export const LoadingEditConsultation = () => {
  return (
    <VStack alignItems="flex-start">
      <Skeleton height="40px" width="50%" mb={3} alignSelf="center" />
      <Skeleton height="25px" width="80px" />
      <Skeleton height="40px" width="50%" />
      <Skeleton height="40px" width="100%" />
    </VStack>
  )
}
