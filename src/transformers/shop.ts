import { GridFieldTypes } from '../consts/common'
import { PageElement } from '../types/common'

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
