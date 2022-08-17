import { Avatar, Badge, Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { UserModel } from '../../../api/model/user.model'
import { currentUser } from '../demoData'

type Props = {
  presentations: (UserModel & {
    averageRating?: number
  })[]
  showRating?: boolean
}

export const UserList = ({ presentations, showRating = true }: Props) => {
  return (
    <VStack alignItems="stretch">
      {presentations.map((p) => (
        <Box key={p.id} shadow="md" borderRadius={8} borderWidth={1}>
          <HStack flexGrow={1} as={Link} to={`/users/${p.id}`} p={4}>
            <Avatar size="md" name={`${p.lastName} ${p.firstName}`} src={''} />
            <VStack flexGrow={1}>
              <Heading size="md" width="100%">
                {p.lastName} {p.firstName}
                {p.id === currentUser.id && (
                  <Badge colorScheme="brand" ml={1}>
                    Te
                  </Badge>
                )}
              </Heading>
              {showRating && (
                <HStack width="100%">
                  <Text>Értékelés: {p.averageRating}</Text>
                  <FaStar />
                </HStack>
              )}
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}
