import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CreateUserDto, User } from '../../types/user'
import { getCurrentUser } from '../../helpers/common'
import { ChangePasswordRequest } from '../../types/auth'

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
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (username) => `/users/${username}`,
      providesTags: (result, error, username) => [{ type: 'User', id: username }],
    }),
    updateUser: builder.mutation<{ message: string }, { username: string; user: Partial<User> }>({
      query: ({ username, user }) => ({
        url: `/users/${username}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: (result, error, { username }) => [{ type: 'User', id: username }],
    }),
    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      query: (credentials) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: credentials,
      }),
    }),
    createUser: builder.mutation<{ message: string }, CreateUserDto>({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUsers: builder.query<User[], string>({ query: (queryParams) => `/users${queryParams}`, providesTags: ['User'] }),
    deleteUsers: builder.mutation<{ message: string }, string>({
      query: (username) => ({
        url: `/users/${username}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, username) => [{ type: 'User', id: username }],
    }),
    createRegion: builder.mutation<{ message: string }, { name: string }>({
      query: (credentials) => ({
        url: '/regions',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUsersMutation,
  useCreateRegionMutation,
} = crmApi
