import { Avatar, Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ConsultationPreview } from '../types/consultationPreview'

type Props = {
  consultation: ConsultationPreview
}

export const ConsultationListItem = ({ consultation }: Props) => {
  return (
    <Box shadow="md" borderRadius={8} borderWidth={1}>
      <Stack direction={['column', 'row']}>
        <HStack flexGrow={1} as={Link} to={`/consultations/${consultation.id}`} p={4}>
          <Avatar size="md" name={consultation.subject.name.toString()} src={''} />
          <VStack flexGrow={1}>
            <HStack justifyContent="space-between" width="100%">
              <Heading size="md">{consultation.title}</Heading>
              <Heading size="md" textAlign="right">
                {consultation.startDate.toLocaleString()} - {consultation.endDate.toLocaleTimeString()}
              </Heading>
            </HStack>
            <HStack justifyContent="space-between" width="100%">
              <Text>
                {consultation.subject.name} ({consultation.subject.code})
              </Text>
              <Text textAlign="right">
                {consultation.presentations.length <= 3
                  ? `Konzitartó${consultation.presentations.length > 1 ? 'k' : ''}:
                  ${consultation.presentations.map((p) => `${p.lastName} ${p.firstName}`).join(', ')}`
                  : `${consultation.presentations.length} konzitartó`}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Stack>
    </Box>
  )
}
