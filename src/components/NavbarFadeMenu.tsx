import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'
import { useAppSelector } from '../app/hooks'
import { NavbarFadeMenueOptions } from '../consts/navbar'
import { NavbarUserOptionsButtonStyled, NavbarUserOptionsMenuItemStyled } from '../styles/navbar'
import { useTranslation } from 'react-i18next'

const NavbarFadeMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const currentUsername = useAppSelector((state) => state.auth.username)
  const { t } = useTranslation('general')

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <NavbarUserOptionsButtonStyled
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onMouseEnter={handleMouseEnter}
      >
        {currentUsername}
      </NavbarUserOptionsButtonStyled>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
          onMouseLeave: handleMouseLeave,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMouseLeave}
        TransitionComponent={Fade}
      >
        {NavbarFadeMenueOptions.map((optionKey) => (
          <NavbarUserOptionsMenuItemStyled key={optionKey} onClick={handleMouseLeave}>
            {t(`navbarFadeMenueOptions.${optionKey}`)}
          </NavbarUserOptionsMenuItemStyled>
        ))}
      </Menu>
    </div>
  )
}

export default NavbarFadeMenu
