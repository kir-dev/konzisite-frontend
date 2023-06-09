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
import { FaAt, FaSignOutAlt } from 'react-icons/fa'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { useAdminReportMutation, usePromoteUserMutation, useUserReportMutation } from '../../../api/hooks/userMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { UserModel } from '../../../api/model/user.model'
import { ConfirmDialogButton } from '../../../components/commons/ConfirmDialogButton'
import { DownloadFileFromServerButton } from '../../../components/commons/DownloadFileFromServerButton'
import { generateToastParams } from '../../../util/generateToastParams'
import { UserDetails } from '../types/UserDetails'
import { ParticipationPanel } from './panels/ParticipationPanel'
import { PresentationPanel } from './panels/PresentationPanel'
import { RequestPanel } from './panels/RequestPanel'
import { UserStatCard } from './UserStatCard'

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
  const getUserReportMutation = useUserReportMutation()
  const userReportRef = useRef<HTMLButtonElement>(null)
  const getAdminReportMutation = useAdminReportMutation()
  const adminReportRef = useRef<HTMLButtonElement>(null)

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
          <DownloadFileFromServerButton<void>
            buttonRef={userReportRef}
            downloadMutation={getUserReportMutation}
            fileName={`report.pdf`}
            params={undefined}
          >
            <Button isLoading={getUserReportMutation.isLoading} ref={userReportRef} w="100%" colorScheme="green">
              Report
            </Button>
          </DownloadFileFromServerButton>

          <DownloadFileFromServerButton<void>
            buttonRef={adminReportRef}
            downloadMutation={getAdminReportMutation}
            fileName={`admin_report.pdf`}
            params={undefined}
          >
            <Button isLoading={getAdminReportMutation.isLoading} ref={adminReportRef} w="100%" colorScheme="green">
              Admin Report
            </Button>
          </DownloadFileFromServerButton>
        </Flex>
      </HStack>
      <UserStatCard stats={user.stats} />
      <Tabs isFitted rounded="lg" variant="enclosed" colorScheme="brand">
        <TabList>
          <Tab>Tartott konzik</Tab>
          <Tab>Konzi részvételek</Tab>
          <Tab>Konzi kérések</Tab>
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
