import { Avatar } from '@chakra-ui/react'
import { SubjectModel } from '../../api/model/subject.model'
import { majorColorForIcon } from '../../util/majorHelpers'
import { MajorIcon } from './MajorIcon'

type Props = {
  subject: SubjectModel
  monochrome?: boolean
}

export const MajorAvatar = ({ subject, monochrome = false }: Props) => {
  let bgcolor = subject.majors.length > 1 ? 'orange.500' : majorColorForIcon[subject.majors[0]]

  if (monochrome) bgcolor = 'gray.500'

  return <Avatar size="md" bg={bgcolor} icon={<MajorIcon majors={subject.majors} />} src={''} />
}
