import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '../../util/paths'

export const Footer: FC = () => (
  <Box as="footer">
    <Container py={8} as={Flex} justifyContent="space-between" direction={{ base: 'column', sm: 'row' }} maxW="6xl">
      <Flex mb={{ base: 4, sm: 0 }} justifyContent={{ base: 'center', sm: 'flex-start' }}>
        {/** todo: Enter content */}
        <Link to={PATHS.IMPRESSUM}>Impressum</Link>
      </Flex>
      <Flex direction="column" justifyContent={{ base: 'center', sm: 'flex-end' }}>
        <Text mt={2} textAlign={{ base: 'center', sm: 'right' }}>
          &copy; {new Date().getFullYear()} • Kir-Dev
        </Text>
      </Flex>
    </Container>
  </Box>
)
