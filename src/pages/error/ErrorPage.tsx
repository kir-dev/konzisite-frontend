import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, VStack } from '@chakra-ui/react'
import { FaChevronLeft } from 'react-icons/fa'
import { To, useLocation, useNavigate } from 'react-router-dom'

type ErrorPageState = {
  title?: string
  messages?: string[]
  backPath?: To
}

export const ErrorPage = ({ title, messages, backPath }: ErrorPageState) => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const {
    title: t,
    messages: m,
    backPath: bp
  } = (state as ErrorPageState) || {
    title: 'This is a blank error page',
    messages: ['You might have found yourself here by reloading the error page or copying a link from somewhere else.'],
    backPath: '/'
  }

  return (
    <Alert p={10} status="error" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={3} fontSize="2xl">
        {title || t || 'Error occured'}
      </AlertTitle>
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
              <span>See console for more information</span>
            </>
          )}
        </VStack>
      </AlertDescription>
      <Button
        colorScheme="theme"
        mt={6}
        leftIcon={<FaChevronLeft />}
        onClick={() => {
          if (backPath) navigate(backPath)
          else if (bp) navigate(bp)
          else navigate(-1)
        }}
      >
        Go back
      </Button>
    </Alert>
  )
}
