import { CrmApiTags } from '../../consts/common'
import { CustomerSession, SaveCustomerSession } from '../../types/customerSession'
import { crmApi } from './core/crm.api'

export const customerSessionsApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomerSession: builder.mutation<{ message: string }, Omit<Partial<SaveCustomerSession>, 'id'>>({
      query: (customerSessionData) => ({
        url: '/customer-sessions',
        method: 'POST',
        body: customerSessionData,
      }),
    }),
    updateCustomerSession: builder.mutation<
      { message: string },
      { id: string; customerSession: Partial<SaveCustomerSession> }
    >({
      query: ({ id, customerSession }) => ({
        url: `/customer-sessions/${id}`,
        method: 'PUT',
        body: customerSession,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: CrmApiTags.CUSTOMER_SESSION, id }],
    }),
    getCustomerSession: builder.query<CustomerSession, string>({
      query: (id) => `/customer-sessions/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.CUSTOMER_SESSION, id }],
    }),
    getCustomerSessions: builder.query<CustomerSession[], string>({
      query: (queryParams) => `/customer-sessions${queryParams}`,
      providesTags: [CrmApiTags.CUSTOMER_SESSION],
    }),
    deleteCustomerSession: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/customer-sessions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: CrmApiTags.CUSTOMER_SESSION, id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateCustomerSessionMutation,
  useGetCustomerSessionQuery,
  useGetCustomerSessionsQuery,
  useDeleteCustomerSessionMutation,
  useUpdateCustomerSessionMutation,
} = customerSessionsApi
