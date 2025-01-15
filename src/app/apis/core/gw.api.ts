import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthRequest, AuthResponse } from '../../../types/auth'
import { getCurrentUser } from '../../../helpers/common'

export const gwApi = createApi({
  reducerPath: 'gwApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_GW_API}`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
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