import { Card, SelectChangeEvent, Typography } from '@mui/material'
import {
  FormButtonStyled,
  FormCartActionStyled,
  FormCartContextStyled,
  FormTextFieldStyled,
  Root,
  StyledCenterBackgroundContainer,
} from '../../styles/common'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SignInProps } from '../../interfaces/signIn'
// import { useTranslation } from 'react-i18next'

const SignIn = () => {
  const [signInData, setSignInData] = useState<SignInProps>({
    username: '',
    password: '',
  })
  // const { t } = useTranslation()
  // console.log(t('key'))
  const signInButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (signInButtonRef.current) {
      signInButtonRef.current.focus()
    }
  }, [])

  const handleChange =
    (field: keyof typeof signInData) =>
    (event: SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setSignInData({ ...signInData, [field]: event.target.value as string })
    }

  return (
    <StyledCenterBackgroundContainer>
      <Card
        variant='outlined'
        sx={{
          maxWidth: 310,
          height: 345,
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '3%%',
        }}
      >
        <FormCartContextStyled>
          <Root>
            <Typography variant='h5'>DOBRODOŠLI</Typography>
          </Root>
          <FormTextFieldStyled
            id='username'
            label='Korisničko ime'
            value={signInData.username}
            onChange={handleChange('username')}
            sx={{ m: 1 }}
          />
          <FormTextFieldStyled
            id='password'
            label='Lozinka'
            type='password'
            value={signInData.password}
            onChange={handleChange('password')}
            sx={{ m: 1 }}
          />
        </FormCartContextStyled>
        <FormCartActionStyled>
          <FormButtonStyled sx={{ m: 1 }} ref={signInButtonRef}>
            Prijavi se
          </FormButtonStyled>
        </FormCartActionStyled>
      </Card>
    </StyledCenterBackgroundContainer>
  )
}

export default SignIn
