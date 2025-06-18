import { AuthRequest, AuthResponse } from '../../../types/auth'
import { gwApi } from '../core/gw.api'

export const authApi = gwApi.injectEndpoints({
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
  overrideExisting: false,
})

export const { useLoginMutation, useLogoutMutation } = authApi
