import { Box, Button, Heading, HStack, Stack, Text, Tooltip, useToast, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { FaClock, FaLanguage, FaMapMarkerAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import {
  useDownloadFileMutation,
  useExportConsultationMutation,
  useJoinConsultationMutation,
  useLeaveConsultationMutation
} from '../../api/hooks/consultationMutationHooks'
import { useFetchConsultationbDetailsQuery } from '../../api/hooks/consultationQueryHooks'
import { KonziError } from '../../api/model/error.model'
import { DownloadFileFromServerButton } from '../../components/commons/DownloadFileFromServerButton'
import Markdown from '../../components/commons/Markdown'
import { PageHeading } from '../../components/commons/PageHeading'
import { SubjectName } from '../../components/commons/SubjectName'
import { isValidId } from '../../util/core-util-functions'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { ConsultationAdminActions } from './components/ConsultationAdminActions'
import { LoadingConsultation } from './components/loading/LoadingConsultation'
import { TargetGroupList } from './components/TargetGroupList'
import { UserList } from './components/UserList'

export const ConsultationDetailsPage = () => {
  const { consultationId } = useParams()
  const { loggedInUser, loggedInUserLoading } = useAuthContext()
  const { isLoading, data: consultation, error, refetch } = useFetchConsultationbDetailsQuery(+consultationId!!)
  const toast = useToast()
  const { t, i18n } = useTranslation()
  const downloadFileRef = useRef<HTMLButtonElement>(null)
  const exportKonziRef = useRef<HTMLButtonElement>(null)

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e, t))
  }

  const { mutate: joinConsultation } = useJoinConsultationMutation(() => {
    toast({ title: t('consultationDetailsPage.joinedKonzi'), status: 'success' })
    refetch()
  }, onErrorFn)

  const { mutate: leaveConsultation } = useLeaveConsultationMutation(() => {
    toast({ title: t('consultationDetailsPage.leftKonzi'), status: 'success' })
    refetch()
  }, onErrorFn)

  const downloadFileMutation = useDownloadFileMutation()
  const exportKonziMutation = useExportConsultationMutation()

  if (!consultationId || !isValidId(consultationId)) {
    return <ErrorPage backPath={PATHS.CONSULTATIONS} status={404} title={t('consultationDetailsPage.konziNotFound')} />
  }

  if (error) {
    return (
      <ErrorPage
        status={error.statusCode}
        title={error.message}
        messages={error.statusCode === 404 ? [t('consultationDetailsPage.konziNotFound2')] : []}
      />
    )
  }

  if (isLoading || loggedInUserLoading) {
    return <LoadingConsultation />
  }

  if (!consultation) {
    return (
      <ErrorPage title={t('consultationDetailsPage.konziNotFound')} status={404} messages={[t('consultationDetailsPage.konziNotFound2')]} />
    )
  }

  if (!loggedInUser) {
    return <ErrorPage status={401} />
  }

  const isOwner = consultation.owner.id === loggedInUser.id
  const isAdmin = loggedInUser.isAdmin
  const isPresenter = consultation.presentations.some((p) => p.id === loggedInUser.id)
  const isParticipant = consultation.participants.some((p) => p.id === loggedInUser.id)
  const ratedConsultation = consultation.presentations.some((p) => p.rating)

  return (
    <>
      <Helmet title={consultation.name} />
      <PageHeading title={consultation.name} />
      <Heading size="md" justifyContent="center" textAlign="center" mb={3}>
        <SubjectName subject={consultation.subject} />
      </Heading>
      <Stack direction={['column-reverse', 'row']} justifyContent="space-between" mb={3}>
        <VStack alignItems="flex-start" spacing={3} flexGrow={1}>
          <HStack>
            <FaMapMarkerAlt fontSize={20} />
            <Text isTruncated maxWidth={{ base: '18rem', sm: '15rem', m: '25rem', md: '35rem', lg: '48rem' }}>
              {consultation.location}
            </Text>
          </HStack>
          <HStack>
            <FaClock fontSize={20} />
            <Text>
              {new Date(consultation.startDate).toLocaleString(i18n.language, { timeStyle: 'short', dateStyle: 'short' })} -{' '}
              {new Date(consultation.endDate).toLocaleTimeString(i18n.language, { timeStyle: 'short' })}
            </Text>
          </HStack>
          <HStack>
            <FaLanguage fontSize={30} />
            <Text>{t(consultation.language)}</Text>
          </HStack>
        </VStack>

        <VStack align="flex-end">
          {!isPresenter && !isParticipant && !isOwner && (
            <Button
              onClick={() => {
                joinConsultation(consultation.id)
              }}
              w="100%"
              colorScheme="brand"
            >
              {new Date() < new Date(consultation.startDate)
                ? t('consultationDetailsPage.takePart')
                : t('consultationDetailsPage.tookPart')}
            </Button>
          )}
          {isParticipant && !ratedConsultation && (
            <Button
              w="100%"
              colorScheme="red"
              onClick={() => {
                leaveConsultation(consultation.id)
              }}
            >
              {new Date() < new Date(consultation.startDate)
                ? t('consultationDetailsPage.dontTakePart')
                : t('consultationDetailsPage.didntTakePart')}
            </Button>
          )}
          {((new Date() > new Date(consultation.startDate) && isParticipant) || isPresenter || isOwner || isAdmin) &&
            consultation.fileName && (
              <DownloadFileFromServerButton<number>
                buttonRef={downloadFileRef}
                params={consultation.id}
                fileName={consultation.fileName}
                downloadMutation={downloadFileMutation}
              >
                <Tooltip
                  label={
                    consultation.archived
                      ? t('consultationDetailsPage.achivedNoDownload')
                      : isParticipant && !ratedConsultation && !isAdmin
                        ? t('consultationDetailsPage.unratedNoDownload')
                        : ''
                  }
                  placement="left"
                  hasArrow
                >
                  <Button
                    ref={downloadFileRef}
                    w="100%"
                    isDisabled={consultation.archived || (isParticipant && !ratedConsultation && !isAdmin)}
                    colorScheme="green"
                  >
                    {t('consultationDetailsPage.downloadAttachment')}
                  </Button>
                </Tooltip>
              </DownloadFileFromServerButton>
            )}
          {new Date() < new Date(consultation.startDate) && (
            <DownloadFileFromServerButton<number>
              buttonRef={exportKonziRef}
              downloadMutation={exportKonziMutation}
              fileName={`consultation_${consultation.id}.ics`}
              params={consultation.id}
            >
              <Button ref={exportKonziRef} w="100%" colorScheme="green">
                {t('consultationDetailsPage.exportToCalndar')}
              </Button>
            </DownloadFileFromServerButton>
          )}
          {(isOwner || isAdmin || isPresenter) && <ConsultationAdminActions refetch={refetch} consultation={consultation} />}
        </VStack>
      </Stack>
      {consultation.descMarkdown && (
        <Box shadow="md" borderRadius={8} borderWidth={1} p={4} width="100%" mb={2}>
          <Markdown markdown={consultation.descMarkdown} />
        </Box>
      )}
      <Heading size="lg" mb={2}>
        {t('consultationDetailsPage.presenters')} ({consultation.presentations.length})
      </Heading>
      <UserList
        columns={1}
        users={consultation.presentations}
        isParticipant={isParticipant}
        showRatingButton={new Date(consultation.startDate) < new Date() && isParticipant}
        refetch={refetch}
      />
      <TargetGroupList groups={consultation.targetGroups} />
      <Heading size="lg" mt={2} mb={2}>
        {t('consultationDetailsPage.participants')} ({consultation.participants.length})
      </Heading>
      {consultation.participants.length > 0 ? (
        <UserList columns={2} users={consultation.participants} isParticipant={isParticipant} showRating={false} refetch={refetch} />
      ) : (
        <Text textAlign="center" fontStyle="italic">
          {t('consultationDetailsPage.noParticipants')}
        </Text>
      )}
    </>
  )
}
