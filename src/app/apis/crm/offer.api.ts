import { CrmApiTags } from '../../../consts/common'
import { Offer } from '../../../types/offer'
import { crmApi } from '../core/crm.api'

export const offerApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    getOffer: builder.query<Offer, string>({
      query: (id) => `/regions/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.OFFER, id }],
    }),
    getOffers: builder.query<Offer[], string>({
      query: (queryParams) => `/regions${queryParams}`,
      providesTags: [CrmApiTags.OFFER],
    }),
  }),
  overrideExisting: false,
})

export const { useGetOfferQuery, useGetOffersQuery } = offerApi
