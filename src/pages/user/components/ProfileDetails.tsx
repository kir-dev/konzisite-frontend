import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useBreakpointValue
} from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { UserDetails } from '../types/UserDetails'

type Props = {
  user: UserDetails
  profileOptions?: {
    onLogoutPressed: (path?: string) => void
  }
}

export const ProfileDetails = ({ user, profileOptions }: Props) => {
  const { onLogoutPressed } = profileOptions || { onLogoutPressed: () => {} }
  console.log(user)
  return (
    <Box>
      <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={5}>
        <HStack flexWrap="wrap" spacing={4}>
          <Avatar size={useBreakpointValue({ base: 'lg', md: 'xl' })} name={user.fullName} src={''} />
          <HStack>
            <Box fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={700} wordBreak="break-all">
              {user.fullName}
            </Box>
          </HStack>
        </HStack>
        {profileOptions && (
          <Flex flex={1} justifyContent="end">
            <Button colorScheme="brand" rightIcon={<FaSignOutAlt />} onClick={() => onLogoutPressed()}>
              Kijelentkezés
            </Button>
          </Flex>
        )}
      </HStack>
      <>
        <Card>
          <CardBody>
            <SimpleGrid columns={{ base: 2, md: 5 }}>
              <Stat>
                <StatNumber>{user.presentations.length}</StatNumber>
                <StatLabel>Tartott konzi</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{user.consultationRequests.length}</StatNumber>
                <StatLabel>Konzi résztvevő</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{user.presentations.reduce((acc, cur) => acc + cur.ratings.length, 0)}</StatNumber>
                <StatLabel>Értékelés</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{user.averageRating || '-'}</StatNumber>
                <StatLabel>Átlagos értékelés</StatLabel>
              </Stat>
              <Stat>
                <StatNumber>{user.participations.length}</StatNumber>
                <StatLabel>Részvétel más konziján</StatLabel>
              </Stat>
            </SimpleGrid>
          </CardBody>
        </Card>
      </>
    </Box>
  )
}
