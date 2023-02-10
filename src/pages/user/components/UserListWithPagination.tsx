import { Avatar, Badge, Box, Flex, Heading, HStack, SimpleGrid, Stat, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { PATHS } from '../../../util/paths'
import { UserList } from '../types/UserPreview'

type Props = {
  data: UserList
}

export const UserListWithPagination = ({ data }: Props) => {
  const { loggedInUser } = useAuthContext()

  return (
    <>
      {data.userList.length > 0 ? (
        <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={4}>
          {data.userList.map((user) => (
            <Box key={user.id} shadow="md" borderRadius={8} borderWidth={1}>
              <VStack spacing={0} as={Link} to={`${PATHS.USERS}/${user.id}`} p={2} w="100%" align="flex-start">
                <HStack p={2}>
                  <Avatar size="md" name={user.fullName} src={''} />
                  <Flex width="100%">
                    <Heading size="md">{user.fullName}</Heading>
                    {user.id === loggedInUser?.id && (
                      <Flex align="center">
                        <Badge colorScheme="brand" ml={2}>
                          Te
                        </Badge>
                      </Flex>
                    )}
                  </Flex>
                </HStack>
                <HStack p={2} w="100%">
                  <Stat size="sm">
                    <StatNumber>{user.presentations}</StatNumber>
                    <StatLabel>Tartott konzi</StatLabel>
                  </Stat>
                  <Stat size="sm">
                    <StatNumber>{user.averageRating?.toFixed(2) || '-'}</StatNumber>
                    <StatLabel>Átlagos értékelés</StatLabel>
                  </Stat>
                  <Stat size="sm">
                    <StatNumber>{user.attendances}</StatNumber>
                    <StatLabel>Konzi részvétel</StatLabel>
                  </Stat>
                </HStack>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text textAlign="center" fontStyle="italic">
          Nem található felhasználó ilyen névvel
        </Text>
      )}
    </>
  )
}
