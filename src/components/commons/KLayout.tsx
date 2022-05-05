import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { Navbar } from '../navbar'
import { Footer } from './Footer'
import { RContainer } from './KContainer'

type Props = {
  background?: string
}

export const RLayout: FC<Props> = ({ background, children }) => {
  return (
    <Flex direction="column" minHeight="100vh">
      <Navbar />
      <Box background={background} flex={1} pb={24}>
        <RContainer>{children}</RContainer>
      </Box>
      <Footer />
    </Flex>
  )
}
