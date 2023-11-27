import { Button, Text, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { FaHome } from 'react-icons/fa'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { PATHS } from '../../util/paths'

export const LoginPage = () => {
  const { isLoggedIn, onLoginStarted } = useAuthContext()
  const { t } = useTranslation()
  if (isLoggedIn) return <Navigate replace to={PATHS.INDEX} />

  return (
    <>
      <Helmet title="Bejelentkezés" />
      <VStack alignItems="center" spacing={6}>
        <Text fontSize="xl" fontWeight={700}>
          {t('misc.signIn')}
        </Text>
        <Button leftIcon={<FaHome />} colorScheme="brand" onClick={onLoginStarted}>
          {t('misc.authSch')}
        </Button>
      </VStack>
    </>
  )
}
