import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const ConsultationDateForm = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext()

  const formatDate = (date: Date) => {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    const year = date.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const formatTime = (date: Date) => {
    let hour = '' + date.getHours()
    let minute = '' + date.getMinutes()

    if (hour.length < 2) hour = '0' + hour
    if (minute.length < 2) minute = '0' + minute

    return [hour, minute].join(':')
  }

  const handleDatechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value)
    let start = new Date(watch('startDate'))
    let end = new Date(watch('endDate'))

    start.setFullYear(date.getFullYear())
    end.setFullYear(date.getFullYear())
    start.setMonth(date.getMonth())
    end.setMonth(date.getMonth())
    start.setDate(date.getDate())
    end.setDate(date.getDate())

    setValue('startDate', start)
    setValue('endtDate', end)
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value.split(':')[0])
    const minutes = parseInt(e.target.value.split(':')[1])
    let start = new Date(watch('startDate'))

    start.setHours(hours)
    start.setMinutes(minutes)

    setValue('startDate', start)
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value.split(':')[0])
    const minutes = parseInt(e.target.value.split(':')[1])
    let end = new Date(watch('endDate'))

    end.setHours(hours)
    end.setMinutes(minutes)

    setValue('endDate', end)
  }

  return (
    <FormControl isInvalid={!!errors['startDate'] || !!errors['endDate']} isRequired>
      <FormLabel>Időpont</FormLabel>
      <Stack direction={['column', 'row']}>
        <Input type="date" onChange={handleDatechange} value={formatDate(watch('startDate'))} />
        <InputGroup>
          <InputLeftAddon children="Kezdés" width="100px" />
          <Input type="time" onChange={handleStartTimeChange} value={formatTime(watch('startDate'))} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Vége" width="100px" />
          <Input type="time" onChange={handleEndTimeChange} value={formatTime(watch('endDate'))} />
        </InputGroup>
        <Input {...register('startDate', { validate: (s) => s > new Date() })} hidden></Input>
        <Input {...register('endDate', { validate: (e) => e > watch('startDate') })} hidden></Input>
      </Stack>
      {(!!errors['startDate'] || !!errors['endDate']) && (
        <FormErrorMessage>
          {!!errors['startDate'] ? 'Nem lehet múltbeli kezdés' : 'Befejezés nem lehet korábban, mint kezdés'}
        </FormErrorMessage>
      )}
    </FormControl>
  )
}
