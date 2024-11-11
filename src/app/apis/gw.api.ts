import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthRequest, AuthResponse, AuthState } from '../../types/auth'
import { RootState } from '../store'

export const gwApi = createApi({
  reducerPath: 'gwApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_GW_API}`,
    prepareHeaders: (headers, { getState }) => {
      const auth = (getState() as RootState).auth as AuthState
      if (auth?.username && auth?.type) {
        headers.set('x-username', auth.username)
        headers.set('x-user-type', String(auth.type))
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ message: string }, { username: string }>({
      query: (credentials) => ({
        url: '/auth/logout',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation } = gwApi
