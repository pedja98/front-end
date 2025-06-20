import { AutocompleteHashMap, GridLabel } from './../types/common'
import { TFunction } from 'i18next'
import { GridFieldTypes } from '../consts/common'
import { dateFormatter } from '../helpers/common'
import { PageElement } from '../types/common'
import { SaveShop, Shop, ShopSearchFormProps } from '../types/shop'

export const getSaveShopGridData = (
  shopData: SaveShop,
  shopLeadersMap: AutocompleteHashMap,
  regionsMap: AutocompleteHashMap,
): PageElement => ({
  name: { type: GridFieldTypes.STRING, required: true, value: shopData.name },
  address: { type: GridFieldTypes.STRING, required: true, value: shopData.address },
  shopLeader: {
    type: GridFieldTypes.AUTOCOMPLETE,
    required: true,
    autocompleteMap: shopLeadersMap,
    value: shopData.shopLeader,
  },
  region: { type: GridFieldTypes.AUTOCOMPLETE, required: true, autocompleteMap: regionsMap, value: shopData.region },
})

export const transformShopIntoPageGridData = (shop: Shop, skipNameAsLink?: boolean): PageElement => ({
  name: {
    value: shop.name,
    link: `/index/shops/${shop.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  address: { value: shop.address, type: GridFieldTypes.STRING },
  createdByUsername: {
    value: shop.createdByUsername,
    link: `/index/users/${shop.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  region: {
    value: shop.regionName,
    link: `/index/regions/${shop.regionId}`,
    type: GridFieldTypes.LINK,
  },
  shopLeader: {
    value: shop.shopLeaderUsername,
    link: `/index/users/${shop.shopLeaderUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: shop.modifiedByUsername,
    link: `/index/users/${shop.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: { value: dateFormatter(shop.dateCreated as string), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormatter(shop.dateModified as string), type: GridFieldTypes.STRING },
})

export const getShopDetailListLabels = (t: TFunction): GridLabel[] => [
  { text: t('shops:name'), key: 'name' },
  { text: t('shops:address'), key: 'address' },
  { text: t('shops:region'), key: 'region' },
  { text: t('shops:shopLeader'), key: 'shopLeader' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
]

export const getShopSaveLabels = (t: TFunction): GridLabel[] => [
  { text: t('shops:name'), key: 'name' },
  { text: t('shops:address'), key: 'address' },
  { text: t('shops:shopLeader'), key: 'shopLeader' },
  { text: t('shops:region'), key: 'region' },
]

export const getShopSearchLabels = (t: TFunction): GridLabel[] => [
  { text: t('shops:name'), key: 'name' },
  { text: t('shops:shopLeaders'), key: 'shopLeader' },
  { text: t('shops:regions'), key: 'region' },
]

export const getShopSearchGridData = (shopSearchData: Partial<ShopSearchFormProps>): PageElement => ({
  name: { type: GridFieldTypes.STRING, required: true, value: shopSearchData.name },
})
