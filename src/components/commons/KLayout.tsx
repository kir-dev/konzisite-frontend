import { Box, Flex } from '@chakra-ui/react'
import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { HasChildren } from '../../util/react-types.util'
import { Navbar } from '../navbar'
import { Footer } from './Footer'
import { RContainer } from './KContainer'
import { ScrollToTop } from './ScrollToTop'

type Props = {
  background?: string
} & HasChildren

export const RLayout: FC<Props> = ({ background, children }) => {
  return (
    <>
      <Helmet titleTemplate="Konzisite | %s" defaultTitle="Konzisite" />
      <ScrollToTop />
      <Flex direction="column" minHeight="100vh">
        <Navbar />
        <Box background={background} flex={1} pb={24}>
          <RContainer>{children}</RContainer>
        </Box>
        <Footer />
      </Flex>
    </>
  )
}
