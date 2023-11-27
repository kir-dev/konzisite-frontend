import { Badge, StackItem } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { Major } from '../../../api/model/subject.model'
import { majorColor, majorVariant } from '../../../util/majorHelpers'

export const MajorBadge = ({ major }: { major: Major }) => {
  const { t } = useTranslation()
  return (
    <StackItem>
      <Badge ml={0} mr={2} mb={1} colorScheme={majorColor[major]} variant={majorVariant[major]}>
        {t(major)}
      </Badge>
    </StackItem>
  )
}
