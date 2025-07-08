import { hashPasswordForTransmission } from '../../../helpers/common'
import { AuthRequest, AuthResponse, ChangePasswordRequest } from '../../../types/auth'
import { gwApi } from '../core/gw.api'

export const authApi = gwApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: ({ username, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          username: username,
          password: hashPasswordForTransmission(password),
        },
      }),
    }),
    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      query: ({ username, oldPassword, newPassword }) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: {
          username: username,
          oldPassword: hashPasswordForTransmission(oldPassword),
          newPassword: hashPasswordForTransmission(newPassword),
        },
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

export const { useLoginMutation, useLogoutMutation, useChangePasswordMutation } = authApi
