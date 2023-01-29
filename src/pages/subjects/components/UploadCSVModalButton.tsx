import {
  Button,
  Code,
  Link,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  UnorderedList,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FaFileCsv } from 'react-icons/fa'
import { useImportSubjectsMutation } from '../../../api/hooks/subjectHooks'
import { FileUpload } from '../../../components/form-elements/FileUpload'
import { generateToastParams } from '../../../util/generateToastParams'

type Props = {
  refetch: () => void
}

export const UploadCSVModalButton = ({ refetch }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const methods = useForm<{ files: FileList | undefined }>({ mode: 'all' })
  const linkColor = useColorModeValue('brand.200', 'brand.800')
  const {
    handleSubmit,
    formState: { isValid },
    reset
  } = methods
  const toast = useToast()
  const mutation = useImportSubjectsMutation((e) => toast(generateToastParams(e)))

  const onSubmitFile: SubmitHandler<{ files: FileList | undefined }> = async (values) => {
    if (values.files) {
      const formData = new FormData()
      formData.append('file', values.files[0])
      mutation.mutate(formData, {
        onSuccess: (data) => {
          toast({ title: `${data.count} darab tárgy importálva.`, status: 'success' })
          onClose()
          refetch()
        }
      })
    }
  }

  const onCancelPressed = () => {
    onClose()
    reset()
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Tárgyak importálása
      </Button>
      <Modal isOpen={isOpen} onClose={onCancelPressed} size="xl">
        <ModalOverlay />
        <ModalContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitFile)}>
              <ModalHeader>Tárgyak importálása</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text align="justify" mb={2}>
                  A tárgyakat nem szükséges egyenként létrehozni, lehet őket importálni is. Ehhez egy megfelelően formázott <b>.csv</b>{' '}
                  fájlt kell feltöltened, <b>aminek a kódolása UTF-8</b>. Excel-lel könnyű csv-t létrehozni/szerkeszteni,{' '}
                  <b>de az windows-1252 kódolásban ment alapértelmezetten!</b> Egy minta fájlt az alábbi gombbal tudsz letölteni, ezt
                  érdemes használni kiindulási alapnak, hiszen ez már tartalmazza a kötelező fejlécet és egy minta tárgyat.
                </Text>
                <Text align="justify" mb={2}>
                  A feltöltött fájl első sorának kötelezően a következőnek kell lennie: <Code>code;name;majors</Code>. Ezt követően minden
                  tárgynak egy új sorban kell szerepelnie, az adatai <b>pontosvesszővel (;)</b> elválasztva. Az adatok sorban: tárgykód,
                  tárgy neve, a szakok, ahol szerepel a tárgy. A szakokat egymástól <b>vesszővel (,)</b> kell elválasztani. A szakok
                  megnevezéséhez az alábbi karakterláncokat használd:
                </Text>
                <UnorderedList ml={6} mb={2}>
                  <SimpleGrid columns={{ sm: 1, md: 2 }}>
                    <ListItem>
                      Mérnökinfó BSc: <Code>CE_BSC</Code>
                    </ListItem>
                    <ListItem>
                      Villany BSc: <Code>EE_BSC</Code>
                    </ListItem>
                    <ListItem>
                      Üzemmérnök: <Code>BPROF</Code>
                    </ListItem>
                    <ListItem>
                      Mérnökinfó MSc: <Code>CE_MSC</Code>
                    </ListItem>
                    <ListItem>
                      Villany MSc: <Code>EE_MSC</Code>
                    </ListItem>
                    <ListItem>
                      Gazdinfó MSc: <Code>BI_MSC</Code>
                    </ListItem>
                    <ListItem>
                      Eü mérnök MSc: <Code>HI_MSC</Code>
                    </ListItem>
                    <ListItem>
                      Űrmérnök MSc: <Code>SE_MSC</Code>
                    </ListItem>
                  </SimpleGrid>
                </UnorderedList>

                <Text align="justify" mb={2}>
                  Az adatbázisban a tárgykódoknak egyedieknek kell lenniük, ezért ha az importált tárgykódok közül csak egy is szerepel már
                  az adatbázisban, hibát fogsz kapni, és egy új tárgy sem kerül létrehozásra. Ha valami probléma lenne az importálással,
                  keresd a fejlesztőket a{' '}
                  <Link color={linkColor} href="mailto://kir-dev@sch.bme.hu">
                    kir-dev@sch.bme.hu
                  </Link>{' '}
                  címen.
                </Text>

                <FileUpload required fieldName="files" buttonIcon={<FaFileCsv />} accept=".csv" />
              </ModalBody>
              <ModalFooter>
                <a href="example_import.csv" download>
                  <Button colorScheme="green">Minta fájl letöltése</Button>
                </a>

                <Spacer />
                <Button mr={3} onClick={onCancelPressed} type="button">
                  Mégse
                </Button>
                <Button colorScheme="brand" isDisabled={!isValid} isLoading={mutation.isLoading} type="submit">
                  Importálás
                </Button>
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  )
}
