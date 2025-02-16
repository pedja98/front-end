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
    link: `/index/user-management/user/${shop.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  region: {
    value: shop.regionName,
    link: `/index/regions/${shop.regionId}`,
    type: GridFieldTypes.LINK,
  },
  shopLeader: {
    value: shop.shopLeaderUsername,
    link: `/index/user-management/user/${shop.shopLeaderUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: shop.modifiedByUsername,
    link: `/index/user-management/user/${shop.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: { value: dateFormater(shop.dateCreated as string), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormater(shop.dateModified as string), type: GridFieldTypes.STRING },
})
