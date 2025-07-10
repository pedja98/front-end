import { CrmApiTags } from '../../../consts/common'
import { Contract, ContractReport, CreateContract } from '../../../types/contract'
import { crmApi } from '../core/crm.api'

export const contractApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    createContract: builder.mutation<
      {
        message: string
      },
      CreateContract
    >({
      query: (contract) => ({
        url: '/contracts',
        method: 'POST',
        body: contract,
      }),
      invalidatesTags: [CrmApiTags.CONTRACT],
    }),
    getAllContracts: builder.query<Contract[], string>({
      query: (queryParams) => `/contracts${queryParams}`,
      providesTags: [CrmApiTags.CONTRACT],
    }),
    getContractById: builder.query<Contract, string | number>({
      query: (id) => `/contracts/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.CONTRACT, id }],
    }),
    signedContract: builder.mutation<{ message: string }, { dateSigned: string; contractId: number }>({
      query: ({ dateSigned, contractId }) => ({
        url: `/contracts/${contractId}/signed`,
        method: 'PUT',
        body: { dateSigned },
      }),
      invalidatesTags: [CrmApiTags.CONTRACT],
    }),
    verifyContract: builder.mutation<{ message: string }, { contractId: number }>({
      query: ({ contractId }) => ({
        url: `/contracts/${contractId}/verify`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: [CrmApiTags.CONTRACT],
    }),
    closeContract: builder.mutation<{ message: string }, { contractId: number }>({
      query: ({ contractId }) => ({
        url: `/contracts/${contractId}/close`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: [CrmApiTags.CONTRACT],
    }),
    getContractReport: builder.query<ContractReport[], string>({
      query: (queryParams) => `/contracts/report${queryParams}`,
      providesTags: [CrmApiTags.CONTRACT],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateContractMutation,
  useGetAllContractsQuery,
  useGetContractByIdQuery,
  useCloseContractMutation,
  useSignedContractMutation,
  useVerifyContractMutation,
  useGetContractReportQuery,
} = contractApi
