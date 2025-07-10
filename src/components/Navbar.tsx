import React from 'react'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { NavbarLinks } from '../consts/navbar'
import { useTranslation } from 'react-i18next'
import { NavbarLinkStyled } from '../styles/navbar'
import NavbarFadeMenu from './NavbarFadeMenu'
import { useAppSelector } from '../app/hooks'
import { getNavbarFadeMenuOptions, getRoutePrefixFromCodeString } from '../helpers/common'
import { UserType } from '../types/user'

const Navbar = () => {
  const { t } = useTranslation()
  const isLargeScreen = useMediaQuery('(min-width:1920px)')

  const menuOptionsWidth = isLargeScreen ? '90%' : '35%'
  const userOptionsWidth = isLargeScreen ? '10%' : '35%'

  const auth = useAppSelector((state) => state.auth)

  const navbarFadeMenuOptions = getNavbarFadeMenuOptions(auth.type as UserType)

  return (
    <Grid container style={{ backgroundColor: 'black', width: '100%' }}>
      <Grid container style={{ width: menuOptionsWidth }}>
        {isLargeScreen ? (
          NavbarLinks.map((navbarLink) => (
            <NavbarLinkStyled key={navbarLink} to={`/index/${getRoutePrefixFromCodeString(navbarLink)}`}>
              {t(`general:pageNamesAndActions.${navbarLink}`)}
            </NavbarLinkStyled>
          ))
        ) : (
          <NavbarFadeMenu menuOptions={NavbarLinks} mainComponentText={t('general:moreOptions')} />
        )}
      </Grid>
      <Grid style={{ width: userOptionsWidth }}>
        <NavbarFadeMenu menuOptions={navbarFadeMenuOptions} mainComponentText={String(auth.username)} />
      </Grid>
    </Grid>
  )
}

export default Navbar
