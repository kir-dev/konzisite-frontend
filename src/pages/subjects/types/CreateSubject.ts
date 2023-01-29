import { Major } from '../../../api/model/subject.model'

export interface CreateSubject {
  code: string
  name: string
  majors: Major[]
}
