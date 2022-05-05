import { useAuthContext } from '../../api/contexts/auth/useAuthContext'

export const IndexPage = () => {
  const { isLoggedIn, loggedInUser } = useAuthContext()

  return <>Hello there {loggedInUser?.firstName}</>
}
