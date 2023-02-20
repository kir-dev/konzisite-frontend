import { Checkbox } from '@chakra-ui/react'
import { ChangeEvent } from 'react'
import { Major } from '../../../api/model/subject.model'
import { translateMajor } from '../../../util/majorHelpers'

type Props = {
  getCheckboxProps: (props?: Record<string, any> | undefined) => {
    [x: string]: any
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
  }
  major: Major
}

export const MajorCheckbox = ({ getCheckboxProps, major }: Props) => (
  <Checkbox colorScheme="brand" {...getCheckboxProps({ value: major })}>
    {translateMajor[major]}
  </Checkbox>
)
