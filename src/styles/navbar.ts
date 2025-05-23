import styled from '@emotion/styled'
import { Button, MenuItem } from '@mui/material'
import { NavLink } from 'react-router-dom'
import { QuaternaryColor, SecondaryThemeColor } from '../consts/common'

export const NavbarLinkStyled = styled(NavLink)(() => ({
  textDecoration: 'none',
  color: 'white',
  fontWeight: 'bold',
  height: '50px',
  width: '10%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '1px',
  '&:hover': {
    backgroundColor: SecondaryThemeColor,
    cursor: 'pointer',
  },
}))

export const NavbarUserOptionsButtonStyled = styled(Button)(() => ({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '15px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black',
  width: '90%',
}))

export const NavbarUserOptionsMenuItemStyled = styled(MenuItem)(() => ({
  height: '50px',
  display: 'flex',
  width: '200px',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '1px',
  fontWeight: 'bold',
  fontSize: '15px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: QuaternaryColor,
  },
}))
