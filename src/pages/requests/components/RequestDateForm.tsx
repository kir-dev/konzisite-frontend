import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { formatDate } from '../../../util/dateHelper'
import { CreateRequestForm } from '../types/createRequest'

export const RequestDateForm = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<CreateRequestForm>()

  const handleDatechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)

    setValue('expiryDate', date, { shouldValidate: true })
  }

  return (
    <FormControl isInvalid={!!errors.expiryDate} isRequired>
      <FormLabel>Határidő</FormLabel>
      <Stack direction={['column', 'row']}>
        <Input type="date" onChange={handleDatechange} value={formatDate(watch('expiryDate'))} />
        <Input
          {...register('expiryDate', {
            validate: (s) => s > new Date()
          })}
          hidden
        />
      </Stack>
      {!!errors.expiryDate && <FormErrorMessage>Nem lehet múltbeli határidő</FormErrorMessage>}
    </FormControl>
  )
}
