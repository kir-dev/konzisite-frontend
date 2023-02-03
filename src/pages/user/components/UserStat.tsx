import { Stat, StatLabel, StatNumber, Tooltip } from '@chakra-ui/react'
import { FaQuestionCircle } from 'react-icons/fa'

export type StatData = {
  value: number | string
  label: string
  explanation?: string
}

type Props = {
  data: StatData
}

export const UserStat = ({ data }: Props) => (
  <Stat>
    <StatNumber>{data.value}</StatNumber>
    <StatLabel>
      {data.label}&nbsp;
      {data.explanation && (
        <Tooltip label={data.explanation} shouldWrapChildren hasArrow>
          <FaQuestionCircle />
        </Tooltip>
      )}
    </StatLabel>
  </Stat>
)
