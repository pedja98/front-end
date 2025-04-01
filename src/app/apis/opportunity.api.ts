import { CrmApiTags } from '../../consts/common'
import { Opportunity } from '../../types/opportunity'
import { crmApi } from './core/crm.api'

export const opportunityApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    getOpportunity: builder.query<Opportunity, string>({
      query: (id) => `/opportunities/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.OPPORTUNITY, id }],
    }),
    getOpportunities: builder.query<Opportunity[], string>({
      query: (queryParams) => `/opportunities${queryParams}`,
      providesTags: [CrmApiTags.OPPORTUNITY],
    }),
    closeOpportunity: builder.mutation<{ message: string }, { id: string }>({
      query: ({ id }) => ({
        url: `/opportunities/${id}/close`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: CrmApiTags.OPPORTUNITY, id }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetOpportunityQuery, useGetOpportunitiesQuery, useCloseOpportunityMutation } = opportunityApi
