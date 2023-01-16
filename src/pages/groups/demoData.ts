import { GroupRoles } from '../../api/model/group.model'
import { UserModel } from '../../api/model/user.model'
import { GroupDetails } from './types/groupDetails'
import { GroupPreview } from './types/groupPreview'

export const testGroupsDetails: GroupDetails[] = [
  {
    id: 1,
    name: 'Legjobb csoport',
    owner: {
      id: 4,
      authSchId: 'abc',
      firstName: 'Elek',
      fullName: 'Teszt Elek',
      email: 'elek@example.com'
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        fullName: 'Teszt Elek',
        email: 'elek@example.com',
        joinedAt: new Date('2021-01-01'),
        role: GroupRoles.MEMBER
      }
    ],
    currentUserRole: GroupRoles.NONE,
    createdAt: new Date('2021-01-01')
  },
  {
    id: 2,
    name: 'Másik csoport',
    owner: {
      id: 2,
      authSchId: '123abc',
      firstName: 'Pista',
      fullName: 'Kis Pista',
      email: 'pistike@gmail.com'
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        fullName: 'Teszt Elek',
        email: 'elek@example.com',
        joinedAt: new Date('2022-01-01'),
        role: GroupRoles.MEMBER
      },
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        fullName: 'Kis Pista',
        email: 'pistike@gmail.com',
        joinedAt: new Date('2021-05-29'),
        role: GroupRoles.ADMIN
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        fullName: 'Gipsz Jakab',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2021-05-29'),
        role: GroupRoles.ADMIN
      }
    ],
    currentUserRole: GroupRoles.ADMIN,
    createdAt: new Date('2021-05-29')
  },
  {
    id: 5,
    name: 'Még egy csoport',
    owner: {
      id: 7,
      authSchId: 'asdf',
      firstName: 'Jakab',
      fullName: 'Gipsz Jakab',
      email: 'info@gipszjakab.io'
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        fullName: 'Teszt Elek',
        email: 'elek@example.com',
        joinedAt: new Date('2022-05-17'),
        role: GroupRoles.PENDING
      },
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        fullName: 'Kis Pista',
        email: 'pistike@gmail.com',
        joinedAt: new Date('2022-05-29'),
        role: GroupRoles.MEMBER
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        fullName: 'Gipsz Jakab',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2022-05-15'),
        role: GroupRoles.OWNER
      },
      {
        id: 8,
        authSchId: 'aaaa',
        firstName: 'János',
        fullName: 'Antal János',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2022-05-15'),
        role: GroupRoles.ADMIN
      }
    ],
    currentUserRole: GroupRoles.OWNER,
    createdAt: new Date('2022-05-15')
  },
  {
    id: 8,
    name: 'Nagyon érdekes csoport',
    owner: {
      id: 4,
      authSchId: 'abc',
      firstName: 'Elek',
      fullName: 'Teszt Elek',
      email: 'elek@example.com'
    },
    members: [
      {
        id: 4,
        authSchId: 'abc',
        firstName: 'Elek',
        fullName: 'Teszt Elek',
        email: 'elek@example.com',
        joinedAt: new Date('2022-05-17'),
        role: GroupRoles.OWNER
      },
      {
        id: 2,
        authSchId: '123abc',
        firstName: 'Pista',
        fullName: 'Kis Pista',
        email: 'pistike@gmail.com',
        joinedAt: new Date('2022-05-29'),
        role: GroupRoles.MEMBER
      },
      {
        id: 7,
        authSchId: 'asdf',
        firstName: 'Jakab',
        fullName: 'Gipsz Jakab',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2022-05-15'),
        role: GroupRoles.PENDING
      },
      {
        id: 8,
        authSchId: 'aaaa',
        firstName: 'János',
        fullName: 'Antal János',
        email: 'info@gipszjakab.io',
        joinedAt: new Date('2022-05-15'),
        role: GroupRoles.ADMIN
      }
    ],
    currentUserRole: GroupRoles.PENDING,
    createdAt: new Date('2022-08-15')
  }
]

export const testGroupsPreview: GroupPreview[] = [
  {
    id: 1,
    name: 'Legjobb csoport',
    owner: {
      id: 4,
      authSchId: 'abc',
      firstName: 'Elek',
      fullName: 'Teszt Elek',
      email: 'elek@example.com'
    },
    memberCount: 1,
    currentUserRole: GroupRoles.NONE,
    createdAt: new Date('2021-01-01')
  },
  {
    id: 2,
    name: 'Másik csoport',
    owner: {
      id: 2,
      authSchId: '123abc',
      firstName: 'Pista',
      fullName: 'Kis Pista',
      email: 'pistike@gmail.com'
    },
    memberCount: 3,
    currentUserRole: GroupRoles.ADMIN,
    createdAt: new Date('2021-05-29')
  },
  {
    id: 5,
    name: 'Még egy csoport',
    owner: {
      id: 7,
      authSchId: 'asdf',
      firstName: 'Jakab',
      fullName: 'Gipsz Jakab',
      email: 'info@gipszjakab.io'
    },
    memberCount: 4,
    currentUserRole: GroupRoles.OWNER,
    createdAt: new Date('2022-05-15')
  },
  {
    id: 8,
    name: 'Nagyon érdekes csoport',
    owner: {
      id: 4,
      authSchId: 'abc',
      firstName: 'Elek',
      fullName: 'Teszt Elek',
      email: 'elek@example.com'
    },
    memberCount: 4,
    currentUserRole: GroupRoles.PENDING,
    createdAt: new Date('2022-08-15')
  }
]

export const currentUser: UserModel = {
  id: 7,
  authSchId: 'asdf',
  firstName: 'Jakab',
  fullName: 'Gipsz Jakab',
  email: 'info@gipszjakab.io'
  //ownedConsultations: [],
  //ratings: []
}
