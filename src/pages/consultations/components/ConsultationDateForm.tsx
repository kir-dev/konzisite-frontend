import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { formatDate, formatTime } from '../../../util/dateHelper'
import { CreateConsultationForm } from '../types/createConsultation'

type Props = {
  prevStartDate?: Date
}

export const ConsultationDateForm = ({ prevStartDate }: Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<CreateConsultationForm>()
  const { t } = useTranslation()

  const handleDatechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    const start = new Date(watch('startDate'))
    const end = new Date(watch('endDate'))

    start.setFullYear(date.getFullYear())
    end.setFullYear(date.getFullYear())
    start.setMonth(date.getMonth())
    end.setMonth(date.getMonth())
    start.setDate(date.getDate())
    end.setDate(date.getDate())

    setValue('startDate', start, { shouldValidate: true })
    setValue('endDate', end, { shouldValidate: true })
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value.split(':')[0])
    const minutes = parseInt(e.target.value.split(':')[1])
    const start = new Date(watch('startDate'))

    start.setHours(hours)
    start.setMinutes(minutes)

    setValue('startDate', start, { shouldValidate: true })
    setValue('endDate', watch('endDate'), { shouldValidate: true })
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value.split(':')[0])
    const minutes = parseInt(e.target.value.split(':')[1])
    const end = new Date(watch('endDate'))

    end.setHours(hours)
    end.setMinutes(minutes)

    setValue('endDate', end, { shouldValidate: true })
    setValue('startDate', watch('startDate'), { shouldValidate: true })
  }

  return (
    <FormControl isInvalid={!!errors.startDate || !!errors.endDate} isRequired>
      <FormLabel>{t('konziDateForm.date')}</FormLabel>
      <Stack direction={['column', 'row']}>
        <Input type="date" onChange={handleDatechange} value={formatDate(watch('startDate'))} />
        <InputGroup>
          <InputLeftAddon children={t('konziDateForm.start')} width="100px" />
          <Input type="time" onChange={handleStartTimeChange} value={formatTime(watch('startDate'))} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children={t('konziDateForm.end')} width="100px" />
          <Input type="time" onChange={handleEndTimeChange} value={formatTime(watch('endDate'))} />
        </InputGroup>
        <Input
          {...register('startDate', {
            validate: (s) => (prevStartDate && prevStartDate < new Date() ? true : s > new Date())
          })}
          hidden
        />
        <Input {...register('endDate', { validate: (e) => e > watch('startDate') })} hidden />
      </Stack>
      {(!!errors.startDate || !!errors.endDate) && (
        <FormErrorMessage>{!!errors.startDate ? t('konziDateForm.noPastStart') : t('konziDateForm.noEndBeforeStart')}</FormErrorMessage>
      )}
    </FormControl>
  )
}
