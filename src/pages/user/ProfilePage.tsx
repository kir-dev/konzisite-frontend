import { Heading, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { Major } from '../../api/model/subject.model'
import { ConsultationListItem } from './components/ConsultationListItem'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'
import { UploadImageModal } from './forms/UploadImageModal'
import { UserDetails } from './types/UserDetails'

const mockProfile: UserDetails = {
  id: 1,
  authSchId: '123',
  firstName: 'John',
  lastName: 'Appleseed',
  email: 'example@gmail.com',
  presentations: [
    {
      id: 1,
      location: '1317 tanuló',
      startDate: new Date(),
      endDate: new Date(),
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
          rater: {
            id: 1,
            authSchId: 'abc',
            firstName: 'Elek',
            lastName: 'Teszt',
            email: 'abc@cba.com'
          }
        },
        {
          id: 2,
          value: 5,
          text: 'Yeaaah, eleg jo volt szerintem is',
          rater: {
            id: 2,
            authSchId: 'abc',
            firstName: 'Elek2',
            lastName: 'Teszt',
            email: 'abc@cba.com'
          }
        }
      ]
    },
    {
      id: 2,
      location: '1317 tanuló',
      startDate: new Date(),
      endDate: new Date(),
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
          rater: {
            id: 3,
            authSchId: 'abc',
            firstName: 'Elek3',
            lastName: 'Teszt',
            email: 'abc@cba.com'
          }
        }
      ]
    }
  ],
  participations: [
    {
      id: 4,
      location: '1317 tanuló',
      startDate: new Date(),
      endDate: new Date(),
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
  avarageRating: 4.2
}

export const ProfilePage = () => {
  const { isLoggedIn, loggedInUser, loggedInUserError, loggedInUserLoading, onLogout } = useAuthContext()
  const { isOpen: isOpenProfileImageModal, onOpen: onChangeProfileImagePressed, onClose: onCloseProfileImageModal } = useDisclosure()

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
        <ProfileDetails user={loggedInUser!!} profileOptions={{ onLogoutPressed: onLogout, onChangeProfileImagePressed }} />
      )}
      {loggedInUser && (
        <>
          <UploadImageModal isOpen={isOpenProfileImageModal} onClose={onCloseProfileImageModal} />

          <VStack>
            <Heading>Átlagos értékelés: {mockProfile.avarageRating}</Heading>

            {mockProfile.presentations.map((p) =>
              p.ratings?.map((r) => (
                <HStack key={r.id}>
                  <Text>{r.rater.lastName + ' ' + r.rater.firstName} </Text>
                  <Text>{r.value}, </Text>
                  <Text>{r.text}</Text>
                </HStack>
              ))
            )}
            <Heading>Tartott konzultációk</Heading>
            {mockProfile.presentations?.map((c) => (
              <ConsultationListItem c={c} />
            ))}
            <Heading>Konzik, amin részt vett</Heading>
            {mockProfile.participations?.map((c) => (
              <ConsultationListItem c={c} />
            ))}
          </VStack>
        </>
      )}
    </>
  )
}
