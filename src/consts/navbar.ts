import { NavbarOptionsEnum } from '../types/navbar'

export const NavbarLinks = [
  NavbarOptionsEnum.Home,
  NavbarOptionsEnum.Companies,
  NavbarOptionsEnum.Contacts,
  NavbarOptionsEnum.CustomerSessions,
  NavbarOptionsEnum.Opportunities,
  NavbarOptionsEnum.Offers,
  NavbarOptionsEnum.Contracts,
  NavbarOptionsEnum.Shops,
]

export const NavbarFadeMenueUserOptions = [NavbarOptionsEnum.EditProfile, NavbarOptionsEnum.Logout]

export const NavbarFadeMenueAdminOptions = [
  NavbarOptionsEnum.EditProfile,
  NavbarOptionsEnum.Catalogue,
  NavbarOptionsEnum.UserManagment,
  NavbarOptionsEnum.Logout,
]
