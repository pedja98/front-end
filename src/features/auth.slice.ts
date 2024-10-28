import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthResponse } from '../types/auth'
import { gwApi } from '../app/apis/gw.api'
import { InitialState as AuthInitialState } from '../constants/auth'

const authSlice = createSlice({
  name: 'auth',
  initialState: AuthInitialState,
  reducers: {
    logout: (state) => {
      state.username = undefined
      state.type = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(gwApi.endpoints.login.matchFulfilled, (state, { payload }: PayloadAction<AuthResponse>) => {
      state.username = payload.username
      state.type = payload.type
    })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer
