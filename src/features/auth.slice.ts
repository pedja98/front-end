import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { AuthResponse } from '../types/auth'
import { InitialState as AuthInitialState } from '../consts/auth'
import { UpdateAttributePayload } from '../types/common'
import { gwApi } from '../app/apis/gw.api'

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthInitialState,
  reducers: {
    setAuthDataFromCookies: (state) => {
      const auth = Cookies.get('currentUser') ? JSON.parse(String(Cookies.get('currentUser'))) : undefined
      if (auth) {
        state.username = auth.username
        state.type = auth.type
        state.language = auth.language
      }
    },
    updateAuthAttribute: (state, { payload }: PayloadAction<UpdateAttributePayload>) => {
      const { attribute, value } = payload
      const auth = Cookies.get('currentUser') ? JSON.parse(String(Cookies.get('currentUser'))) : undefined

      const newAuth = { ...auth, [attribute]: value }
      Cookies.set('currentUser', JSON.stringify(newAuth), { expires: 0.5, sameSite: 'None', secure: true })

      return {
        ...state,
        [attribute]: value,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(gwApi.endpoints.login.matchFulfilled, (state, { payload }: PayloadAction<AuthResponse>) => {
        state.username = payload.username
        state.type = payload.type
        state.language = payload.language
        Cookies.set('currentUser', JSON.stringify(state), { expires: 0.5, sameSite: 'None', secure: true })
      })
      .addMatcher(gwApi.endpoints.logout.matchFulfilled, (state) => {
        Object.assign(state, {
          username: AuthInitialState.username,
          type: AuthInitialState.type,
          language: AuthInitialState.language,
        })
        Cookies.remove('currentUser')
      })
  },
})

export const { setAuthDataFromCookies, updateAuthAttribute } = authSlice.actions

export default authSlice.reducer
