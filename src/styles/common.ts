import { styled } from '@mui/material/styles'
import { TernaryColor, PrimaryThemeColor, WhiteTeamColor } from '../consts/common'
import { Button, CardActions, CardContent, CircularProgress, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

export const StyledBackgroundContainer = styled('div')(() => ({
  backgroundColor: PrimaryThemeColor,
  minWidth: '100vw',
  minHeight: '100vh',
  color: TernaryColor,
}))

export const StyledCenterBackgroundContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}))

export const Root = styled('div')(() => ({
  width: '100%',
  textAlign: 'center',
}))

export const RootNotCentered = styled('div')(() => ({
  width: '100%',
}))

export const NameSurnameContainer = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const WhiteRoot = styled('div')(() => ({
  width: '100%',
  textAlign: 'center',
  backgroundColor: WhiteTeamColor,
}))

export const FormTextFieldStyled = styled(TextField)(({ theme }) => ({
  color: TernaryColor,
  margin: '30',
  padding: '10',
  minWidth: 280,
  maxHeight: 92,
  borderColor: theme.palette.primary.main,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focusVisible': {
    borderColor: theme.palette.primary.main,
  },
}))

export const FormBigTextFieldStyled = styled(TextField)(({ theme }) => ({
  color: TernaryColor,
  margin: '30',
  padding: '10',
  width: '50%',
  maxHeight: 92,
  borderColor: theme.palette.primary.main,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focusVisible': {
    borderColor: theme.palette.primary.main,
  },
}))

export const FormSmallTextFieldStyled = styled(TextField)(({ theme }) => ({
  color: TernaryColor,
  maxWidth: '48%',
  height: 40,
  marginTop: '30',
  paddingTop: '10',
  marginBottom: '30',
  paddingBottom: '10',
  borderColor: theme.palette.primary.main,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focusVisible': {
    borderColor: theme.palette.primary.main,
  },
}))

export const FormButtonStyled = styled(Button)(() => ({
  margin: '30',
  padding: '10',
  minWidth: 250,
  height: 35,
}))

export const FormSmallButtonStyled = styled(Button)(() => ({
  margin: '30',
  padding: '10',
  minWidth: 150,
  height: 35,
}))

export const FormCartContextStyled = styled(CardContent)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

export const FormCartActionStyled = styled(CardActions)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}))

export const RootRowFlexDirectionStyle = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
}))

export const RootRowFlexDirectionStyleCenter = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
  alignItems: 'center',
  justifyContent: 'center',
}))

export const RootColumnFlexDirectionStyle = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
}))

export const ActionButtonStyled = styled(Button)(() => ({
  margin: '30',
  padding: '10',
  minWidth: 100,
  height: 35,
}))

export const ActionButtonBigStyled = styled(Button)(() => ({
  margin: '30',
  padding: '10',
  minWidth: 160,
  height: 35,
  fontSize: '15px',
}))

export const CenteredCircularProgress = styled(CircularProgress)({
  width: '80px !important',
  height: '80px !important',
  color: 'black !important',
})

export const GridLinkStyled = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  width: '100%',
  height: '56px',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  padding: '0 14px',
  borderRadius: '5px',
  color: 'black',
  textDecoration: 'none',
  fontSize: '1rem !important',
  backgroundColor: 'white',
}))

export const TableLinkStyled = styled(Link)(() => ({
  color: 'black',
  textDecoration: 'none',
  fontSize: '1rem !important',
  backgroundColor: 'white',
}))
