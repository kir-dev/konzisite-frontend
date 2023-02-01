import { Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { Major } from '../../api/model/subject.model'
import { ConsultationListItem } from './components/ConsultationListItem'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'
import { UserDetails } from './types/UserDetails'

const mockProfile: UserDetails = {
  id: 1,
  isAdmin: false,
  fullName: 'Appleseed John',
  presentations: [
    {
      id: 1,
      archived: false,
      location: '1317 tanuló',
      startDate: new Date().toDateString(),
      endDate: new Date().toDateString(),
      name: 'konzi',
      descMarkdown: 'nagyon érdekes konzi',
      subject: {
        id: 2,
        code: 'VIAU34564',
        name: 'bsz',
        majors: [Major.CE_BSC]
      },
      ratings: [
        {
          id: 1,
          value: 5,
          text: 'Yeaaah, eleg jo volt',
          anonymous: false,
          rater: {
            id: 1,
            fullName: 'Teszt Elek'
          }
        },
        {
          id: 2,
          value: 5,
          text: 'Yeaaah, eleg jo volt szerintem is',
          anonymous: false,
          rater: {
            id: 2,
            fullName: 'Teszt Elek2'
          }
        }
      ]
    },
    {
      id: 2,
      archived: false,
      location: '1317 tanuló',
      startDate: new Date().toDateString(),
      endDate: new Date().toDateString(),
      name: 'még egy konzi',
      descMarkdown: 'kicsit érdekes konzi',
      subject: {
        id: 2,
        code: 'VIAU34564',
        name: 'grafika',
        majors: [Major.CE_BSC]
      },
      ratings: [
        {
          id: 3,
          value: 3,
          text: 'Eleg uncsi volt ://',
          anonymous: false,
          rater: {
            id: 3,
            fullName: 'Teszt Elek3'
          }
        }
      ]
    }
  ],
  participations: [
    {
      id: 4,
      archived: false,
      location: '1317 tanuló',
      startDate: '0',
      endDate: '0',
      name: 'ez nem is érdekes',
      descMarkdown: 'másik nagyon érdekes konzi',
      subject: {
        id: 2,
        code: 'VIAU34564',
        name: 'adatb',
        majors: [Major.CE_BSC]
      }
    }
  ],
  consultaionRequests: [],
  averageRating: 4.2
}

export const ProfilePage = () => {
  const { isLoggedIn, loggedInUser, loggedInUserError, loggedInUserLoading, onLogout } = useAuthContext()

  if (!isLoggedIn) {
    return <Navigate replace to="/error" state={{ title: 'Nem vagy bejelentkezve!', messages: [] }} />
  }

  if (loggedInUserError) {
    const err = loggedInUserError as any
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'Nem vagy bejelentkezve!',
          messages: [err?.response.data.message || err.message]
        }}
      />
    )
  }

  return (
    <>
      {loggedInUserLoading ? (
        <ProfileDetailsLoading />
      ) : (
        <ProfileDetails user={loggedInUser!!} profileOptions={{ onLogoutPressed: onLogout }} />
      )}
      {loggedInUser && (
        <>
          <Helmet title="Profil" />
          <VStack>
            <Heading>Átlagos értékelés: {mockProfile.averageRating}</Heading>

            {mockProfile.presentations.map((p) =>
              p.ratings?.map((r) => (
                <HStack key={r.id}>
                  <Text>{r.rater.fullName} </Text>
                  <Text>{r.value}, </Text>
                  <Text>{r.text}</Text>
                </HStack>
              ))
            )}
            <Heading>Tartott konzultációk</Heading>
            {mockProfile.presentations?.map((c) => (
              <ConsultationListItem key={c.id} c={c} />
            ))}
            <Heading>Konzik, amin részt vett</Heading>
            {mockProfile.participations?.map((c) => (
              <ConsultationListItem key={c.id} c={c} />
            ))}
          </VStack>
        </>
      )}
    </>
  )
}
