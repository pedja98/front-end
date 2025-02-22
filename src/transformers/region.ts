import { GridFieldTypes } from '../consts/common'
import { dateFormater } from '../helpers/common'
import { PageElement } from '../types/common'
import { Region } from '../types/region'

export const transformRegionIntoPageGridData = (region: Region, skipNameAsLink?: boolean): PageElement => ({
  name: {
    value: region.name,
    link: `/index/regions/${region.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  createdByUsername: {
    value: region.createdByUsername,
    link: `/index/users/${region.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: region.modifiedByUsername,
    link: `/index/users/${region.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: { value: dateFormater(region.dateCreated), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormater(region.dateModified), type: GridFieldTypes.STRING },
})
