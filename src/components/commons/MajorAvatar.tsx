import { Avatar } from '@chakra-ui/react'
import { SubjectModel } from '../../api/model/subject.model'
import { majorColorForIcon } from '../../pages/subjects/util/majorHelpers'
import { MajorIcon } from './MajorIcon'

type Props = {
  subject: SubjectModel
}

export const MajorAvatar = ({ subject }: Props) => {
  return (
    <Avatar
      size="md"
      bg={subject.majors.length > 1 ? 'purple.500' : majorColorForIcon[subject.majors[0]]}
      icon={<MajorIcon majors={subject.majors} />}
      src={''}
    />
  )
}
