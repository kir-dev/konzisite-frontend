import { Button, Stack } from '@chakra-ui/react'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

export const IndexPage = () => {
  const { isLoggedIn, loggedInUser } = useAuthContext()
  return (
    <Stack w="200px">
      Hello there {loggedInUser?.firstName}
      <Button variant="solid" colorScheme="brand" size="lg">
        Click me!
      </Button>
      <Button variant="outline" colorScheme="brand" size="lg">
        Click me!
      </Button>
      <Button variant="ghost" colorScheme="brand" size="lg">
        Click me!
      </Button>
    </Stack>
  )
}
