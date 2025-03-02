import { GridLabel } from './../types/common'
import { TFunction } from 'i18next'
import { GridFieldTypes } from '../consts/common'
import { dateFormater } from '../helpers/common'
import { PageElement } from '../types/common'
import { Shop } from '../types/shop'

export const getSaveShopGridData = (
  shopLeaderIds: (number | undefined)[],
  shopLeaderUsernames: (string | undefined)[],
  regionIds: (number | undefined)[],
  regionNames: (string | undefined)[],
): PageElement => ({
  name: { type: GridFieldTypes.STRING, required: true },
  address: { type: GridFieldTypes.STRING, required: true },
  shopLeader: {
    type: GridFieldTypes.SELECT,
    required: true,
    options: shopLeaderUsernames,
    optionsValues: shopLeaderIds,
  },
  region: { type: GridFieldTypes.SELECT, required: true, options: regionNames, optionsValues: regionIds },
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
  dateCreated: { value: dateFormater(shop.dateCreated as string), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormater(shop.dateModified as string), type: GridFieldTypes.STRING },
})

export const getShopDetailListLabels = (t: TFunction): GridLabel[] => [
  { label: t('shops:name'), key: 'name' },
  { label: t('shops:address'), key: 'address' },
  { label: t('shops:region'), key: 'region' },
  { label: t('shops:shopLeader'), key: 'shopLeader' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]

export const getShopSaveLabels = (t: TFunction): GridLabel[] => [
  { label: t('shops:name'), key: 'name' },
  { label: t('shops:address'), key: 'address' },
  { label: t('shops:shopLeader'), key: 'shopLeader' },
  { label: t('shops:region'), key: 'region' },
]
