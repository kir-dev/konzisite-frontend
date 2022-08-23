import { Major, SubjectModel } from '../../api/model/subject.model'
import { UserModel } from '../../api/model/user.model'
import { ConsultationDetails, Presentation } from './types/consultationDetails'
import { ConsultationPreview } from './types/consultationPreview'

export const testConsultationPreview: ConsultationPreview[] = [
  {
    id: 1,
    location: '814',
    startDate: new Date('2021-11-12T16:00:00Z'),
    endDate: new Date('2021-11-12T18:00:00Z'),
    name: 'Prog 1 2. ZH felkészítés',
    descMarkdown: `# Konzi anyaga
    - anyag átnézése
    - gyakorlati példák vizsgálata
    - kérdések
    Egyéb infók [itt](https://example.com/).`,
    subject: {
      id: 2,
      code: 'VIEEAA00',
      name: 'A programozás alapjai 1',
      majors: [Major.CE_BSC]
    },
    presentations: [
      {
        id: 1,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'abc@cba.com',
        averageRating: 4.6
      }
    ]
  },
  {
    id: 2,
    location: '1317',
    startDate: new Date('2022-02-12T16:00:00Z'),
    endDate: new Date('2022-02-12T18:00:00Z'),
    name: 'Prog 2 előadás összeofglaló',
    descMarkdown: `# Konzi anyaga
    - anyag átnézése
    - gyakorlati példák vizsgálata
    - kérdések
    Egyéb infók [itt](https://wow.iit.bme.hu/~szebi/).`,
    subject: {
      id: 6,
      code: 'VIIIA114',
      name: 'A programozás alapjai 2',
      majors: [Major.CE_BSC]
    },
    presentations: [
      {
        id: 1,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'abc@cba.com',
        averageRating: 4.6
      },
      {
        id: 2,
        authSchId: 'ddd',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'hello@gmail.com',
        averageRating: 4.2
      }
    ]
  },
  {
    id: 4,
    location: '817',
    startDate: new Date('2022-02-12T16:00:00Z'),
    endDate: new Date('2022-02-12T18:00:00Z'),
    name: 'Digit vizsgára készülés',
    descMarkdown: ``,
    subject: {
      id: 3,
      code: 'VIMIAA02',
      name: 'Digitális technika',
      majors: [Major.CE_BSC]
    },
    presentations: [
      {
        id: 6,
        authSchId: 'lll',
        firstName: 'Pista',
        lastName: 'Kis',
        email: 'abc@cba.com',
        averageRating: 5
      },
      {
        id: 2,
        authSchId: 'ddd',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'hello@gmail.com',
        averageRating: 4.2
      }
    ]
  }
]

export const testConsultationDetails: ConsultationDetails[] = [
  {
    id: 1,
    location: '814',
    startDate: new Date('2021-11-12T16:00:00Z'),
    endDate: new Date('2021-11-12T18:00:00Z'),
    name: 'Prog 1 2. ZH felkészítés',
    descMarkdown:
      '## Konzi anyaga\n- anyag átnézése\n- gyakorlati példák vizsgálata\n- kérdések\n\nEgyéb infók [itt](https://example.com/).',
    subject: {
      id: 2,
      code: 'VIEEAA00',
      name: 'A programozás alapjai 1',
      majors: [Major.CE_BSC]
    },
    presentations: [
      {
        id: 1,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'abc@cba.com',
        averageRating: 4.6
      }
    ],
    owner: {
      id: 1,
      authSchId: 'abc',
      firstName: 'Elek',
      lastName: 'Teszt',
      email: 'abc@cba.com'
    },
    participants: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'elek@example.com'
      },
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        lastName: 'Kis',
        email: 'pistike@gmail.com'
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'info@gipszjakab.io'
      },
      {
        id: 8,
        authSchId: 'aaaa',
        firstName: 'János',
        lastName: 'Antal',
        email: 'info@gipszjakab.io'
      }
    ],
    targetGroups: []
  },
  {
    id: 2,
    location: '1317',
    startDate: new Date('2022-02-12T16:00:00Z'),
    endDate: new Date('2022-02-12T18:00:00Z'),
    name: 'Prog 2 előadás összeofglaló',
    descMarkdown:
      '## Konzi anyaga\n- anyag átnézése\n- gyakorlati példák vizsgálata\n- kérdések\n\nEgyéb infók [itt](https://example.com/).',
    subject: {
      id: 6,
      code: 'VIIIA114',
      name: 'A programozás alapjai 2',
      majors: [Major.CE_BSC]
    },
    presentations: [
      {
        id: 1,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'abc@cba.com',
        averageRating: 4.6
      },
      {
        id: 2,
        authSchId: 'ddd',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'hello@gmail.com',
        averageRating: 4.2
      }
    ],
    owner: {
      id: 7,
      authSchId: 'asdf',
      firstName: 'Jakab',
      lastName: 'Gipsz',
      email: 'info@gipszjakab.io'
    },
    participants: [
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        lastName: 'Kis',
        email: 'pistike@gmail.com'
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'info@gipszjakab.io'
      }
    ],
    targetGroups: [
      {
        id: 1,
        name: 'Legjobb csoport',
        createdAt: new Date('2021-01-01')
      }
    ],
    request: {
      id: 4,
      descMarkdown: 'pls segíts!!',
      expiryDate: new Date('2022-03-12T18:00:00Z')
    }
  },
  {
    id: 4,
    location: '817',
    startDate: new Date('2022-02-12T16:00:00Z'),
    endDate: new Date('2022-02-12T18:00:00Z'),
    name: 'Digit vizsgára készülés',
    descMarkdown: ``,
    subject: {
      id: 3,
      code: 'VIMIAA02',
      name: 'Digitális technika',
      majors: [Major.CE_BSC]
    },
    presentations: [
      {
        id: 6,
        authSchId: 'lll',
        firstName: 'Pista',
        lastName: 'Kis',
        email: 'abc@cba.com',
        averageRating: 5
      },
      {
        id: 2,
        authSchId: 'ddd',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'hello@gmail.com',
        averageRating: 4.2
      }
    ],
    owner: {
      id: 6,
      authSchId: 'lll',
      firstName: 'Pista',
      lastName: 'Kis',
      email: 'abc@cba.com'
    },
    participants: [],
    targetGroups: []
  }
]

export const currentUser: UserModel = {
  id: 7,
  authSchId: 'asdf',
  firstName: 'Jakab',
  lastName: 'Gipsz',
  email: 'info@gipszjakab.io'
}

export const testSubjects: SubjectModel[] = [
  {
    id: 2,
    code: 'VIEEAA00',
    name: 'A programozás alapjai 1',
    majors: [Major.CE_BSC]
  },
  {
    id: 6,
    code: 'VIIIA114',
    name: 'A programozás alapjai 2',
    majors: [Major.CE_BSC]
  },
  {
    id: 3,
    code: 'VIMIAA02',
    name: 'Digitális technika',
    majors: [Major.CE_BSC]
  }
]

export const testPresenters: Presentation[] = [
  {
    id: 1,
    authSchId: 'abc',
    firstName: 'Elek',
    lastName: 'Teszt',
    email: 'abc@cba.com',
    averageRating: 4.6
  },
  {
    id: 2,
    authSchId: 'ddd',
    firstName: 'Jakab',
    lastName: 'Gipsz',
    email: 'hello@gmail.com',
    averageRating: 4.2
  },
  {
    id: 3,
    authSchId: 'lll',
    firstName: 'Pista',
    lastName: 'Kis',
    email: 'abc@cba.com',
    averageRating: 5
  }
]
