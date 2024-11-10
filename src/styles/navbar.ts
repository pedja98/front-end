import styled from '@emotion/styled'
import { Button, MenuItem } from '@mui/material'
import { NavLink } from 'react-router-dom'

export const NavbarLinkStyled = styled(NavLink)(() => ({
  textDecoration: 'none',
  color: 'white',
  fontWeight: 'bold',
  height: '50px',
  width: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '1px',
  '&:hover': {
    backgroundColor: '#525252',
    cursor: 'pointer',
  },
}))

export const NavbarUserOptionsButtonStyled = styled(Button)(() => ({
  color: 'white',
  fontWeight: 'bold',
  fontSize: '14px',
  height: '50px',
  width: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'black',
  '&:hover': {
    cursor: 'pointer',
  },
}))

export const NavbarUserOptionsMenuItemStyled = styled(MenuItem)(() => ({
  height: '50px',
  width: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '1px',
  fontWeight: 'bold',
  fontSize: '14px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#c2c1be',
  },
}))
