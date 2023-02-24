import { Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { UserModel } from '../../../api/model/user.model'
import { MajorAvatar } from '../../../components/commons/MajorAvatar'
import { generateDateText } from '../../../util/dateHelper'
import { PATHS } from '../../../util/paths'
import { RequestPreview } from '../types/requestPreview'

type Props = {
  request: RequestPreview
  rightSmallText?: string
  user?: UserModel
  support?: (requestId: number) => void
  unsupport?: (requestId: number) => void
}

export const RequestListItem = ({ request, rightSmallText, user, support, unsupport }: Props) => {
  const navigate = useNavigate()

  return (
    <Box shadow="md" borderRadius={8} borderWidth={1}>
      <Stack as={Link} to={`${PATHS.REQUESTS}/${request.id}`} direction={['column', 'row']} justify="space-between">
        <HStack flexGrow={1} p={4} align="flex-start">
          <MajorAvatar subject={request.subject} monochrome />
          <VStack flexGrow={1}>
            <Stack direction={['column', 'row']} justifyContent="space-between" width="100%">
              <Heading size="md" isTruncated maxWidth={{ base: '16rem', sm: '8rem', m: '12rem', md: '12rem', lg: '26rem' }}>
                {request.name}
              </Heading>
              <Heading size={{ base: 'sm', md: 'md' }}>{generateDateText(request.expiryDate)}</Heading>
            </Stack>
            <Stack direction={['column', 'row']} justifyContent="space-between" width="100%">
              <Text>
                {request.subject.name} ({request.subject.code})
              </Text>
              {rightSmallText && <Text>{rightSmallText}</Text>}
            </Stack>
          </VStack>
        </HStack>
        {user && support && unsupport && user.id !== request.initializer.id && (
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
                navigate(`${PATHS.CONSULTATIONS}/new?requestId=${request.id}`)
              }}
            >
              Megtartom
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
