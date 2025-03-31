import { FC, MouseEvent, useState } from 'react'
import Menu from '@mui/material/Menu'
import Fade from '@mui/material/Fade'
import { NavbarUserOptionsButtonStyled, NavbarUserOptionsMenuItemStyled } from '../styles/navbar'
import { useTranslation } from 'react-i18next'
import { ModuleOptions } from '../types/common'
import Grid from '@mui/material/Grid'
import { useLogoutMutation } from '../app/apis/core/gw.api'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../features/notifications.slice'
import { NotificationType } from '../types/notification'
import { ApiException } from '../types/common'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { getRoutePrefixFromCodeString } from '../helpers/common'

interface Props {
  menuOptions: ModuleOptions[]
  mainComponentText: string
}

const NavbarFadeMenu: FC<Props> = (props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [logout] = useLogoutMutation()
  const username = useAppSelector((state) => state.auth.username) as string
  const dispatch = useAppDispatch()

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMouseLeave = () => {
    setAnchorEl(null)
  }

  const handleClick = async (option: string) => {
    if (option === ModuleOptions.Logout) {
      try {
        const messageCode = `general:${(await logout({ username }).unwrap()).message}`
        dispatch(
          setNotification({
            text: t(messageCode),
            type: NotificationType.Info,
          }),
        )
        navigate('/')
      } catch (err) {
        const errorResponse = err as { data: ApiException }
        const errorCode = errorResponse.data?.error || 'general:unknowError'
        dispatch(
          setNotification({
            text: t(errorCode),
            type: NotificationType.Error,
          }),
        )
      }
      return
    }

    navigate(`/index/${getRoutePrefixFromCodeString(option)}`)
    setAnchorEl(null)
  }

  return (
    <Grid
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <NavbarUserOptionsButtonStyled
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onMouseEnter={handleMouseEnter}
        style={{ textTransform: 'none' }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {props.mainComponentText}
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
        {props.menuOptions.map((option) => (
          <NavbarUserOptionsMenuItemStyled
            key={option}
            onClick={() => {
              handleClick(option)
            }}
          >
            {t(`general:pageNamesAndActions.${option}`)}
          </NavbarUserOptionsMenuItemStyled>
        ))}
      </Menu>
    </Grid>
  )
}

export default NavbarFadeMenu
