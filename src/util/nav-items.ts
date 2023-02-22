import { UserModel } from '../api/model/user.model'
import { API_HOST } from './environment'
import { PATHS } from './paths'

export interface INavItem {
  label: string
  path: string
  external: boolean
  onClick: () => void
  shouldBeShown: (isLoggedIn: boolean, loggedInUser: UserModel | undefined) => boolean
}

export class NavItem implements INavItem {
  public label: string
  public path: string
  public external: boolean
  public onClick: () => void

  public shouldBeShown = (isLoggedIn: boolean, _loggedInUser: UserModel | undefined) => isLoggedIn

  constructor({
    label,
    path,
    onClick = () => {},
    external = false
  }: {
    label: string
    path: string
    onClick?: () => void
    external?: boolean
  }) {
    this.label = label
    this.path = path
    this.onClick = onClick
    this.external = external
  }
}

const SubjectsItem = new NavItem({
  label: 'Tárgyak',
  path: PATHS.SUBJECTS
})
SubjectsItem.shouldBeShown = (isLoggedIn: boolean, loggedInUser: UserModel | undefined) => isLoggedIn && (loggedInUser?.isAdmin || false)

const KonziItem = new NavItem({
  label: 'Konzultációk',
  path: PATHS.CONSULTATIONS
})
KonziItem.shouldBeShown = (_isLoggedIn: boolean) => true

const HomeItem = new NavItem({
  label: 'Kezdőlap',
  path: PATHS.INDEX
})
KonziItem.shouldBeShown = (_isLoggedIn: boolean) => true

const LoginItem = new NavItem({
  label: 'Belépés',
  path: PATHS.LOGIN,
  external: true,
  onClick: () => (window.location.href = `${API_HOST}/auth/login`)
})
LoginItem.shouldBeShown = (isLoggedIn: boolean) => !isLoggedIn

export const NAV_ITEMS: INavItem[] = [
  HomeItem,
  KonziItem,
  new NavItem({
    label: 'Csoportok',
    path: PATHS.GROUPS
  }),
  new NavItem({
    label: 'Felhasználók',
    path: PATHS.USERS
  }),
  SubjectsItem,
  new NavItem({
    label: 'Profil',
    path: PATHS.PROFILE
  }),
  LoginItem
]
