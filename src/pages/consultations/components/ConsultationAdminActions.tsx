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
  const editTextColor = useColorModeValue('brand.500', 'brand.200')
  const fileTextColor = useColorModeValue('green', 'green.400')

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e))
  }

  const { mutate: deleteConsultation } = useDeleteConsultationMutation(() => {
    toast({ title: 'Törölted a konzultációt!', status: 'success' })
    navigate(PATHS.CONSULTATIONS)
  }, onErrorFn)

  const uploadFileMutation = useUploadFileMutation(
    consultation.id,
    () => {
      toast({ title: 'Jegyzet feltöltve!', status: 'success' })
      refetch()
    },
    onErrorFn
  )

  const { mutate: deleteFileFromConsultation } = useDeleteFileMutation(
    consultation.id,
    () => {
      toast({ title: 'Törölted a jegyzetet!', status: 'success' })
      refetch()
    },
    onErrorFn
  )

  return (
    <Menu>
      <MenuButton as={Button} w="100%" colorScheme="brand" rightIcon={<FaChevronDown />}>
        Műveletek
      </MenuButton>
      <MenuList>
        <MenuItem color={editTextColor} as={Link} to={`${PATHS.CONSULTATIONS}/${consultation.id}/edit`} icon={<FaEdit />}>
          Szerkesztés
        </MenuItem>

        <Tooltip
          label={consultation.archived ? 'A konzi archiválva lett, már nem lehet feltölteni fájlt.' : ''}
          placement="left"
          hasArrow
          shouldWrapChildren
        >
          <UploadFileModalButton
            initiatorButton={
              <MenuItem color={fileTextColor} ref={uploadModalRef} icon={<FaFileUpload />} isDisabled={consultation.archived}>
                {consultation.fileName ? 'Jegyzet módosítása' : 'Jegyzet feltöltése'}
              </MenuItem>
            }
            initiatorButtonRef={uploadModalRef}
            modalTitle={consultation.fileName ? 'Jegyzet módosítása' : 'Jegyzet feltöltése'}
            confirmButtonText="Mentés"
            mutation={uploadFileMutation}
            accept=".jpg,.jpeg,.png,.pdf,.docx,.pptx,.zip,.txt"
            fileIcon={<FaFileUpload />}
            extraButton={
              consultation.fileName && (
                <ConfirmDialogButton
                  initiatorButton={
                    <Button ref={deleteFileFromKonziRef} colorScheme="red">
                      Jegyzet törlése
                    </Button>
                  }
                  initiatorButtonRef={deleteFileFromKonziRef}
                  bodyText="Biztosan törlöd a feltöltött fájlt? A résztvevők ezentúl nem fogják tudni letölteni."
                  confirmAction={() => deleteFileFromConsultation()}
                  headerText="Jegyzet törlése"
                  confirmButtonText="Törlés"
                />
              )
            }
          >
            <Text textAlign="justify">
              Előadóként vagy létrehozóként van lehetőséged egy fájl feltöltésére a konzihoz. Ezt a fájlt a konzi résztvevői a konzi kezdete
              után tudják letölteni, ha már értékelték az előadókat.
            </Text>
            <Text as="b">Megengedett fájlformátumok: .jpg, .png, .pdf, .docx, .pptx, .zip</Text>
            <br />
            <Text as="b">Maximális fájlméret: 10 MB</Text>
            <Alert rounded="md" my={2} status="warning">
              <AlertIcon />A fájl a konzi vége után 30 nappal törlődik a szerverről, és nem lesz többé letölthető!
            </Alert>
          </UploadFileModalButton>
        </Tooltip>
        <ConfirmDialogButton
          initiatorButton={
            <MenuItem color="red" ref={deleteKonziRef} icon={<FaTrash />}>
              Törlés
            </MenuItem>
          }
          initiatorButtonRef={deleteKonziRef}
          headerText="Konzultáció törlése"
          bodyText="Biztos törölni szeretnéd a konzultációt?"
          confirmButtonText="Törlés"
          confirmAction={() => deleteConsultation(consultation.id)}
        />
      </MenuList>
    </Menu>
  )
}
