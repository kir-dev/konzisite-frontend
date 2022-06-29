import { GroupModel, GroupRoles } from '../../api/model/group.model'
import { UserModel } from '../../api/model/user.model'

export const testGroups: GroupModel[] = [
  {
    id: 1,
    name: 'Legjobb csoport',
    owner: {
      id: 4,
      authSchId: 'abc',
      firstName: 'Elek',
      lastName: 'Teszt',
      email: 'elek@example.com'
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'elek@example.com',
        joinedAt: new Date('2021-01-01'),
        role: GroupRoles.MEMBER
      }
    ],
    createdAt: new Date('2021-01-01'),
    consultations: []
  },
  {
    id: 2,
    name: 'Másik csoport',
    owner: {
      id: 2,
      authSchId: '123abc',
      firstName: 'Pista',
      lastName: 'Kis',
      email: 'pistike@gmail.com'
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'elek@example.com',
        joinedAt: new Date('2022-01-01'),
        role: GroupRoles.MEMBER
      },
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        lastName: 'Kis',
        email: 'pistike@gmail.com',
        joinedAt: new Date('2021-05-29'),
        role: GroupRoles.ADMIN
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2021-05-29'),
        role: GroupRoles.ADMIN
      }
    ],
    createdAt: new Date('2021-05-29'),
    consultations: []
  },
  {
    id: 5,
    name: 'Még egy csoport',
    owner: {
      id: 7,
      authSchId: 'asdf',
      firstName: 'Jakab',
      lastName: 'Gipsz',
      email: 'info@gipszjakab.io'
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'elek@example.com',
        joinedAt: new Date('2022-05-17'),
        role: GroupRoles.PENDING
      },
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        lastName: 'Kis',
        email: 'pistike@gmail.com',
        joinedAt: new Date('2022-05-29'),
        role: GroupRoles.MEMBER
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2022-05-15'),
        role: GroupRoles.ADMIN
      },
      {
        id: 8,
        authSchId: 'aaaa',
        firstName: 'János',
        lastName: 'Antal',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2022-05-15'),
        role: GroupRoles.ADMIN
      }
    ],
    createdAt: new Date('2022-05-15'),
    consultations: []
  }
]

export const currentUser: UserModel = {
  id: 7,
  authSchId: 'asdf',
  firstName: 'Jakab',
  lastName: 'Gipsz',
  email: 'info@gipszjakab.io'
}
