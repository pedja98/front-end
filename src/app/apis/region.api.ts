import { CrmApiTags } from '../../consts/common'
import { Region } from '../../types/region'
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
    getRegion: builder.query<Region[], string>({
      query: (queryParams) => `/regions${queryParams}`,
      providesTags: [CrmApiTags.REGION],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateRegionMutation, useGetRegionQuery } = regionApi
