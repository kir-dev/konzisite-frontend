import {
  Box,
  Button,
  Code,
  Heading,
  HStack,
  Link,
  ListItem,
  Select,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
  useToast,
  VStack
} from '@chakra-ui/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaEdit } from 'react-icons/fa'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useFetchSubjectsQuery,
  useImportSubjectsMutation,
  useUpdateSubjectMutation
} from '../../api/hooks/subjectHooks'
import { KonziError } from '../../api/model/error.model'
import { generateToastParams } from '../../util/generateToastParams'
import { PATHS } from '../../util/paths'
import { ErrorPage } from '../error/ErrorPage'
import { MajorBadge } from './components/MajorBadge'
import { SubjectEditModalButton } from './components/SubjectEditModalButton'
import { UploadFileModalButton } from './components/UploadFileModalButton'
import { MajorArray, translateMajor } from './util/majorHelpers'

export const SubjectsPage = () => {
  const { error, data: subjects, refetch } = useFetchSubjectsQuery()
  const [selectedMajor, setSelectedMajor] = useState<string>('all')
  const toast = useToast()
  const { loggedInUser } = useAuthContext()

  const createSubjectMutation = useCreateSubjectMutation()
  const updateSubjectMutation = useUpdateSubjectMutation()
  const importSubjectsmutation = useImportSubjectsMutation(
    (e) => toast(generateToastParams(e)),
    (data) => {
      toast({ title: `${data.count} darab tárgy importálva.`, status: 'success' })
      refetch()
    }
  )
  const { mutate: deleteSubject } = useDeleteSubjectMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })

  if (error) {
    return <ErrorPage backPath={PATHS.INDEX} status={error.statusCode} title={error.message} />
  }
  if (!loggedInUser?.isAdmin) {
    return <ErrorPage backPath={PATHS.INDEX} status={403} title="Nincs jogosultságod az oldal megtekintéséhez" />
  }

  return (
    <>
      <Helmet title="Tárgyak" />
      <Heading size="xl" textAlign="center" mb={3}>
        Tárgyak
      </Heading>
      <Stack direction={['column', 'row']} mb={3} justifyContent="space-between">
        <Box>
          <Select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
            <option value="all">Minden szak</option>
            {MajorArray.map((m) => (
              <option key={m} value={m}>
                {translateMajor[m]}
              </option>
            ))}
          </Select>
        </Box>

        <HStack>
          <UploadFileModalButton
            mutation={importSubjectsmutation}
            modalTitle="Tárgyak importálása"
            confirmButtonText="Importálás"
            extraButton={
              <a href="example_import.csv" download>
                <Button colorScheme="green">Minta fájl letöltése</Button>
              </a>
            }
          >
            <Text align="justify" mb={2}>
              A tárgyakat nem szükséges egyenként létrehozni, lehet őket importálni is. Ehhez egy megfelelően formázott <b>.csv</b> fájlt
              kell feltöltened, <b>aminek a kódolása UTF-8</b>. Excel-lel könnyű csv-t létrehozni/szerkeszteni,{' '}
              <b>de az windows-1252 kódolásban ment alapértelmezetten!</b> Egy minta fájlt az alábbi gombbal tudsz letölteni, ezt érdemes
              használni kiindulási alapnak, hiszen ez már tartalmazza a kötelező fejlécet és egy minta tárgyat.
            </Text>
            <Text align="justify" mb={2}>
              A feltöltött fájl első sorának kötelezően a következőnek kell lennie: <Code>code;name;majors</Code>. Ezt követően minden
              tárgynak egy új sorban kell szerepelnie, az adatai <b>pontosvesszővel (;)</b> elválasztva. Az adatok sorban: tárgykód, tárgy
              neve, a szakok, ahol szerepel a tárgy. A szakokat egymástól <b>vesszővel (,)</b> kell elválasztani. A szakok megnevezéséhez az
              alábbi karakterláncokat használd:
            </Text>
            <UnorderedList ml={6} mb={2}>
              <SimpleGrid columns={{ sm: 1, md: 2 }}>
                {[
                  MajorArray.map((m) => (
                    <ListItem key={m}>
                      {translateMajor[m]}: <Code>{m}</Code>
                    </ListItem>
                  ))
                ]}
              </SimpleGrid>
            </UnorderedList>

            <Text align="justify" mb={2}>
              Az adatbázisban a tárgykódoknak egyedieknek kell lenniük, ezért ha az importált tárgykódok közül csak egy is szerepel már az
              adatbázisban, hibát fogsz kapni, és egy új tárgy sem kerül létrehozásra. Ha valami probléma lenne az importálással, keresd a
              fejlesztőket a{' '}
              <Link color="brand.200" href="mailto://kir-dev@sch.bme.hu">
                kir-dev@sch.bme.hu
              </Link>{' '}
              címen.
            </Text>
          </UploadFileModalButton>
          <SubjectEditModalButton
            buttonText="Új tárgy"
            modalTitle="Tárgy létrehozása"
            successMessage="Tárgy sikeresen létrehozva"
            mutation={createSubjectMutation}
            refetch={refetch}
          />
        </HStack>
      </Stack>
      {subjects && subjects?.length > 0 && (
        <SimpleGrid columns={{ sm: 1, md: 2 }} gap={4}>
          {subjects
            ?.filter((s) => s.majors.some((m) => m === selectedMajor) || selectedMajor === 'all')
            .map((s) => (
              <Box key={s.id} shadow="md" borderRadius={8} borderWidth={1} p={4}>
                <HStack justify="space-between">
                  <VStack align="flex-start" flexGrow={1}>
                    <Heading size="md">
                      {s.name} ({s.code})
                    </Heading>
                    <HStack spacing={0} wrap="wrap" alignContent="space-between" justify="flex-start">
                      {s.majors.map((m) => (
                        <MajorBadge major={m} key={m} />
                      ))}
                    </HStack>
                  </VStack>

                  <SubjectEditModalButton
                    buttonIcon={<FaEdit />}
                    buttonText="Tárgy szerkesztése"
                    modalTitle="Tárgy szerkesztése"
                    successMessage="Tárgy sikeresen frissítve"
                    mutation={updateSubjectMutation}
                    previousData={s}
                    refetch={refetch}
                    deleteAction={deleteSubject}
                  />
                </HStack>
              </Box>
            ))}
        </SimpleGrid>
      )}
    </>
  )
}
