import { Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { UserModel } from '../../../api/model/user.model'
import { MajorAvatar } from '../../../components/commons/MajorAvatar'
import { generateDaysLeftText } from '../../../util/dateHelper'
import { PATHS } from '../../../util/paths'
import { RequestPreview } from '../types/requestPreview'

type Props = {
  request: RequestPreview
  allowNavigate?: boolean
  wide?: boolean
  rightSmallText?: string
  user?: UserModel
  support?: (requestId: number) => void
  unsupport?: (requestId: number) => void
}

export const RequestListItem = ({ request, rightSmallText, user, support, unsupport, allowNavigate = true, wide = true }: Props) => {
  const navigate = useNavigate()

  return (
    <Box shadow="md" borderRadius={8} borderWidth={1}>
      <Stack as={Link} to={allowNavigate ? `${PATHS.REQUESTS}/${request.id}` : ''} direction={['column', 'row']} justify="space-between">
        <HStack flexGrow={1} p={4} align="flex-start">
          <MajorAvatar subject={request.subject} monochrome />
          <VStack alignItems="flex-start" flexGrow={1}>
            <VStack alignItems="flex-start" justify="flex-start" width="100%">
              <Heading
                size="md"
                isTruncated
                maxWidth={wide ? { base: '16rem', sm: '8rem', m: '12rem', md: '20rem', lg: '35rem' } : { base: '13rem', sm: '17rem' }}
              >
                {request.name}
              </Heading>
              <Heading size="sm">{generateDaysLeftText(request.expiryDate)}</Heading>
            </VStack>
            <Text>
              {request.subject.name} ({request.subject.code})
            </Text>
          </VStack>
        </HStack>
        <VStack
          alignItems="flex-end"
          justify={!(user && support && unsupport && user.id !== request.initializer?.id) ? 'flex-end' : 'center'}
        >
          {user && support && unsupport && user.id !== request.initializer?.id && (
            <Stack p={2} justifyContent="center" alignItems="center" direction={['column', 'column', 'column', 'row']}>
              {request.currentUserSupports ? (
                <Button
                  colorScheme="red"
                  width={{ base: '100%', md: 'inherit' }}
                  onClick={(e) => {
                    e.preventDefault()
                    unsupport(request.id)
                  }}
                >
                  Nem támogatom
                </Button>
              ) : (
                <Button
                  colorScheme="brand"
                  width={{ base: '100%', md: 'inherit' }}
                  onClick={(e) => {
                    e.preventDefault()
                    support(request.id)
                  }}
                >
                  Támogatom
                </Button>
              )}
              <Button
                colorScheme="brand"
                width={{ base: '100%', md: 'inherit' }}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`${PATHS.CONSULTATIONS}/new`, { state: { request } })
                }}
              >
                Megtartom
              </Button>
            </Stack>
          )}
          {rightSmallText && <Text p={2}>{rightSmallText}</Text>}
        </VStack>
      </Stack>
    </Box>
  )
}
