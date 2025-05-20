import { TFunction } from 'i18next'
import { GridFieldTypes } from '../consts/common'
import { dateFormatter } from '../helpers/common'
import { GridLabel, PageElement } from '../types/common'
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
  dateCreated: { value: dateFormatter(region.dateCreated), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormatter(region.dateModified), type: GridFieldTypes.STRING },
})

export const getRegionPageGridLabels = (t: TFunction): GridLabel[] => [
  { label: t('regions:name'), key: 'name' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]
