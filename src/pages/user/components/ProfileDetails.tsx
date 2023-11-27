import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  useBreakpointValue,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaAt, FaSignOutAlt } from 'react-icons/fa'
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
import { ReportModal } from './ReportModal'
import { UserStatCard } from './UserStatCard'

type Props = {
  user: UserDetails
  onLogoutPressed?: (path?: string) => void
}

export const ProfileDetails = ({ user, onLogoutPressed }: Props) => {
  const { loggedInUser } = useAuthContext()
  const toast = useToast()
  const { t } = useTranslation()
  const promoteUserRef = useRef<HTMLButtonElement>(null)
  const { mutate: promoteUser } = usePromoteUserMutation(
    (data: UserModel) => {
      toast({ title: 'Felhasználó adminnak kinevezve!', status: 'success' })
      user.isAdmin = data.isAdmin
    },
    (e: KonziError) => toast(generateToastParams(e, t))
  )

  return (
    <Box>
      <HStack flexWrap="wrap" justifyContent="space-between" alignItems="center" mb={5}>
        <HStack flexWrap="wrap" spacing={4} mb={2}>
          <Avatar size={useBreakpointValue({ base: 'lg', md: 'xl' })} name={user.fullName + user.id} src="" />
          <Stack direction={{ base: 'column', md: 'row' }} align="center" alignItems={{ base: 'flex-start', md: 'center' }}>
            <VStack alignItems="flex-start">
              <Heading size={{ base: 'lg', sm: 'xl' }} fontWeight={700} wordBreak="break-all">
                {user.fullName}
              </Heading>
              {user.isAdmin && loggedInUser?.isAdmin && (
                <Badge colorScheme="green" ml={1} fontSize="xl">
                  Konzisite admin
                </Badge>
              )}
              {user.id === loggedInUser?.id && (
                <HStack>
                  <FaAt />
                  <Box>{loggedInUser.email}</Box>
                </HStack>
              )}
            </VStack>
          </Stack>
        </HStack>
        <Flex flex={1} justifyContent={['center', 'center', 'end']}>
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
            <Stack direction="column" w={['100%', '100%', 'inherit']}>
              <ReportModal />
              <Button w={['100%', '100%', 'inherit']} colorScheme="brand" rightIcon={<FaSignOutAlt />} onClick={() => onLogoutPressed()}>
                {t('profilePage.signOut')}
              </Button>
            </Stack>
          )}
        </Flex>
      </HStack>
      <UserStatCard stats={user.stats} />
      <Tabs isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>{t('profilePage.presenationsTab')}</Tab>
          <Tab>{t('profilePage.requestsTab')}</Tab>
          <Tab>{t('profilePage.participationsTab')}</Tab>
        </TabList>
        <TabPanels>
          <PresentationPanel presentations={user.presentations} allPresentationCount={user.stats?.presentationCount || 0} />
          <ParticipationPanel participations={user.participations} allParticipationCount={user.stats?.participationCount || 0} />
          <RequestPanel requests={user.consultationRequests} />
        </TabPanels>
      </Tabs>
    </Box>
  )
}
