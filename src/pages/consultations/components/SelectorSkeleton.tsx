import { Box, Skeleton } from '@chakra-ui/react'

export const SelectorSkeleton = () => (
  <>
    <Box borderRadius={6} borderWidth={1} pt={2} pb={2} pl={4} width="100%">
      <Skeleton height="20px" width="30%" />
    </Box>
    <Box borderRadius={6} borderWidth={1} pt={2} pb={2} pl={4} width="100%">
      <Skeleton height="20px" width="60%" />
    </Box>
    <Box borderRadius={6} borderWidth={1} pt={2} pb={2} pl={4} width="100%">
      <Skeleton height="20px" width="40%" />
    </Box>
  </>
)
