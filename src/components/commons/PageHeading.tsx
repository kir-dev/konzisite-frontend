import { Flex, Heading, useMediaQuery, VStack } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

type Props = {
  title: string
}

export const PageHeading = ({ title, children }: PropsWithChildren<Props>) => {
  const [largeScreen] = useMediaQuery('(min-width: 41em)', { fallback: true })
  if (!children) {
    return (
      <Heading textAlign="center" mb={5} mt={1}>
        {title}
      </Heading>
    )
  }
  if (largeScreen) {
    return (
      <Flex mb={5} mt={1} justify="center" alignItems="center">
        <span style={{ visibility: 'hidden', marginRight: 'auto' }}>{children}</span>

        <Heading textAlign="center">{title}</Heading>
        <span style={{ marginLeft: 'auto' }}>{children}</span>
      </Flex>
    )
  }
  return (
    <VStack mb={4} spacing={1} w="100%" alignItems="stretch">
      <Heading mb={3} textAlign="center">
        {title}
      </Heading>
      {children}
    </VStack>
  )
}
