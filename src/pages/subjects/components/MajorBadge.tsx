import { Badge, StackItem } from '@chakra-ui/react'
import { Major } from '../../../api/model/subject.model'
import { majorColor, majorVariant, translateMajor } from '../util/majorHelpers'

export const MajorBadge = ({ major }: { major: Major }) => {
  return (
    <StackItem>
      <Badge ml={0} mr={2} mb={1} colorScheme={majorColor[major]} variant={majorVariant[major]}>
        {translateMajor[major]}
      </Badge>
    </StackItem>
  )
}
