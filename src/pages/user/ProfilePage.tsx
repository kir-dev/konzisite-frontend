import { Heading, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { UserModel } from '../../api/model/user.model'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'
import { UploadImageModal } from './forms/UploadImageModal'

const mockProfile: UserModel = {
  id: 1,
  authSchId: '123',
  firstName: 'John',
  lastName: 'Appleseed',
  email: 'example@gmail.com',
  ownedConsultations: [
    {
      id: 1,
      location: '1317 tanuló',
      startDate: new Date(),
      endDate: new Date(),
      descMarkdown: 'nagyon érdekes konzi',
      owner: {
        id: 1,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'abc@cba.com'
      }
    },
    {
      id: 2,
      location: '1317 tanuló',
      startDate: new Date(),
      endDate: new Date(),
      descMarkdown: 'kicsit érdekes konzi',
      owner: {
        id: 1,
        authSchId: 'abc',
        firstName: 'Elek',
        lastName: 'Teszt',
        email: 'abc@cba.com'
      }
    }
  ],
  ratings: [
    {
      id: 1,
      value: 5,
      text: 'Yeaaah, eleg jo volt',
      participationId: 1,
      presentationId: 1
    },
    {
      id: 2,
      value: 5,
      text: 'Yeaaah, eleg jo volt szerintem is',
      participationId: 1,
      presentationId: 1
    },
    {
      id: 3,
      value: 3,
      text: 'Eleg uncsi volt ://',
      participationId: 1,
      presentationId: 1
    }
  ]
}

export const ProfilePage = () => {
  const { isLoggedIn, loggedInUser, loggedInUserError, loggedInUserLoading, onLogout } = useAuthContext()
  const { isOpen: isOpenProfileImageModal, onOpen: onChangeProfileImagePressed, onClose: onCloseProfileImageModal } = useDisclosure()

  if (!isLoggedIn) {
    return <Navigate replace to="/error" state={{ title: 'You are not logged in yet!', messages: [] }} />
  }

  if (loggedInUserError) {
    const err = loggedInUserError as any
    return (
      <Navigate
        replace
        to="/error"
        state={{
          title: 'You are not logged in yet!',
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
            {mockProfile.ratings && (
              <Heading>
                Overall Rating: {(mockProfile.ratings?.reduce((a, b) => a + b.value, 0) / mockProfile.ratings?.length).toFixed(2)}
              </Heading>
            )}

            {mockProfile.ratings?.map((r) => (
              <HStack>
                <Text>Random user: </Text>
                <Text>{r.value}, </Text>
                <Text>{r.text}</Text>
              </HStack>
            ))}
            <Heading>Owned Consultations: </Heading>
            {mockProfile.ownedConsultations?.map((c) => (
              <HStack>
                <Text>{c.descMarkdown}</Text>
                <Text>
                  {c.startDate.toDateString()}-{c.endDate.toDateString()}
                </Text>
                <Text>
                  {c.owner.lastName} {c.owner.firstName}
                </Text>
              </HStack>
            ))}
          </VStack>
        </>
      )}
    </>
  )
}
