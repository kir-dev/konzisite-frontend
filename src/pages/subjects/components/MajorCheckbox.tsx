import { Checkbox } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Major } from '../../../api/model/subject.model'

type Props = {
  getCheckboxProps: (props?: Record<string, any> | undefined) => {
    [x: string]: any
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
  }
  major: Major
}

export const MajorCheckbox = ({ getCheckboxProps, major }: Props) => {
  const { t } = useTranslation()
  return (
    <Checkbox colorScheme="brand" {...getCheckboxProps({ value: major })}>
      {t(major)}
    </Checkbox>
  )
}
