import { Avatar, Badge, Box, Heading, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RatingModel } from '../../../api/model/rating.model'
import { UserModel } from '../../../api/model/user.model'
import { currentUser } from '../demoData'
import { UserRating } from './UserRating'

type Props = {
  presentations: (UserModel & {
    averageRating?: number
    ratedByCurrentUser?: boolean
    rating?: RatingModel
  })[]
  showRating?: boolean
  showRatingButton?: boolean
  columns: number
}

export const UserList = ({ presentations, columns, showRating = true, showRatingButton = false }: Props) => {
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
                      <Badge colorScheme="brand" ml={1}>
                        Te
                      </Badge>
                    )}
                  </Heading>
                  {showRating && (
                    <HStack width="100%">
                      <Text>Átlagos értékelés: {p.averageRating}</Text>
                      <FaStar />
                    </HStack>
                  )}
                </VStack>
              </HStack>
              {showRatingButton && <UserRating user={p} />}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
    </>
  )
}
