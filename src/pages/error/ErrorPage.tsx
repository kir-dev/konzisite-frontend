import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Image, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
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
  const { onLogout } = useAuthContext()
  const navigate = useNavigate()
  const toast = useToast()
  const {
    title: t,
    messages: m,
    backPath: bp,
    status: s
  } = (state as ErrorPageState) || {
    title: 'Hiba történt'
  }

  useEffect(() => {
    if (status === 401 || s === 401) {
      toast({ title: 'Nem vagy bejelentkezve', status: 'error' })
      onLogout('/login')
    }
  }, [status, s])

  return status === 401 || s === 401 ? null : (
    <>
      <Helmet title="Hiba" />
      <Alert p={10} status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={3} fontSize="2xl">
          {title || t || 'Hiba történt'}
        </AlertTitle>
        <AlertDescription mb={2}>
          <VStack justifyContent="center" spacing={1}>
            {messages?.filter(Boolean).map((errorMsg) => (
              <span key={errorMsg}>{errorMsg}</span>
            ))}
            {m && (
              <>
                {m?.filter(Boolean).map((errorMsg) => (
                  <span key={errorMsg}>{errorMsg}</span>
                ))}
              </>
            )}
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
          Vissza
        </Button>
      </Alert>
    </>
  )
}
