import { CrmApiTags } from '../../../consts/common'
import { Contract, CreateContract } from '../../../types/contract'
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
  }),
  overrideExisting: false,
})

export const { useCreateContractMutation, useGetAllContractsQuery, useGetContractByIdQuery } = contractApi
