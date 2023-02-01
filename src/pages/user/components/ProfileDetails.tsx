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
  Stack,
  StackDivider,
  Stat,
  StatLabel,
  StatNumber,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
              <StatNumber>{user.consultationRequests.length}</StatNumber>
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
          <Tab>Konzi kérések</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {user.presentations.map((p) => (
              <ConsultationListItem key={p.id} consultation={p}>
                <VStack p={4} pt={0} align="flex-start">
                  <Heading size="md">Értékelések</Heading>

                  <Stack divider={<StackDivider />} spacing="4" w="100%">
                    {p.ratings.map((r) => (
                      <RatingListItem key={r.id} rating={r} />
                    ))}
                  </Stack>
                </VStack>
              </ConsultationListItem>
            ))}
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
