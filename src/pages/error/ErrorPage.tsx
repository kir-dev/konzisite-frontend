import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Image, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft } from 'react-icons/fa'
import { To, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { PATHS } from '../../util/paths'

type ErrorPageState = {
  title?: string
  messages?: string[]
  backPath?: To
  status?: number
}

export const ErrorPage = ({ title, messages, backPath, status }: ErrorPageState) => {
  const { state, key } = useLocation()
  const { t } = useTranslation()
  const { onLogout } = useAuthContext()
  const navigate = useNavigate()
  const toast = useToast()
  const {
    title: title2,
    messages: m,
    backPath: bp,
    status: s
  } = (state as ErrorPageState) || {
    title: t('errors.error')
  }

  useEffect(() => {
    if (status === 401 || s === 401) {
      toast({ title: t('errors.unauth'), status: 'error' })
      if (window.location.pathname !== '/login') {
        localStorage.setItem('path', window.location.pathname)
      }
      onLogout('/login')
    }
  }, [status, s])

  return status === 401 || s === 401 ? null : (
    <>
      <Helmet title="Hiba" />
      <Alert p={10} status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={3} fontSize="2xl">
          {title || title2 || t('errors.error')}
        </AlertTitle>
        <AlertDescription mb={2}>
          <VStack justifyContent="center" spacing={1}>
            {messages?.filter(Boolean).map((errorMsg) => <span key={errorMsg}>{errorMsg}</span>)}
            {m && <>{m?.filter(Boolean).map((errorMsg) => <span key={errorMsg}>{errorMsg}</span>)}</>}
          </VStack>
        </AlertDescription>
        {status && [401, 403, 404].includes(status) && <Image maxHeight={400} src={`/img/${status}.jpg`} />}

        <Button
          colorScheme="brand"
          mt={6}
          leftIcon={<FaChevronLeft />}
          onClick={() => {
            if (backPath) navigate(backPath)
            else if (bp) navigate(bp)
            else if (key !== 'default') navigate(-1)
            else navigate(PATHS.INDEX)
          }}
        >
          {t('errors.back')}
        </Button>
      </Alert>
    </>
  )
}
