import { useEffect, useState } from 'react'
import { ConsultationModel } from '../../api/model/consultation.model'
import { ConsultationRequestModel } from '../../api/model/consultationrequest.model'
import { GroupModel } from '../../api/model/group.model'
import { RatingModel } from '../../api/model/rating.model'
import { Major, SubjectModel } from '../../api/model/subject.model'
import { UserModel } from '../../api/model/user.model'

type ConsultationFullDetails = ConsultationModel & {
  presentations: {
    user: UserModel
    ratings: (RatingModel & {
      ratedBy: UserModel
    })[]
  }[]
  participants: UserModel[]
  owner: UserModel
  targetGroups: GroupModel[]
  subject: SubjectModel
  request?: ConsultationRequestModel
}

const konzi: ConsultationFullDetails = {
  id: 1,
  location: 'e',
  startDate: new Date(),
  endDate: new Date(),
  descMarkdown: 'very nice',
  subject: {
    id: 2,
    code: 'VIAU34564',
    name: 'bsz',
    majors: [Major.CE_BSC]
  },
  owner: {
    id: 1,
    authSchId: 'abc',
    firstName: 'Elek',
    lastName: 'Teszt',
    email: 'abc@cba.com'
  },
  presentations: [
    {
      user: {
        id: 1,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'abc@cba.com'
      },
      ratings: [
        {
          id: 1,
          value: 5,
          text: 'nice',
          ratedBy: {
            id: 2,
            authSchId: 'def',
            firstName: 'gdfs',
            lastName: 'dfs',
            email: 'abc@cba.com'
          }
        }
      ]
    }
  ],
  participants: [
    {
      id: 2,
      authSchId: 'def',
      firstName: 'gdfs',
      lastName: 'dfs',
      email: 'abc@cba.com'
    }
  ],
  targetGroups: []
}

export const ConsultationDetailsPage = () => {
  const [consultaion, setConsultation] = useState<ConsultationFullDetails>()
  useEffect(() => {
    //setConsultations(axios.get<ConsultationFullDetails>("/consultaions/id"))
  }, [])

  return null
}
