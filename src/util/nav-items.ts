export interface INavItem {
  label: string
  path: string
  shouldBeShown: (isLoggedIn: boolean) => boolean
}

export class NavItem implements INavItem {
  public label: string
  public path: string

  public shouldBeShown = (isLoggedIn: boolean) => true

  constructor({ label, path }: { label: string; path: string }) {
    this.label = label
    this.path = path
  }
}

const UsersItem = new NavItem({
  label: 'Felhasználók',
  path: '/users'
})
UsersItem.shouldBeShown = (isLoggedIn: boolean) => isLoggedIn

const ProfileItem = new NavItem({
  label: 'Profil',
  path: '/profile'
})
ProfileItem.shouldBeShown = (isLoggedIn: boolean) => isLoggedIn

const LoginItem = new NavItem({
  label: 'Belépés',
  path: '/login'
})
LoginItem.shouldBeShown = (isLoggedIn: boolean) => !isLoggedIn

export const NAV_ITEMS: INavItem[] = [
  new NavItem({
    label: 'Kezdőlap',
    path: '/'
  }),
  new NavItem({
    label: 'Konzultációk',
    path: '/consultations'
  }),
  new NavItem({
    label: 'Csoportok',
    path: '/groups'
  }),
  UsersItem,
  ProfileItem,
  LoginItem
]
