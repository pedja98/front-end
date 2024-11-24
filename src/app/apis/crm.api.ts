import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchUserResponse, UserState } from '../../types/user'
import { getCurrentUser } from '../../helpers/common'

export const crmApi = createApi({
  reducerPath: 'crmApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CRM_API}`,
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
    getUserByUsername: builder.query<FetchUserResponse, string>({
      query: (username) => `/users/${username}`,
    }),
    updateUser: builder.mutation<{ message: string }, { username: string; user: Partial<UserState> }>({
      query: ({ username, user }) => ({
        url: `/users/${username}`,
        method: 'PUT',
        body: user,
      }),
    }),
  }),
})

export const { useGetUserByUsernameQuery, useUpdateUserMutation } = crmApi
