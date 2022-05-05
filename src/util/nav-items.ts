import { FaCompass, FaHome, FaSignInAlt, FaUserCircle } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

export interface INavItem {
  icon: IconType
  label: string
  path: string
  shouldBeShown: (isLoggedIn: boolean) => boolean
}

export class NavItem implements INavItem {
  public icon: IconType
  public label: string
  public path: string

  public shouldBeShown = (isLoggedIn: boolean) => true

  constructor({ icon, label, path }: { icon: IconType; label: string; path: string }) {
    this.icon = icon
    this.label = label
    this.path = path
  }
}

const ProfileItem = new NavItem({
  icon: FaUserCircle,
  label: 'Profile',
  path: '/profile'
})
ProfileItem.shouldBeShown = (isLoggedIn: boolean) => isLoggedIn

const LoginItem = new NavItem({
  icon: FaSignInAlt,
  label: 'Log in',
  path: '/login'
})
LoginItem.shouldBeShown = (isLoggedIn: boolean) => !isLoggedIn

export const NAV_ITEMS: INavItem[] = [
  new NavItem({
    icon: FaHome,
    label: 'Home',
    path: '/'
  }),
  new NavItem({
    icon: FaCompass,
    label: 'Explore',
    path: '/explore'
  }),
  ProfileItem,
  LoginItem
]
