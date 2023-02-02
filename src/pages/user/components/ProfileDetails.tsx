import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  SimpleGrid,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import { FaLock, FaSignOutAlt } from 'react-icons/fa'
import { UserDetails } from '../types/UserDetails'
import { ParticipationPanel } from './panels/ParticipationPanel'
import { PresentationPanel } from './panels/PresentationPanel'
import { RequestPanel } from './panels/RequestPanel'
import { StatData, UserStat } from './UserStat'

type Props = {
  user: UserDetails
  profileOptions?: {
    onLogoutPressed: (path?: string) => void
  }
}

export const ProfileDetails = ({ user, profileOptions }: Props) => {
  const { onLogoutPressed } = profileOptions || { onLogoutPressed: () => {} }

  const statData: StatData[] = [
    {
      value: user.presentations.length,
      label: 'Tartott konzi',
      explanation: `A felhasználó ${user.presentations.length} konzultáción volt előadó.`
    },
    {
      value: user.presentations.reduce((acc, cur) => acc + cur.participants, 0),
      label: 'Konzi résztvevő',
      explanation: `Azokon a konzikon, ahol a felhasználó előadó volt, összesen ${user.presentations.reduce(
        (acc, cur) => acc + cur.participants,
        0
      )} hallgató vett részt.`
    },
    {
      value: user.presentations.reduce((acc, cur) => acc + cur.ratings.length, 0),
      label: 'Értékelés',
      explanation: `A felhasználó előadásaira összesen ${user.presentations.reduce(
        (acc, cur) => acc + cur.ratings.length,
        0
      )} értékelés érkezett.`
    },
    {
      value: user.averageRating?.toFixed(2) || '-',
      label: 'Átlagos értékelés',
      explanation: user.averageRating
        ? `A felhasználó előadásainak átlagértékelése ${user.averageRating?.toFixed(2)}.`
        : 'A felhasználó előadásaira még nem érkezett értékelés.'
    },
    {
      value: user.participations.length,
      label: 'Részvétel más konziján',
      explanation: `A felhasználó összesen ${user.participations.length} alkalommal vett részt más konzultációján.`
    }
  ]
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
            {statData.map((sd) => (
              <UserStat key={sd.label} data={sd} />
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>
      <Tabs isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList mb="1em">
          <Tab>Tartott konzik</Tab>
          <Tab>Konzi részvételek</Tab>
          {user.consultationRequests && (
            <Tab>
              Konzi kérések &nbsp;
              <Tooltip label="Más felhasználó nem látja, hogy milyen konzikat kértél." shouldWrapChildren hasArrow>
                <FaLock />
              </Tooltip>
            </Tab>
          )}
        </TabList>
        <TabPanels>
          <PresentationPanel presentations={user.presentations} />
          <ParticipationPanel participations={user.participations} />
          {user.consultationRequests && <RequestPanel requests={user.consultationRequests} />}
        </TabPanels>
      </Tabs>
    </Box>
  )
}
