import { crmApi } from './core/crm.api'

export const regionApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    createRegion: builder.mutation<{ message: string }, { name: string }>({
      query: (credentials) => ({
        url: '/regions',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateRegionMutation } = regionApi
