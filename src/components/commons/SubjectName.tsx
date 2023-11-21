import { useTranslation } from 'react-i18next'
import { SubjectModel } from '../../api/model/subject.model'

export const generateSubjectName = (subject: SubjectModel, locale: string) => {
  if (locale === 'en' && subject.englishName) {
    return `${subject.englishName} (${subject.code})`
  }
  return `${subject.name} (${subject.code})`
}

export const SubjectName = ({ subject }: { subject: SubjectModel }) => {
  const { i18n } = useTranslation()
  return generateSubjectName(subject, i18n.language)
}
