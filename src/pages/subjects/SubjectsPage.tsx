import { Box, Flex, Heading, HStack, SimpleGrid, useToast, VStack } from '@chakra-ui/react'
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

export const SubjectsPage = () => {
  const { error, data: subjects, refetch } = useFetchSubjectsQuery()
  const toast = useToast()

  const onErrorFn = (e: KonziError) => {
    toast(generateToastParams(e))
  }
  const generateSuccessFn = (successMessage: string) => () => {
    toast({ title: successMessage, status: 'success' })
    refetch()
  }

  const createSubjectMutation = useCreateSubjectMutation()
  const updateSubjectMutation = useUpdateSubjectMutation()
  const { mutate: deleteSubject } = useDeleteSubjectMutation(onErrorFn)
  if (error) {
    return <ErrorPage backPath={'/'} status={error.statusCode} title={error.message} />
  }

  return (
    <>
      <Heading size="xl" textAlign="center" mb={3}>
        Tárgyak
      </Heading>
      <Flex justify="flex-end" mb={3}>
        <SubjectEditModalButton
          buttonText="Új tárgy"
          modalTitle="Tárgy létrehozása"
          successMessage="Tárgy sikeresen létrehozva"
          mutation={createSubjectMutation}
          refetch={refetch}
        />
      </Flex>
      {subjects && subjects?.length > 0 && (
        <SimpleGrid columns={{ sm: 1, md: 2 }} gap={4}>
          {subjects?.map((s) => (
            <Box key={s.id} shadow="md" borderRadius={8} borderWidth={1} p={4}>
              <HStack justify="space-between">
                <VStack align="flex-start" flexGrow={1}>
                  <Heading size="md">
                    {s.name} ({s.code})
                  </Heading>
                  <HStack wrap="wrap" alignContent="space-between" justify="flex-start">
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
