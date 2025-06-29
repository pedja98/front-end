import { CrmApiTags } from '../../../consts/common'
import { DocumentUploadDto, Document } from '../../../types/document'
import { crmApi } from '../core/crm.api'

export const documentApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadDocument: builder.mutation<{ message: string }, DocumentUploadDto>({
      query: (body) => ({
        url: 'documents/upload',
        method: 'POST',
        body,
      }),
      invalidatesTags: [CrmApiTags.DOCUMENT],
    }),
    getDocumentsByContractId: builder.query<Document[], string>({
      query: (id) => `/documents/contract/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.DOCUMENT, id }],
    }),
    deleteDocument: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `documents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [CrmApiTags.DOCUMENT],
    }),
    downloadDocument: builder.mutation<{ response: string }, number>({
      query: (documentId) => ({
        url: `documents/download/${documentId}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useUploadDocumentMutation,
  useGetDocumentsByContractIdQuery,
  useDeleteDocumentMutation,
  useDownloadDocumentMutation,
} = documentApi
