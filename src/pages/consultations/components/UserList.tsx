import { Avatar, Badge, Box, Heading, HStack, SimpleGrid, Stack, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { RatingModel } from '../../../api/model/rating.model'
import { UserModel } from '../../../api/model/user.model'
import { Rating } from './Rating'
import { UserRating } from './UserRating'

type Props = {
  presentations: (UserModel & {
    averageRating?: number
    rating?: RatingModel
  })[]
  showRating?: boolean
  showRatingButton?: boolean
  columns: number
  participants: UserModel[]
  currentUser: UserModel
  refetch: () => {}
}

export const UserList = ({
  presentations,
  participants,
  currentUser,
  columns,
  showRating = true,
  showRatingButton = false,
  refetch
}: Props) => {
  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: columns }} gap={4} mb={3}>
        {presentations.map((p) => (
          <Box key={p.id} shadow="md" borderRadius={8} borderWidth={1}>
            <Stack direction={['column', 'row']} width="100%">
              <HStack flexGrow={1} as={Link} to={`/users/${p.id}`} p={4}>
                <Avatar size="md" name={p.fullName} src={''} />
                <VStack flexGrow={1}>
                  <Heading size="md" width="100%">
                    {p.fullName}
                    {p.id === currentUser.id && (
                      <Badge colorScheme="brand" ml={1} mb={1}>
                        Te
                      </Badge>
                    )}
                  </Heading>
                  {showRating && <Rating rating={p.averageRating} />}
                </VStack>
              </HStack>
              {showRatingButton && <UserRating participants={participants} currentUser={currentUser} refetch={refetch} user={p} />}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}
