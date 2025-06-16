import { Region } from '../../../types/region'
import { CrmApiTags } from '../../../consts/common'
import { crmApi } from '../core/crm.api'

export const regionApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    createRegion: builder.mutation<{ message: string }, { name: string }>({
      query: (credentials) => ({
        url: '/regions',
        method: 'POST',
        body: credentials,
      }),
    }),
    updateRegion: builder.mutation<{ message: string }, { id: string; region: Partial<Region> }>({
      query: ({ id, region }) => ({
        url: `/regions/${id}`,
        method: 'PUT',
        body: region,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: CrmApiTags.REGION, id }],
    }),
    getRegion: builder.query<Region, string>({
      query: (id) => `/regions/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.REGION, id }],
    }),
    getRegions: builder.query<Region[], string>({
      query: (queryParams) => `/regions${queryParams}`,
      providesTags: [CrmApiTags.REGION],
    }),
    deleteRegion: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/regions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: CrmApiTags.REGION, id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateRegionMutation,
  useGetRegionQuery,
  useGetRegionsQuery,
  useDeleteRegionMutation,
  useUpdateRegionMutation,
} = regionApi
