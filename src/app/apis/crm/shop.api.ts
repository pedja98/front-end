import { CrmApiTags } from '../../../consts/common'
import { SaveShop, Shop } from '../../../types/shop'
import { crmApi } from '../core/crm.api'

export const shopApi = crmApi.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation<{ message: string }, Omit<SaveShop, 'id'>>({
      query: (shopData) => ({
        url: '/shops',
        method: 'POST',
        body: shopData,
      }),
      invalidatesTags: [CrmApiTags.SHOP],
    }),
    updateShop: builder.mutation<{ message: string }, { id: string; shop: Partial<Shop> }>({
      query: ({ id, shop }) => ({
        url: `/shops/${id}`,
        method: 'PUT',
        body: shop,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: CrmApiTags.SHOP, id }],
    }),
    getShop: builder.query<Shop, string>({
      query: (id) => `/shops/${id}`,
      providesTags: (result, error, id) => [{ type: CrmApiTags.SHOP, id }],
    }),
    getShops: builder.query<Shop[], string>({
      query: (queryParams) => `/shops${queryParams}`,
      providesTags: [CrmApiTags.SHOP],
    }),
    deleteShop: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/shops/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: CrmApiTags.SHOP, id }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateShopMutation,
  useDeleteShopMutation,
  useGetShopQuery,
  useGetShopsQuery,
  useUpdateShopMutation,
} = shopApi
