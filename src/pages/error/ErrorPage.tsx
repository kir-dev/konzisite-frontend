import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Image, useToast, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaChevronLeft } from 'react-icons/fa'
import { To, useLocation, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

type ErrorPageState = {
  title?: string
  messages?: string[]
  backPath?: To
  status?: number
}

export const ErrorPage = ({ title, messages, backPath, status }: ErrorPageState) => {
  const { state } = useLocation()
  const { onLogout } = useAuthContext()
  const navigate = useNavigate()
  const toast = useToast()
  const {
    title: t,
    messages: m,
    backPath: bp
  } = (state as ErrorPageState) || {
    title: 'This is a blank error page',
    messages: [], //['You might have found yourself here by reloading the error page or copying a link from somewhere else.'],
    backPath: '/'
  }

  useEffect(() => {
    if (status === 401) {
      toast({ title: '401 Nem vagy bejelentkezve', status: 'error' })
      onLogout('/login')
    }
  }, [status])

  return status === 401 ? null : (
    <>
      <Helmet title="Hiba" />
      <Alert p={10} status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={3} fontSize="2xl">
          {title || t || 'Error occured'}
        </AlertTitle>
        {status && <Image maxHeight={400} src={`/img/${status}.jpg`} />}
        <AlertDescription>
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
        <Button
          colorScheme="brand"
          mt={6}
          leftIcon={<FaChevronLeft />}
          onClick={() => {
            if (backPath) navigate(backPath)
            else if (bp) navigate(bp)
            else navigate(-1)
          }}
        >
          Vissza
        </Button>
      </Alert>
    </>
  )
}
