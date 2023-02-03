import { Avatar, Badge, Box, Heading, HStack, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { RatingModel } from '../../../api/model/rating.model'
import { ErrorPage } from '../../error/ErrorPage'
import { PublicUser } from '../../user/types/PublicUser'
import { Rating } from './Rating'
import { UserRating } from './UserRating'

type Props = {
  users: (PublicUser & {
    averageRating?: number
    rating?: RatingModel
  })[]
  showRating?: boolean
  showRatingButton?: boolean
  columns: number
  isParticipant: boolean
  refetch: () => {}
}

export const UserList = ({ users, isParticipant, columns, showRating = true, showRatingButton = false, refetch }: Props) => {
  const { loggedInUser } = useAuthContext()

  if (loggedInUser === undefined) {
    return <ErrorPage status={401} />
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: columns }} gap={4} mb={3}>
        {users.map((u) => (
          <Box key={u.id} shadow="md" borderRadius={8} borderWidth={1}>
            <Stack direction={['column', 'row']} width="100%">
              <HStack flexGrow={1} as={Link} to={`/users/${u.id}`} p={4}>
                <Avatar size="md" name={u.fullName} src={''} />
                <VStack flexGrow={1}>
                  <Heading size="md" width="100%">
                    {u.fullName}
                    {u.id === loggedInUser.id && (
                      <Badge colorScheme="brand" ml={1} mb={1}>
                        Te
                      </Badge>
                    )}
                  </Heading>
                  {showRating && <Rating rating={u.averageRating} />}
                </VStack>
              </HStack>
              {showRating && <UserRating showRatingButton={showRatingButton} isParticipant={isParticipant} refetch={refetch} user={u} />}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}
