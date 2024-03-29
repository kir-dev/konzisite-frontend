import { Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { HasChildren } from '../../util/react-types.util'

export const KContainer: FC<HasChildren> = ({ children }) => (
  <Flex flexDirection="column" px={4} py={4} mx="auto" maxWidth={['100%', '48rem', '48rem', '64rem']}>
    {children}
  </Flex>
)
