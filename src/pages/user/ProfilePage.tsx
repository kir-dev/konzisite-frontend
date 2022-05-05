import { useDisclosure } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'
import { ProfileDetails } from './components/ProfileDetails'
import { ProfileDetailsLoading } from './components/ProfileDetailsLoading'
import { UploadImageModal } from './forms/UploadImageModal'

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
        </>
      )}
    </>
  )
}
