import { Button, Text, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { FaHome } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

export const LoginPage = () => {
  const { isLoggedIn, onLoginStarted } = useAuthContext()

  if (isLoggedIn) return <Navigate replace to="/" />

  return (
    <>
      <Helmet title="Bejelentkezés" />
      <VStack alignItems="center" spacing={6}>
        <Text fontSize="xl" fontWeight={700}>
          Jelentkezz be AuthSCH-n keresztül
        </Text>
        <Button leftIcon={<FaHome />} colorScheme="brand" onClick={onLoginStarted}>
          AuthSCH bejelentkezés
        </Button>
      </VStack>
    </>
  )
}
