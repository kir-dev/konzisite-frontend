import { FC } from 'react'
import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

export const IndexPage: FC = () => {
  const { isLoggedIn, loggedInUser } = useAuthContext()

  return <>Hello there {loggedInUser?.firstName}</>
}
