import { Avatar, Box, Button, Flex, Heading, HStack, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { UserDetails } from '../types/UserDetails'
import { ConsultationListItem } from './ConsultationListItem'

type Props = {
  user: UserDetails
  profileOptions?: {
    onLogoutPressed: (path?: string) => void
  }
}

export const ProfileDetails = ({ user, profileOptions }: Props) => {
  const { onLogoutPressed } = profileOptions || { onLogoutPressed: () => {} }

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
        <VStack>
          <Heading>Átlagos értékelés: {user.avarageRating}</Heading>

          {user.presentations.map((p) =>
            p.ratings?.map((r) => (
              <HStack key={r.id}>
                <Text>{r.rater.fullName} </Text>
                <Text>{r.value}, </Text>
                <Text>{r.text}</Text>
              </HStack>
            ))
          )}
          <Heading>Tartott konzultációk</Heading>
          {user.presentations?.map((c) => (
            <ConsultationListItem c={c} />
          ))}
          <Heading>Konzik, amin részt vett</Heading>
          {user.participations?.map((c) => (
            <ConsultationListItem c={c} />
          ))}
        </VStack>
      </>
    </Box>
  )
}
