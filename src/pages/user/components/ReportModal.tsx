import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react'
import { ChangeEvent, useRef, useState } from 'react'
import { useAuthContext } from '../../../api/contexts/auth/useAuthContext'
import { ReportDateRange, useAdminReportMutation, useUserReportMutation } from '../../../api/hooks/userMutationHooks'
import { DownloadFileFromServerButton } from '../../../components/commons/DownloadFileFromServerButton'
import { formatDate, getEndOfSemester, getStartOfSemester } from '../../../util/dateHelper'

export const ReportModal = () => {
  const { loggedInUser } = useAuthContext()
  const isAdmin = loggedInUser?.isAdmin
  const [largeScreen] = useMediaQuery('(min-width: 48em)')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [startDate, setStartDate] = useState(getStartOfSemester())
  const [endDate, setEndDate] = useState(getEndOfSemester())
  const [adminReport, setAdminReport] = useState(false)

  const getUserReportMutation = useUserReportMutation(onClose)
  const userReportRef = useRef<HTMLButtonElement>(null)
  const getAdminReportMutation = useAdminReportMutation(onClose)
  const adminReportRef = useRef<HTMLButtonElement>(null)

  const startDateError = startDate >= endDate
  const endDateError = endDate > new Date()

  const onEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    date.setHours(23, 59, 59, 999)
    setEndDate(date)
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Riport generálása
      </Button>
      <Modal isCentered={largeScreen} motionPreset="slideInBottom" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Riport generálása</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack alignItems="flex-start">
              <Text>HK-s ösztöndíjakhoz itt tudsz riport generálni az általad tartott konzultációkról.</Text>
              {isAdmin && (
                <Text textAlign="justify">
                  Adminként van lehetőséged olyan riport generálására, melyen az összes konzi szereplni fog, amit az adott időtartamban
                  tartottak.
                </Text>
              )}
              <FormControl>
                <FormLabel>Időtartam kezdete</FormLabel>
                <Input
                  type="date"
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  value={formatDate(startDate)}
                  max={formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000))}
                />

                <Flex justifyContent="flex-end">
                  {startDateError && <FormHelperText color="red.500">Érvénytelen időtartam!</FormHelperText>}
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel>Időtartam vége</FormLabel>
                <Input type="date" onChange={onEndDateChange} value={formatDate(endDate)} max={formatDate(new Date())} />

                <Flex justifyContent="flex-end">
                  {endDateError && <FormHelperText color="red.500">Csak múltbeli konzikról lehet riportot generálni!</FormHelperText>}
                </Flex>
              </FormControl>
              {isAdmin && (
                <Checkbox colorScheme="green" isChecked={adminReport} onChange={(e) => setAdminReport(e.target.checked)}>
                  Admin riport
                </Checkbox>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Mégse
            </Button>
            {adminReport ? (
              <DownloadFileFromServerButton<ReportDateRange>
                buttonRef={adminReportRef}
                downloadMutation={getAdminReportMutation}
                fileName={`konzisite_admin_riport.pdf`}
                params={{ startDate, endDate }}
              >
                <Button
                  isLoading={getAdminReportMutation.isLoading}
                  isDisabled={startDateError || endDateError || !isAdmin}
                  ref={adminReportRef}
                  colorScheme="green"
                >
                  Generálás
                </Button>
              </DownloadFileFromServerButton>
            ) : (
              <DownloadFileFromServerButton<ReportDateRange>
                buttonRef={userReportRef}
                downloadMutation={getUserReportMutation}
                fileName={`konzisite_report.pdf`}
                params={{ startDate, endDate }}
              >
                <Button
                  isLoading={getUserReportMutation.isLoading}
                  isDisabled={startDateError || endDateError}
                  ref={userReportRef}
                  colorScheme="green"
                >
                  Generálás
                </Button>
              </DownloadFileFromServerButton>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
