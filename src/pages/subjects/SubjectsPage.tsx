import { Box, Heading, HStack, Select, SimpleGrid, Stack, useToast, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import {
  useCreateSubjectMutation,
  useDeleteSubjectMutation,
  useFetchSubjectsQuery,
  useUpdateSubjectMutation
} from '../../api/hooks/subjectHooks'
import { KonziError } from '../../api/model/error.model'
import { generateToastParams } from '../../util/generateToastParams'
import { ErrorPage } from '../error/ErrorPage'
import { MajorBadge } from './components/MajorBadge'
import { SubjectEditModalButton } from './components/SubjectEditModalButton'
import { UploadCSVModalButton } from './components/UploadCSVModalButton'
import { MajorArray, translateMajor } from './util/majorHelpers'

export const SubjectsPage = () => {
  const { error, data: subjects, refetch } = useFetchSubjectsQuery()
  const [selectedMajor, setSelectedMajor] = useState<string>('all')
  const toast = useToast()

  const createSubjectMutation = useCreateSubjectMutation()
  const updateSubjectMutation = useUpdateSubjectMutation()
  const { mutate: deleteSubject } = useDeleteSubjectMutation((e: KonziError) => {
    toast(generateToastParams(e))
  })
  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.message} />
  }

  return (
    <>
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
          <UploadCSVModalButton refetch={refetch} />
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
