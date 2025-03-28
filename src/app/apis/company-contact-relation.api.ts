import { CrmApiTags } from '../../consts/common'
import { CompanyContactRelation, CreateCompanyContactRelation, UpdateCompanyContactRelation } from '../../types/contact'
import { crmApi } from './core/crm.api'

export const companyContractRelationApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompanyContractRelation: builder.mutation<
      { message: string },
      Omit<Partial<CreateCompanyContactRelation>, 'id'>
    >({
      query: (relationData) => ({
        url: '/company-contact-relations',
        method: 'POST',
        body: relationData,
      }),
    }),
    updateCompanyContractRelation: builder.mutation<
      { message: string },
      { id: string; relation: Partial<UpdateCompanyContactRelation> }
    >({
      query: ({ id, relation }) => ({
        url: `/company-contact-relations/${id}`,
        method: 'PUT',
        body: relation,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: CrmApiTags.COMPANY_CONTACT_RELATION, id }],
    }),
    getCompanyContractRelationByContactId: builder.query<CompanyContactRelation, string>({
      query: (contactId) => `/company-contact-relations?contactId=${contactId}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.COMPANY_CONTACT_RELATION, id }],
    }),
    deleteCompanyContractRelation: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/company-contact-relations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: CrmApiTags.COMPANY_CONTACT_RELATION, id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateCompanyContractRelationMutation,
  useGetCompanyContractRelationByContactIdQuery,
  useUpdateCompanyContractRelationMutation,
  useDeleteCompanyContractRelationMutation,
} = companyContractRelationApi
