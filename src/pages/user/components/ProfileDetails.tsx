import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import { ConsultationListItem } from '../../../components/commons/ConsultationListItem'
import { UserDetails } from '../types/UserDetails'
import { RatingListItem } from './RatingListItem'

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
      <Card mb={5}>
        <CardBody>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }}>
            <Stat>
              <StatNumber>{user.presentations.length}</StatNumber>
              <StatLabel>Tartott konzi</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{user.presentations.reduce((acc, cur) => acc + cur.participants, 0)}</StatNumber>
              <StatLabel>Konzi résztvevő</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{user.presentations.reduce((acc, cur) => acc + cur.ratings.length, 0)}</StatNumber>
              <StatLabel>Értékelés</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{user.averageRating?.toFixed(2) || '-'}</StatNumber>
              <StatLabel>Átlagos értékelés</StatLabel>
            </Stat>
            <Stat>
              <StatNumber>{user.participations.length}</StatNumber>
              <StatLabel>Részvétel más konziján</StatLabel>
            </Stat>
          </SimpleGrid>
        </CardBody>
      </Card>
      <Tabs isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList mb="1em">
          <Tab>Tartott konzik</Tab>
          <Tab>Konzi részvételek</Tab>
          {user.consultationRequests && <Tab>Konzi kérések</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack spacing={4} alignItems="stretch">
              {user.presentations
                .sort((c1, c2) => new Date(c2.startDate).getTime() - new Date(c1.startDate).getTime())
                .map((p) => (
                  <ConsultationListItem key={p.id} consultation={p} rightSmallText={`${p.participants} résztvevő`}>
                    <VStack p={4} pt={0} align="flex-start">
                      {p.ratings.length > 0 ? (
                        <>
                          <Heading size="md">Értékelések</Heading>
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w="100%">
                            {p.ratings.map((r) => (
                              <RatingListItem key={r.id} rating={r} />
                            ))}
                          </SimpleGrid>
                        </>
                      ) : (
                        <Text fontStyle="italic">Ezt a konzit még nem értékelte senki.</Text>
                      )}
                    </VStack>
                  </ConsultationListItem>
                ))}
            </VStack>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          {user.consultationRequests && <TabPanel>Konzi kérések</TabPanel>}
        </TabPanels>
      </Tabs>
    </Box>
  )
}
