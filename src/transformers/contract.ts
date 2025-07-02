import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { Contract, ContractSearchFormProps, ContractStatus } from '../types/contract'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { dateFormatter } from '../helpers/common'
import { Document } from '../types/document'
import moment from 'moment'
import { PrintTariffPlan, TariffPlanCharacteristicChar } from '../types/tariffPlans'

export const getContractSearchLabels = (t: TFunction): GridLabel[] => [
  { text: t('contracts:name'), key: 'name' },
  { text: t('contracts:status'), key: 'status' },
  { text: t('contracts:referenceNumber'), key: 'referenceNumber' },
]

export const getContractSearchGridData = (
  contractSearchData: ContractSearchFormProps,
  contractStatuses: Record<ContractStatus, string>,
): PageElement => ({
  name: { type: GridFieldTypes.STRING, value: contractSearchData.name },
  referenceNumber: { type: GridFieldTypes.STRING, value: contractSearchData.referenceNumber },
  status: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: contractStatuses,
    multiselectOptionValues: ContractStatus,
    multiselectValue: contractSearchData.status,
    dialogField: true,
  },
})

export const getContractLabels = (t: TFunction): GridLabel[] => [
  { text: t('contracts:name'), key: 'name' },
  { text: t('contracts:status'), key: 'status' },
  { text: t('contracts:referenceNumber'), key: 'referenceNumber' },
  { text: t('contracts:dateSigned'), key: 'dateSigned' },
  { text: t('contracts:company'), key: 'company' },
  { text: t('contracts:opportunity'), key: 'opportunity' },
  { text: t('contracts:offer'), key: 'offer' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
]

export const transformContractDataIntoGridData = (
  t: TFunction,
  contract: Contract,
  skipNameAsLink?: boolean,
): PageElement => ({
  name: {
    value: contract.name,
    link: `/index/contracts/${contract.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  status: {
    value: t(`contracts:statuses.${contract.status.toLocaleLowerCase()}`),
    type: GridFieldTypes.STRING,
  },
  dateSigned: {
    value: moment(contract.dateSigned).format('MM/DD/YYYY'),
    type: GridFieldTypes.STRING,
  },
  referenceNumber: {
    value: contract.referenceNumber,
    type: GridFieldTypes.STRING,
  },
  company: {
    value: contract.companyName,
    link: `/index/companies/${contract.companyId}`,
    type: GridFieldTypes.LINK,
  },
  opportunity: {
    value: contract.opportunityName,
    link: `/index/opportunities/${contract.opportunityId}`,
    type: GridFieldTypes.LINK,
  },
  offer: {
    value: contract.offerName,
    link: `/index/offers/${contract.offerId}`,
    type: GridFieldTypes.LINK,
  },
  createdByUsername: {
    value: contract.createdByUsername,
    link: `/index/users/${contract.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: contract.modifiedByUsername,
    link: `/index/users/${contract.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: {
    value: contract.dateCreated ? dateFormatter(contract.dateCreated) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
  dateModified: {
    value: contract.dateModified ? dateFormatter(contract.dateModified) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
})

export const getDocumentTableColumns = (t: TFunction): GridLabel[] => [
  { text: t('contracts:name'), key: 'name' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
  { text: t('general:download'), key: 'download' },
  { text: t('general:remove'), key: 'remove' },
]

export const transformIntoDocumentTableRows = (
  document: Document,
  handleRemoveDocument: (id: number) => void,
  handleDownload: (id: number) => void,
): PageElement => ({
  name: {
    value: document.documentName,
    type: GridFieldTypes.STRING,
  },
  createdByUsername: {
    value: document.createdByUsername,
    link: `/index/users/${document.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: document.modifiedByUsername,
    link: `/index/users/${document.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: {
    value: document.dateCreated ? dateFormatter(document.dateCreated) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
  dateModified: {
    value: document.dateModified ? dateFormatter(document.dateModified) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
  download: { type: GridFieldTypes.BUTTON, handleClick: handleDownload, id: document.id },
  remove: { type: GridFieldTypes.BUTTON, handleClick: handleRemoveDocument, id: document.id },
})

export const getPrintTariffPlanCountTableColumns = (): GridLabel[] => [
  { text: 'Ime', key: 'name' },
  { text: 'Mesečna cena (RSD)', key: 'price' },
  { text: 'Količina', key: 'count' },
]

export const transformPrintTariffPlanCountTableRows = (tariffPlanData: PrintTariffPlan): PageElement => ({
  name: {
    value: tariffPlanData.name.sr,
    type: GridFieldTypes.STRING,
  },
  price: {
    value: tariffPlanData.price.toLocaleString('de-DE', { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
    type: GridFieldTypes.STRING,
  },
  count: {
    value: tariffPlanData.count,
    type: GridFieldTypes.STRING,
  },
})

export const getTariffPlanCharTableColumn = (name: string): GridLabel[] => [{ text: name, key: 'char' }]

export const transformTariffPlanCharTableRows = (char: TariffPlanCharacteristicChar): PageElement => ({
  char: {
    value: char.name.sr,
    type: GridFieldTypes.STRING,
  },
})
