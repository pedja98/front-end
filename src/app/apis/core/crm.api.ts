import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCurrentUser } from '../../../helpers/common'
import { CrmApiTags } from '../../../consts/common'

export const crmApi = createApi({
  reducerPath: 'crmApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CRM_API}`,
    prepareHeaders: (headers) => {
      const currentUser = getCurrentUser()
      if (currentUser?.username && currentUser?.type) {
        headers.set('x-username', currentUser.username)
        headers.set('x-user-type', String(currentUser.type))
      }
      return headers
    },
  }),
  tagTypes: [
    CrmApiTags.USER,
    CrmApiTags.REGION,
    CrmApiTags.COMPANY,
    CrmApiTags.SHOP,
    CrmApiTags.CONTACT,
    CrmApiTags.CUSTOMER_SESSION,
    CrmApiTags.COMPANY_CONTACT_RELATION,
  ],
  endpoints: () => ({}),
})
