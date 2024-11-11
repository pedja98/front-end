import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthResponse } from '../types/auth'
import { gwApi } from '../app/apis/gw.api'
import { InitialState as AuthInitialState } from '../consts/auth'

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

export const { setAuthDataFromLocalStorage } = authSlice.actions

export default authSlice.reducer
