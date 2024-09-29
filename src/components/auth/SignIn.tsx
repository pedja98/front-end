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
import { SignInRequest } from '../../types/auth'
import { useLoginMutation } from '../../app/apis/gw.api'

const SignIn = () => {
  const [signInRequest, setSignInRequest] = useState<SignInRequest>({
    username: '',
    password: '',
  })
  const [login] = useLoginMutation()

  const signInButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (signInButtonRef.current) {
      signInButtonRef.current.focus()
    }
  }, [])

  const handleChange =
    (field: keyof typeof signInRequest) =>
    (event: SelectChangeEvent<unknown> | ChangeEvent<HTMLInputElement | { value: unknown }>) => {
      setSignInRequest({ ...signInRequest, [field]: event.target.value as string })
    }

  const handleSignIn = async () => {
    try {
      await login(signInRequest).unwrap()
    } catch (err) {
      console.error('Login failed', err)
    }
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
            value={signInRequest.username}
            onChange={handleChange('username')}
            sx={{ m: 1 }}
          />
          <FormTextFieldStyled
            id='password'
            label='Lozinka'
            type='password'
            value={signInRequest.password}
            onChange={handleChange('password')}
            sx={{ m: 1 }}
          />
        </FormCartContextStyled>
        <FormCartActionStyled>
          <FormButtonStyled sx={{ m: 1 }} ref={signInButtonRef} onClick={handleSignIn}>
            Prijavi se
          </FormButtonStyled>
        </FormCartActionStyled>
      </Card>
    </StyledCenterBackgroundContainer>
  )
}

export default SignIn
