import Grid from '@mui/material/Grid'
import { NavbarLinks } from '../consts/navbar'
import { useTranslation } from 'react-i18next'
import { NavbarLinkStyled } from '../styles/navbar'
import NavbarFadeMenu from './NavbarFadeMenu'

const Navbar = () => {
  const { t } = useTranslation('general')
  return (
    <Grid container style={{ height: '50px', backgroundColor: 'black' }}>
      {NavbarLinks.map((navbarLink, index) =>
        index === NavbarLinks.length - 1 ? (
          <NavbarFadeMenu key={navbarLink} />
        ) : (
          <NavbarLinkStyled key={navbarLink} to={`/index`}>
            {t(`navbarLinks.${navbarLink}`)}
          </NavbarLinkStyled>
        ),
      )}
    </Grid>
  )
}

export default Navbar
