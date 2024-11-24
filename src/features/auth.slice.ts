import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthResponse } from '../types/auth'
import { gwApi } from '../app/apis/gw.api'
import { InitialState as AuthInitialState } from '../consts/auth'
import { UpdateAttributePayload } from '../types/common'

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthInitialState,
  reducers: {
    setAuthDataFromLocalStorage: (state) => {
      const auth = localStorage.getItem('currentUser')
        ? JSON.parse(String(localStorage.getItem('currentUser')))
        : undefined
      if (auth) {
        state.username = auth.username
        state.type = auth.type
        state.language = auth.language
      }
    },
    updateAuthAttribute: (state, { payload }: PayloadAction<UpdateAttributePayload>) => {
      const { attribute, value } = payload
      const auth = localStorage.getItem('currentUser')
        ? JSON.parse(String(localStorage.getItem('currentUser')))
        : undefined

      const newAuth = { ...auth, [attribute]: value }
      localStorage.setItem('currentUser', JSON.stringify(newAuth))

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
        localStorage.setItem('currentUser', JSON.stringify(state))
      })
      .addMatcher(gwApi.endpoints.logout.matchFulfilled, (state) => {
        Object.assign(state, {
          username: AuthInitialState.username,
          type: AuthInitialState.type,
          language: AuthInitialState.language,
        })
        localStorage.removeItem('currentUser')
      })
  },
})

export const { setAuthDataFromLocalStorage, updateAuthAttribute } = authSlice.actions

export default authSlice.reducer
