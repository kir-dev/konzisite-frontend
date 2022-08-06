import { GroupModel } from '../../api/model/group.model'
import { UserModel } from '../../api/model/user.model'

export const testGroups: GroupModel[] = [
  /*{
    id: 1,
    name: 'Legjobb csoport',
    owner: {
      id: 4,
      authSchId: 'abc',
      firstName: 'Elek',
      lastName: 'Teszt',
      email: 'elek@example.com',
      ownedConsultations: [],
      ratings: []
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'elek@example.com',
        joinedAt: new Date('2021-01-01'),
        role: GroupRoles.MEMBER,
        ownedConsultations: [],
        ratings: []
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
      email: 'pistike@gmail.com',
      ownedConsultations: [],
      ratings: []
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'elek@example.com',
        joinedAt: new Date('2022-01-01'),
        role: GroupRoles.MEMBER,
        ownedConsultations: [],
        ratings: []
      },
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        lastName: 'Kis',
        email: 'pistike@gmail.com',
        joinedAt: new Date('2021-05-29'),
        role: GroupRoles.ADMIN,
        ownedConsultations: [],
        ratings: []
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2021-05-29'),
        role: GroupRoles.ADMIN,
        ownedConsultations: [],
        ratings: []
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
      email: 'info@gipszjakab.io',
      ownedConsultations: [],
      ratings: []
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'elek@example.com',
        joinedAt: new Date('2022-05-17'),
        role: GroupRoles.PENDING,
        ownedConsultations: [],
        ratings: []
      },
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        lastName: 'Kis',
        email: 'pistike@gmail.com',
        joinedAt: new Date('2022-05-29'),
        role: GroupRoles.MEMBER,
        ownedConsultations: [],
        ratings: []
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        lastName: 'Gipsz',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2022-05-15'),
        role: GroupRoles.ADMIN,
        ownedConsultations: [],
        ratings: []
      },
      {
        id: 8,
        authSchId: 'aaaa',
        firstName: 'János',
        lastName: 'Antal',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2022-05-15'),
        role: GroupRoles.ADMIN,
        ownedConsultations: [],
        ratings: []
      }
    ],
    createdAt: new Date('2022-05-15'),
    consultations: []
  }*/
]

export const currentUser: UserModel = {
  id: 7,
  authSchId: 'asdf',
  firstName: 'Jakab',
  lastName: 'Gipsz',
  email: 'info@gipszjakab.io'
  //ownedConsultations: [],
  //ratings: []
}
