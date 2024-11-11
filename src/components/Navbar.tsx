import React from 'react'
import Grid from '@mui/material/Grid'
import useMediaQuery from '@mui/material/useMediaQuery'
import { NavbarFadeMenueOptions, NavbarLinks } from '../consts/navbar'
import { useTranslation } from 'react-i18next'
import { NavbarLinkStyled } from '../styles/navbar'
import NavbarFadeMenu from './NavbarFadeMenu'
import { useAppSelector } from '../app/hooks'

const Navbar = () => {
  const { t } = useTranslation()
  const isLargeScreen = useMediaQuery('(min-width:1920px)')

  const menuOptionsWidth = isLargeScreen ? '90%' : '35%'
  const userOptionsWidth = isLargeScreen ? '10%' : '35%'

  const authUsername = useAppSelector((state) => state.auth.username) as string

  return (
    <Grid container style={{ backgroundColor: 'black', width: '100%' }}>
      <Grid container style={{ width: menuOptionsWidth }}>
        {isLargeScreen ? (
          NavbarLinks.map((navbarLink) => (
            <NavbarLinkStyled key={navbarLink} to={`/index`}>
              {t(`general:navbarLinks.${navbarLink}`)}
            </NavbarLinkStyled>
          ))
        ) : (
          <NavbarFadeMenu menuOptions={NavbarLinks} mainComponentText={t('general:moreOptions')} />
        )}
      </Grid>
      <Grid style={{ width: userOptionsWidth }}>
        <NavbarFadeMenu menuOptions={NavbarFadeMenueOptions} mainComponentText={authUsername} />
      </Grid>
    </Grid>
  )
}

export default Navbar
