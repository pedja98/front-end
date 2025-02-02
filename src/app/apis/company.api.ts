import { Company, SaveCompanyDto } from './../../types/company'
import { CrmApiTags } from '../../consts/common'
import { crmApi } from './core/crm.api'

export const companyApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation<{ message: string }, Omit<Partial<Company>, 'id'>>({
      query: (companyData) => ({
        url: '/companies',
        method: 'POST',
        body: companyData,
      }),
    }),
    updateCompany: builder.mutation<{ message: string }, { id: number; company: Partial<SaveCompanyDto> }>({
      query: ({ id, company }) => ({
        url: `/companies/${id}`,
        method: 'PUT',
        body: company,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: CrmApiTags.COMPANY, id }],
    }),
    getCompany: builder.query<Company, number>({
      query: (id) => `/companies/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.COMPANY, id }],
    }),
    getCompanies: builder.query<Company[], string>({
      query: (queryParams) => `/companies${queryParams}`,
      providesTags: [CrmApiTags.COMPANY],
    }),
    deleteCompany: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/companies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: CrmApiTags.COMPANY, id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useGetCompaniesQuery,
  useDeleteCompanyMutation,
  useUpdateCompanyMutation,
} = companyApi
