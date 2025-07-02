import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentUser } from '../../../helpers/common'
import { TariffPlanCharacteristicResponse } from '../../../types/tariffPlans'

export const pcApi = createApi({
  reducerPath: 'pcApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_PC_API}`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCharacteristicsByTariffPlanIdentifier: builder.query<TariffPlanCharacteristicResponse, string>({
      query: (tariffPlanIdentifier) =>
        `/tariff-plan-characteristics/tariff-plan/${tariffPlanIdentifier}/characteristics`,
    }),
  }),
})

export const { useGetCharacteristicsByTariffPlanIdentifierQuery } = pcApi
