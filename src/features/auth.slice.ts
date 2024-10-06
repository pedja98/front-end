import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthResponse } from '../types/auth'
import { gwApi } from '../app/apis/gw.api'
import { InitialState as AuthInitialState } from '../constants/auth'

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthInitialState,
  reducers: {
    logout: (state) => {
      state.token = null
      state.userType = undefined
      state.isAuthenticated = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(gwApi.endpoints.login.matchFulfilled, (state, { payload }: PayloadAction<AuthResponse>) => {
        state.token = payload.token
        state.userType = payload.type
        state.isAuthenticated = true
        state.error = null
      })
      .addMatcher(gwApi.endpoints.login.matchRejected, (state, { error }) => {
        state.error = error.message || 'Login failed'
        state.isAuthenticated = false
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
