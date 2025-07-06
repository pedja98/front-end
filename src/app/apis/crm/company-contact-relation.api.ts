import { CrmApiTags } from '../../../consts/common'
import {
  CompanyContactRelation,
  CreateCompanyContactRelation,
  UpdateCompanyContactRelation,
} from '../../../types/contact'
import { crmApi } from '../core/crm.api'

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
      invalidatesTags: () => [{ type: CrmApiTags.COMPANY_CONTACT_RELATION }],
    }),
    updateCompanyContractRelation: builder.mutation<
      { message: string },
      { id: number; relation: Partial<UpdateCompanyContactRelation> }
    >({
      query: ({ id, relation }) => ({
        url: `/company-contact-relations/${id}`,
        method: 'PUT',
        body: relation,
      }),
      invalidatesTags: () => [{ type: CrmApiTags.COMPANY_CONTACT_RELATION }],
    }),
    getAllCompanyContractRelations: builder.query<CompanyContactRelation[], string>({
      query: (queryParams) => `/company-contact-relations${queryParams}`,
      providesTags: () => [{ type: CrmApiTags.COMPANY_CONTACT_RELATION }],
    }),
    deleteCompanyContractRelation: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/company-contact-relations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{ type: CrmApiTags.COMPANY_CONTACT_RELATION }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateCompanyContractRelationMutation,
  useUpdateCompanyContractRelationMutation,
  useDeleteCompanyContractRelationMutation,
  useGetAllCompanyContractRelationsQuery,
} = companyContractRelationApi
