import { Button, Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { FaHome } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

export const LoginPage: FC = () => {
  const { isLoggedIn, onLoginSuccess, onLoginFailure, loginLoading } = useAuthContext()

  if (isLoggedIn) return <Navigate replace to="/" />

  return (
    <VStack alignItems="center" spacing={6}>
      {loginLoading ? (
        'Beléptetés folyamatban...'
      ) : (
        <>
          <Text fontSize="xl" fontWeight={700}>
            Jelentkezz be AuthSCH-n keresztül
          </Text>
          <Button leftIcon={<FaHome />} colorScheme="themeHelper">
            AuthSCH bejelentkezés
          </Button>
        </>
      )}
    </VStack>
  )
}
