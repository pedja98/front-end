import { CreateOffer } from '../../../types/offer'
import { gwApi } from '../core/gw.api'

export const offerApi = gwApi.injectEndpoints({
  endpoints: (builder) => ({
    createOffer: builder.mutation<{ message: string }, CreateOffer>({
      query: (body) => ({
        url: '/offers',
        method: 'POST',
        body,
      }),
    }),
  }),
  overrideExisting: false,
})

export const { useCreateOfferMutation } = offerApi
