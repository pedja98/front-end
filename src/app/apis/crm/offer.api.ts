import { CrmApiTags } from '../../../consts/common'
import { CrmCreateOffer, Offer } from '../../../types/offer'
import { crmApi } from '../core/crm.api'

export const offerApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    getOfferById: builder.query<Offer, string>({
      query: (id) => `/offers/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.OFFER, id }],
    }),
    getOffers: builder.query<Offer[], string>({
      query: (queryParams) => `/offers${queryParams}`,
      providesTags: [CrmApiTags.OFFER],
    }),
    getOffersByOpportunityId: builder.query<Offer[], string>({
      query: (queryParams) => `/offers/opportunity/${queryParams}`,
      providesTags: [CrmApiTags.OFFER],
    }),
    createCrmOffer: builder.mutation<{ message: string }, CrmCreateOffer>({
      query: (body) => ({
        url: '/offers',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useGetOfferByIdQuery, useGetOffersQuery, useGetOffersByOpportunityIdQuery, useCreateCrmOfferMutation } =
  offerApi
