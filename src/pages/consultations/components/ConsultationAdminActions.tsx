import {
  Alert,
  AlertIcon,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronDown, FaEdit, FaFileUpload, FaTrash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDeleteConsultationMutation, useDeleteFileMutation, useUploadFileMutation } from '../../../api/hooks/consultationMutationHooks'
import { KonziError } from '../../../api/model/error.model'
import { ConfirmDialogButton } from '../../../components/commons/ConfirmDialogButton'
import { UploadFileModalButton } from '../../../components/commons/UploadFileModalButton'
import { generateToastParams } from '../../../util/generateToastParams'
import { PATHS } from '../../../util/paths'
import { ConsultationDetails } from '../types/consultationDetails'

type Props = {
  consultation: ConsultationDetails
  refetch: () => void
}

export const ConsultationAdminActions = ({ consultation, refetch }: Props) => {
  const uploadModalRef = useRef<HTMLButtonElement>(null)
  const deleteKonziRef = useRef<HTMLButtonElement>(null)
  const deleteFileFromKonziRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const toast = useToast()
  const { t } = useTranslation()
  const editTextColor = useColorModeValue('brand.500', 'brand.200')
  const fileTextColor = useColorModeValue('green', 'green.400')

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e, t))
  }

  const { mutate: deleteConsultation } = useDeleteConsultationMutation(() => {
    toast({ title: t('consultationDetailsPage.konziDeleted'), status: 'success' })
    navigate(PATHS.CONSULTATIONS)
  }, onErrorFn)

  const uploadFileMutation = useUploadFileMutation(
    consultation.id,
    () => {
      toast({ title: t('consultationDetailsPage.attachmentUploaded'), status: 'success' })
      refetch()
    },
    onErrorFn
  )

  const { mutate: deleteFileFromConsultation } = useDeleteFileMutation(
    consultation.id,
    () => {
      toast({ title: t('consultationDetailsPage.attachmentDeleted'), status: 'success' })
      refetch()
    },
    onErrorFn
  )

  return (
    <Menu>
      <MenuButton as={Button} w="100%" colorScheme="brand" rightIcon={<FaChevronDown />}>
        {t('consultationDetailsPage.operations')}
      </MenuButton>
      <MenuList>
        <MenuItem color={editTextColor} as={Link} to={`${PATHS.CONSULTATIONS}/${consultation.id}/edit`} icon={<FaEdit />}>
          {t('consultationDetailsPage.edit')}
        </MenuItem>

        <Tooltip
          label={consultation.archived ? t('consultationDetailsPage.archivedMesage') : ''}
          placement="left"
          hasArrow
          shouldWrapChildren
        >
          <UploadFileModalButton
            initiatorButton={
              <MenuItem color={fileTextColor} ref={uploadModalRef} icon={<FaFileUpload />} isDisabled={consultation.archived}>
                {consultation.fileName ? t('consultationDetailsPage.editAttachment') : t('consultationDetailsPage.uploadAttachment')}
              </MenuItem>
            }
            initiatorButtonRef={uploadModalRef}
            modalTitle={consultation.fileName ? t('consultationDetailsPage.editAttachment') : t('consultationDetailsPage.uploadAttachment')}
            confirmButtonText={t('consultationDetailsPage.save')}
            mutation={uploadFileMutation}
            accept=".jpg,.jpeg,.png,.pdf,.docx,.pptx,.zip,.txt"
            fileIcon={<FaFileUpload />}
            extraButton={
              consultation.fileName && (
                <ConfirmDialogButton
                  initiatorButton={
                    <Button ref={deleteFileFromKonziRef} colorScheme="red">
                      {t('consultationDetailsPage.deleteAttachment')}
                    </Button>
                  }
                  initiatorButtonRef={deleteFileFromKonziRef}
                  bodyText={t('consultationDetailsPage.deleteConfirm')}
                  confirmAction={() => deleteFileFromConsultation()}
                  headerText={t('consultationDetailsPage.deleteAttachment')}
                  confirmButtonText={t('consultationDetailsPage.delete')}
                />
              )
            }
          >
            <Text textAlign="justify">{t('consultationDetailsPage.attachmentMessage')}</Text>
            <Text as="b">{t('consultationDetailsPage.extensions')}</Text>
            <br />
            <Text as="b">{t('consultationDetailsPage.maxSize')}</Text>
            <Alert rounded="md" my={2} status="warning">
              <AlertIcon />
              {t('consultationDetailsPage.autoDeleteAlert')}
            </Alert>
          </UploadFileModalButton>
        </Tooltip>
        <ConfirmDialogButton
          initiatorButton={
            <MenuItem color="red" ref={deleteKonziRef} icon={<FaTrash />}>
              {t('consultationDetailsPage.delete')}
            </MenuItem>
          }
          initiatorButtonRef={deleteKonziRef}
          headerText={t('consultationDetailsPage.deleteKonzi')}
          bodyText={t('consultationDetailsPage.confirmDeleteKonzi')}
          confirmButtonText={t('consultationDetailsPage.delete')}
          confirmAction={() => deleteConsultation(consultation.id)}
        />
      </MenuList>
    </Menu>
  )
}
