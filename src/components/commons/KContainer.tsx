import { Flex } from '@chakra-ui/react'
import { FC } from 'react'

export const RContainer: FC = ({ children }) => (
  <Flex flexDirection="column" px={4} py={4} mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']}>
    {children}
  </Flex>
)
