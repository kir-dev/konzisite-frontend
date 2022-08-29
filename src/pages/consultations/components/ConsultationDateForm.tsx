import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon, Stack } from '@chakra-ui/react'
import React from 'react'

type Props = {
  startDate: Date
  endDate: Date
  setStartDate: (date: Date) => void
  setEndDate: (date: Date) => void
  startDateError: boolean
  endDateError: boolean
}

export const ConsultationDateForm = ({ startDate, endDate, setStartDate, setEndDate, startDateError, endDateError }: Props) => {
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
    let start = new Date(startDate)
    let end = new Date(endDate)

    start.setFullYear(date.getFullYear())
    end.setFullYear(date.getFullYear())
    start.setMonth(date.getMonth())
    end.setMonth(date.getMonth())
    start.setDate(date.getDate())
    end.setDate(date.getDate())

    setStartDate(start)
    setEndDate(end)
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value.split(':')[0])
    const minutes = parseInt(e.target.value.split(':')[1])
    let start = new Date(startDate)

    start.setHours(hours)
    start.setMinutes(minutes)

    setStartDate(start)
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value.split(':')[0])
    const minutes = parseInt(e.target.value.split(':')[1])
    let end = new Date(endDate)

    end.setHours(hours)
    end.setMinutes(minutes)

    setEndDate(end)
  }

  return (
    <FormControl isInvalid={startDateError || endDateError} isRequired>
      <FormLabel>Időpont</FormLabel>
      <Stack direction={['column', 'row']}>
        <Input type="date" onChange={handleDatechange} value={formatDate(startDate)} />
        <InputGroup>
          <InputLeftAddon children="Kezdés" width="100px" />
          <Input type="time" onChange={handleStartTimeChange} value={formatTime(startDate)} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Vége" width="100px" />
          <Input type="time" onChange={handleEndTimeChange} value={formatTime(endDate)} />
        </InputGroup>
      </Stack>
      <FormErrorMessage>{startDateError ? 'Nem lehet múltbeli kezdés' : 'Befejezés nem lehet korábban, mint kezdés'}</FormErrorMessage>
    </FormControl>
  )
}
