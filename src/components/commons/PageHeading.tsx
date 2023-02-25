import { Flex, Heading, useMediaQuery, VStack } from '@chakra-ui/react'
import { ReactElement } from 'react'

type Props = {
  title: string
  children?: ReactElement
}

export const PageHeading = ({ title, children }: Props) => {
  const [largeScreen] = useMediaQuery('(min-width: 41em)', { fallback: true })
  if (!children) {
    return (
      <Heading textAlign="center" my={3}>
        {title}
      </Heading>
    )
  }
  if (largeScreen) {
    return (
      <Flex my={3} justify="center" alignItems="center">
        <span style={{ visibility: 'hidden', marginRight: 'auto' }}>{children}</span>

        <Heading textAlign="center">{title}</Heading>
        <span style={{ marginLeft: 'auto' }}>{children}</span>
      </Flex>
    )
  } else {
    return (
      <VStack my={3} spacing={1} w="100%" alignItems="stretch">
        <Heading textAlign="center">{title}</Heading>
        {children}
      </VStack>
    )
  }
}
