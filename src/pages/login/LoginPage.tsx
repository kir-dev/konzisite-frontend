import { Button, Text, VStack } from '@chakra-ui/react'
import { FaHome } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

export const LoginPage = () => {
  const { isLoggedIn, onLoginStarted } = useAuthContext()

  if (isLoggedIn) return <Navigate replace to="/" />

  return (
    <VStack alignItems="center" spacing={6}>
      <Text fontSize="xl" fontWeight={700}>
        Jelentkezz be AuthSCH-n keresztül
      </Text>
      <Button leftIcon={<FaHome />} colorScheme="themeHelper" onClick={onLoginStarted}>
        AuthSCH bejelentkezés
      </Button>
    </VStack>
  )
}
