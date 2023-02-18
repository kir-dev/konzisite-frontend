import { CalendarIcon } from '@chakra-ui/icons'
import { TabPanel, Text } from '@chakra-ui/react'
import { ConsultationPreview } from '../types/consultationPreview'

type Props = {
  consultaions: ConsultationPreview[] | undefined
}

export const ConsultationsCalendarPanel = ({ consultaions }: Props) => {
  return (
    <TabPanel px={0}>
      <Text>Naptár</Text>
      <CalendarIcon />
    </TabPanel>
  )
}
