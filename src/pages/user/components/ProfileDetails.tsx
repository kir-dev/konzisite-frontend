import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Tooltip,
  useBreakpointValue,
  useToast
} from '@chakra-ui/react'
import { useRef } from 'react'
import { FaLock, FaSignOutAlt } from 'react-icons/fa'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { usePromoteUserMutation } from '../../../api/hooks/userMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { UserModel } from '../../../api/model/user.model'
import { ConfirmDialogButton } from '../../../components/commons/ConfirmDialogButton'
import { generateToastParams } from '../../../util/generateToastParams'
import { UserDetails } from '../types/UserDetails'
import { ParticipationPanel } from './panels/ParticipationPanel'
import { PresentationPanel } from './panels/PresentationPanel'
import { RequestPanel } from './panels/RequestPanel'
import { StatData, UserStat } from './UserStat'

type Props = {
  user: UserDetails
  onLogoutPressed?: (path?: string) => void
}

export const ProfileDetails = ({ user, onLogoutPressed }: Props) => {
  const { loggedInUser } = useAuthContext()
  const toast = useToast()
  const promoteUserRef = useRef<HTMLButtonElement>(null)
  const { mutate: promoteUser } = usePromoteUserMutation(
    (data: UserModel) => {
      toast({ title: 'Felhasználó adminnak kinevezve!', status: 'success' })
      user.isAdmin = data.isAdmin
    },
    (e: KonziError) => toast(generateToastParams(e))
  )

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
      label: 'Konzi részvétel',
      explanation: `A felhasználó összesen ${user.participations.length} alkalommal vett részt más konzultációján.`
    }
  ]

  return (
    <Box>
      <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={5}>
        <HStack flexWrap="wrap" spacing={4} mb={2}>
          <Avatar size={useBreakpointValue({ base: 'lg', md: 'xl' })} name={user.fullName} src="" />
          <Stack direction={{ base: 'column', md: 'row' }} align="center" alignItems={{ base: 'flex-start', md: 'center' }}>
            <Heading size={{ base: 'lg', sm: 'xl' }} fontWeight={700} wordBreak="break-all">
              {user.fullName}
            </Heading>
            {user.isAdmin && loggedInUser?.isAdmin && (
              <Badge colorScheme="green" ml={1} fontSize="xl">
                Konzisite admin
              </Badge>
            )}
          </Stack>
        </HStack>
        <Flex flex={1} justifyContent="end">
          {loggedInUser?.isAdmin && !user.isAdmin && (
            <ConfirmDialogButton
              initiatorButton={
                <Button colorScheme="green" ref={promoteUserRef}>
                  Adminná tétel
                </Button>
              }
              initiatorButtonRef={promoteUserRef}
              headerText="Biztosan kinevezed adminnak?"
              bodyText="Biztosan kinevezed ezt a felhasználót adminnak? Ezt később csak az adatbázisba nyúlással lehet visszavonni!"
              buttonColorScheme="green"
              confirmButtonText="Kinevezés"
              refuseButtonText="Mégsem"
              confirmAction={() => promoteUser(user.id)}
            />
          )}
          {onLogoutPressed && (
            <Button colorScheme="brand" rightIcon={<FaSignOutAlt />} onClick={() => onLogoutPressed()}>
              Kijelentkezés
            </Button>
          )}
        </Flex>
      </HStack>
      <Card mb={5}>
        <CardBody>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacingY={5}>
            {statData.map((sd) => (
              <UserStat key={sd.label} data={sd} />
            ))}
          </SimpleGrid>
        </CardBody>
      </Card>
      <Tabs isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList>
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
