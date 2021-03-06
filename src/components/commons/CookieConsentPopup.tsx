import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  onClick: () => void
}

export const CookieConsentPopup: FC<Props> = ({ onClick }) => (
  <Box maxWidth="80rem" mx="auto" p={2}>
    <Alert display={{ base: 'block', md: 'flex' }} colorScheme="brand" variant="solid" borderRadius={6} width="full">
      <Flex flex={1}>
        <AlertIcon alignSelf="flex-start" />
        <Box>
          <AlertTitle>Cookie hozzájárulás</AlertTitle>
          <AlertDescription display="block">
            Cookie-kat használunk a weboldalon a használat kényelméért. A weboldal használatával elfogadod a cookie-jainkat.
          </AlertDescription>
        </Box>
      </Flex>
      <Flex justifyContent="flex-end">
        <Button colorScheme="blackAlpha" onClick={onClick} ml={2} mt={{ base: 2, md: 0 }}>
          Megértettem
        </Button>
      </Flex>
    </Alert>
  </Box>
)
