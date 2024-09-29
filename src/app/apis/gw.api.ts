import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SignInRequest, SignInResponse } from '../../types/auth'

export const gwApi = createApi({
  reducerPath: 'gwApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_GW_API}`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<SignInResponse, SignInRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useLoginMutation } = gwApi
