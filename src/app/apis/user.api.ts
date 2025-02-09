import { AssignedToUserData, User, UserType } from '../../types/user'
import { ChangePasswordRequest } from '../../types/auth'
import { crmApi } from './core/crm.api'
import { CrmApiTags } from '../../consts/common'

export const userApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (username) => `/users/${username}`,
      providesTags: (result, error, username) => [{ type: CrmApiTags.USER, id: username }],
    }),
    getUsers: builder.query<User[], string>({
      query: (queryParams) => `/users${queryParams}`,
      providesTags: [CrmApiTags.USER],
    }),
    getAssignedToUserData: builder.query<AssignedToUserData[], UserType>({
      query: (type) => `/users/assign-to?type=${type}`,
      providesTags: [CrmApiTags.USER],
    }),
    updateUser: builder.mutation<{ message: string }, { username: string; user: Partial<User> }>({
      query: ({ username, user }) => ({
        url: `/users/${username}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: (result, error, { username }) => [{ type: CrmApiTags.USER, id: username }],
    }),
    deleteUsers: builder.mutation<{ message: string }, string>({
      query: (username) => ({
        url: `/users/${username}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, username) => [{ type: CrmApiTags.USER, id: username }],
    }),
    createUser: builder.mutation<{ message: string }, Partial<User>>({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
    }),
    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      query: (credentials) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUsersMutation,
  useCreateUserMutation,
  useChangePasswordMutation,
  useGetAssignedToUserDataQuery,
} = userApi
