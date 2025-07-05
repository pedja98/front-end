import { CrmApiTags } from '../../../consts/common'
import { Offer } from '../../../types/offer'
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
  }),
  overrideExisting: false,
})

export const { useGetOfferByIdQuery, useGetOffersQuery } = offerApi
