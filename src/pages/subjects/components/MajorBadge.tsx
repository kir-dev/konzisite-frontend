import { Badge } from '@chakra-ui/react'
import { Major } from '../../../api/model/subject.model'
import { majorColor, majorVariant, translateMajor } from '../util/majorHelpers'

export const MajorBadge = ({ major }: { major: Major }) => {
  return (
    <Badge colorScheme={majorColor[major]} variant={majorVariant[major]}>
      {translateMajor[major]}
    </Badge>
  )
}
