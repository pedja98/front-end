import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentUser } from '../../../helpers/common'
import { TariffPlanGroupedByStatus } from '../../../types/tariffPlans'

export const omApi = createApi({
  reducerPath: 'omApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_OM_API}`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getGroupedTariffPlansByCrmOfferId: build.query<TariffPlanGroupedByStatus, number>({
      query: (crmOfferId) => `/tariff-plans/offer/${crmOfferId}/grouped-tariff-plans`,
    }),
  }),
})

export const { useGetGroupedTariffPlansByCrmOfferIdQuery } = omApi
