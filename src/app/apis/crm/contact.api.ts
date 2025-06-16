import { Contact, SaveContact } from '../../../types/contact'
import { CrmApiTags } from '../../../consts/common'
import { crmApi } from '../core/crm.api'

export const contactApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation<{ message: string }, Omit<Partial<Contact>, 'id'>>({
      query: (contactData) => ({
        url: '/contacts',
        method: 'POST',
        body: contactData,
      }),
    }),
    updateContact: builder.mutation<{ message: string }, { id: number; contact: Partial<SaveContact> }>({
      query: ({ id, contact }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: contact,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: CrmApiTags.CONTACT, id }],
    }),
    getContact: builder.query<Contact, number>({
      query: (id) => `/contacts/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.CONTACT, id }],
    }),
    getContacts: builder.query<Contact[], string>({
      query: (queryParams) => `/contacts${queryParams}`,
      providesTags: [CrmApiTags.CONTACT],
    }),
    deleteContact: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: CrmApiTags.CONTACT, id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateContactMutation,
  useGetContactQuery,
  useGetContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactApi
