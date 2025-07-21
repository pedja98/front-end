import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { Offer, OfferSearchFormProps, OfferStatus } from '../types/offer'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { dateFormatter } from '../helpers/common'

export const transformOfferDataIntoGridData = (t: TFunction, offer: Offer, skipNameAsLink?: boolean): PageElement => ({
  name: {
    value: offer.name,
    link: `/index/offers/${offer.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  companyName: {
    value: offer.companyName,
    link: `/index/companies/${offer.companyId}`,
    type: GridFieldTypes.LINK,
  },
  opportunityName: {
    value: offer.opportunityName,
    link: `/index/opportunities/${offer.opportunityId}`,
    type: GridFieldTypes.LINK,
  },
  contractName: {
    value: offer.contractName,
    link: `/index/contracts/${offer.contractId}`,
    type: GridFieldTypes.LINK,
  },
  status: {
    value: t(`offers:statuses.${offer.status.toLocaleLowerCase()}`),
    type: GridFieldTypes.STRING,
  },
  createdByUsername: {
    value: offer.createdByUsername,
    link: `/index/users/${offer.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: offer.modifiedByUsername,
    link: `/index/users/${offer.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: {
    value: offer.dateCreated ? dateFormatter(offer.dateCreated) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
  dateModified: {
    value: offer.dateModified ? dateFormatter(offer.dateModified) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
})

export const getOfferSearchLabels = (t: TFunction): GridLabel[] => [
  { text: t('offers:name'), key: 'name' },
  { text: t('offers:status'), key: 'status' },
]

export const getOfferSearchGridData = (
  offerSearchData: OfferSearchFormProps,
  offerStatuses: Record<OfferStatus, string>,
): PageElement => ({
  name: { type: GridFieldTypes.STRING, value: offerSearchData.name },
  status: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: offerStatuses,
    multiselectOptionValues: OfferStatus,
    multiselectValue: offerSearchData.status,
    dialogField: true,
  },
})

export const getOfferListColumns = (t: TFunction, isCompanyOrOppDetailPage?: boolean): GridLabel[] =>
  [
    { text: t('offers:name'), key: 'name' },
    !isCompanyOrOppDetailPage && { text: t('offers:company'), key: 'companyName' },
    !isCompanyOrOppDetailPage && { text: t('offers:opportunity'), key: 'opportunityName' },
    !isCompanyOrOppDetailPage && { text: t('offers:contract'), key: 'contractName' },
    { text: t('offers:status'), key: 'status' },
    { text: t('general:createdBy'), key: 'createdByUsername' },
    { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
    { text: t('general:dateCreated'), key: 'dateCreated' },
    { text: t('general:dateModified'), key: 'dateModified' },
  ].filter(Boolean) as GridLabel[]

export const getOfferDetailLabels = (t: TFunction): GridLabel[] => [
  { text: t('offers:name'), key: 'name' },
  { text: t('offers:company'), key: 'companyName' },
  { text: t('offers:opportunity'), key: 'opportunityName' },
  { text: t('offers:contract'), key: 'contractName' },
  { text: t('offers:status'), key: 'status' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
]
