import { Box, Button, Heading, HStack, Stack, Text, Tooltip, useToast, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import {
  useDownloadFileMutation,
  useJoinConsultationMutation,
  useLeaveConsultationMutation
} from '../../api/hooks/consultationMutationHooks'
import { useFetchConsultationbDetailsQuery } from '../../api/hooks/consultationQueryHooks'
import { KonziError } from '../../api/model/error.model'
import Markdown from '../../components/commons/Markdown'
import { isValidId } from '../../util/core-util-functions'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { ConsultationAdminActions } from './components/ConsultationAdminActions'
import { LoadingConsultation } from './components/LoadingConsultation'
import { TargetGroupList } from './components/TargetGroupList'
import { UserList } from './components/UserList'

export const ConsultationDetailsPage = () => {
  const { consultationId } = useParams()
  const { loggedInUser, loggedInUserLoading } = useAuthContext()
  const { isLoading, data: consultation, error, refetch } = useFetchConsultationbDetailsQuery(+consultationId!!)
  const toast = useToast()
  const downloadRef = useRef<HTMLAnchorElement>(null)
  const leaveKonziRef = useRef<HTMLButtonElement>(null)

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e))
  }

  const { mutate: joinConsultation } = useJoinConsultationMutation(() => {
    toast({ title: 'Csatlakoztál a konzultációhoz!', status: 'success' })
    refetch()
  }, onErrorFn)

  const { mutate: leaveConsultation } = useLeaveConsultationMutation(() => {
    toast({ title: 'Kiléptél a konzultációból!', status: 'success' })
    refetch()
  }, onErrorFn)

  const { mutate: downloadFile } = useDownloadFileMutation(
    (rawFile: ArrayBuffer) => {
      const blob = new Blob([rawFile])
      if (downloadRef.current) {
        downloadRef.current.href = URL.createObjectURL(blob)
        downloadRef.current.click()
      }
    },
    () => {
      toast({
        title: 'Hiba a fájl letöltése közben',
        description: 'Lehet hogy már törlésre került, vagy nincs jogod megtakinteni.',
        status: 'error'
      })
    }
  )

  if (!consultationId || !isValidId(consultationId)) {
    return <ErrorPage backPath={PATHS.CONSULTATIONS} status={404} title={'A konzultáció nem található!'} />
  }

  if (error) {
    return (
      <ErrorPage
        status={error.statusCode}
        title={error.message}
        messages={error.statusCode === 404 ? ['A konzultáció amit keresel nem létezik, vagy nincs jogosultságod megtekinteni.'] : []}
      />
    )
  }

  if (isLoading || loggedInUserLoading) {
    return <LoadingConsultation />
  }

  if (!consultation) {
    return (
      <ErrorPage
        title="Nem található a konzultáció"
        status={404}
        messages={['A konzultáció amit keresel nem létezik, vagy nincs jogosultságod megtekinteni.']}
      />
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
      <Heading textAlign="center" mb={3}>
        {consultation.name}
      </Heading>
      <Heading size="md" justifyContent="center" textAlign="center" mb={3}>
        {consultation.subject.name} ({consultation.subject.code})
      </Heading>
      <Stack direction={['column-reverse', 'row']} justifyContent="space-between" mb={3}>
        <VStack alignItems="flex-start" spacing={3} flexGrow={1}>
          <HStack>
            <FaMapMarkerAlt />
            <Text> {consultation.location} </Text>
          </HStack>
          <HStack>
            <FaClock />
            <Text>
              {new Date(consultation.startDate).toLocaleString('hu-HU', { timeStyle: 'short', dateStyle: 'short' })} -{' '}
              {new Date(consultation.endDate).toLocaleTimeString('hu-HU', { timeStyle: 'short' })}
            </Text>
          </HStack>
        </VStack>

        <VStack align="flex-end">
          {!isPresenter && !isParticipant && !isOwner && (
            <Button
              onClick={() => {
                joinConsultation(+consultationId)
              }}
              w="100%"
              colorScheme="brand"
            >
              {new Date() < new Date(consultation.startDate) ? 'Részt veszek' : 'Részt vettem'}
            </Button>
          )}
          {isParticipant && !ratedConsultation && (
            <Button
              w="100%"
              colorScheme="red"
              onClick={() => {
                leaveConsultation(+consultationId)
              }}
            >
              {new Date() < new Date(consultation.startDate) ? 'Nem veszek részt' : 'Nem vettem részt'}
            </Button>
          )}
          {((new Date() > new Date(consultation.startDate) && isParticipant) || isPresenter || isOwner || isAdmin) &&
            consultation.fileName && (
              <>
                <a ref={downloadRef} download={consultation.fileName} hidden />
                <Tooltip
                  label={
                    consultation.archived
                      ? 'A konzi archiválva lett, már nem lehet letölteni a fájlt.'
                      : isParticipant && !ratedConsultation && !isAdmin
                      ? 'Akkor tudod letölteni a fájlt, ha már értékelted az előadókat!'
                      : ''
                  }
                  placement="left"
                  hasArrow
                >
                  <Button
                    w="100%"
                    isDisabled={consultation.archived || (isParticipant && !ratedConsultation && !isAdmin)}
                    colorScheme="green"
                    onClick={() => downloadFile(+consultationId)}
                  >
                    Jegyzet letöltése
                  </Button>
                </Tooltip>
              </>
            )}
          {new Date() < new Date(consultation.startDate) && (
            // TODO .ics fájl letöltő gomb
            <Button w="100%" isDisabled colorScheme="green">
              Exportálás naptárba
            </Button>
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
        Konzitartók ({consultation.presentations.length})
      </Heading>
      <UserList
        columns={1}
        users={consultation.presentations}
        isParticipant={isParticipant}
        showRatingButton={new Date(consultation.startDate).getTime() < new Date().getTime()}
        refetch={refetch}
      />
      <TargetGroupList groups={consultation.targetGroups} />
      <Heading size="lg" mt={2} mb={2}>
        Résztvevők ({consultation.participants.length})
      </Heading>
      {consultation.participants.length > 0 ? (
        <UserList columns={2} users={consultation.participants} isParticipant={isParticipant} showRating={false} refetch={refetch} />
      ) : (
        <Text textAlign="center" fontStyle="italic">
          Még nincs egy résztvevő se.
        </Text>
      )}
    </>
  )
}
