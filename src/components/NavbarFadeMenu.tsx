import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { NavbarFadeMenueOptions } from '../consts/navbar'
import { NavbarUserOptionsButtonStyled, NavbarUserOptionsMenuItemStyled } from '../styles/navbar'
import { useTranslation } from 'react-i18next'
import { useLogoutMutation } from '../app/apis/gw.api'
import { useNavigate } from 'react-router-dom'
import { NavbarFadeMenueOptionsEnum } from '../types/navbar'
import { ApiException } from '../types/exception'
import { setNotification } from '../features/notifications.slice'
import { NotificationTypeEnum } from '../types/notification'

const NavbarFadeMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [logout] = useLogoutMutation()
  const open = Boolean(anchorEl)
  const username = useAppSelector((state) => state.auth.username) as string
  const { t } = useTranslation('general')
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
  }

  const handleClick = async (option: string) => {
    if (option === NavbarFadeMenueOptionsEnum.Logout) {
      try {
        const messageCode = await (await logout({ username }).unwrap()).message
        dispatch(
          setNotification({
            text: t(messageCode),
            type: NotificationTypeEnum.Info,
          }),
        )
        navigate('/')
      } catch (err) {
        const errorResponse = err as { data: ApiException }
        const errorCode = errorResponse.data?.error || 'general:unknowError'
        dispatch(
          setNotification({
            text: t(errorCode),
            type: NotificationTypeEnum.Error,
          }),
        )
      }
    }
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
        {username}
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
        {NavbarFadeMenueOptions.map((option) => (
          <NavbarUserOptionsMenuItemStyled
            key={option}
            onClick={() => {
              handleClick(option)
            }}
          >
            {t(`navbarFadeMenueOptions.${option}`)}
          </NavbarUserOptionsMenuItemStyled>
        ))}
      </Menu>
    </div>
  )
}

export default NavbarFadeMenu
