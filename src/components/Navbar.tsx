import Grid from '@mui/material/Grid'
import { NavbarLinks } from '../constants/navbar'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const { t } = useTranslation('general')

  return (
    <Grid container>
      {NavbarLinks.map((navbarLink) => (
        <Grid key={navbarLink}>
          <NavLink to='/home'>{t(`navbarLinks.${navbarLink}`)}</NavLink>
        </Grid>
      ))}
    </Grid>
  )
}

export default Navbar
