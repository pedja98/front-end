import { TFunction } from 'i18next'
import { GridLabel, MultipleSelectEntityItem, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { createEnumMultiselectOptions, createMultiselectOptions } from '../helpers/common'
import { ContractReport, ContractStatus } from '../types/contract'
import { OpportunityType } from '../types/opportunity'
import { ReportFormProps } from '../types/report'
import moment from 'moment'

export const getReportLabels = (t: TFunction): GridLabel[] => [
  { text: t('reports:contractStatuses'), key: 'contractStatuses' },
  { text: t('reports:opportunityTypes'), key: 'opportunityTypes' },
  { text: t('reports:regions'), key: 'regions' },
  { text: t('reports:shops'), key: 'shops' },
  { text: t('reports:signatureStartDate'), key: 'signatureStartDate' },
  { text: t('reports:signatureEndDate'), key: 'signatureEndDate' },
]

export const getReportGridData = (
  reportData: ReportFormProps,
  regions: MultipleSelectEntityItem[],
  shops: MultipleSelectEntityItem[],
  t: TFunction,
): PageElement => ({
  contractStatuses: {
    type: GridFieldTypes.MULTISELECT,
    multiselectValue: reportData.contractStatuses || [],
    multiselectOptions: createEnumMultiselectOptions(ContractStatus, 'contracts:statuses', t),
    dialogField: true,
  },
  opportunityTypes: {
    type: GridFieldTypes.MULTISELECT,
    multiselectValue: reportData.opportunityTypes || [],
    multiselectOptions: createEnumMultiselectOptions(OpportunityType, 'opportunities:opportunityTypes', t),
    dialogField: true,
  },
  regions: {
    type: GridFieldTypes.MULTISELECT,
    multiselectValue: reportData.regions || [],
    multiselectOptions: createMultiselectOptions(regions),
    dialogField: true,
  },
  shops: {
    type: GridFieldTypes.MULTISELECT,
    multiselectValue: reportData.shops || [],
    multiselectOptions: createMultiselectOptions(shops),
    dialogField: true,
  },
  signatureStartDate: {
    type: GridFieldTypes.DATE,
    value: reportData.signatureStartDate || '',
  },
  signatureEndDate: {
    type: GridFieldTypes.DATE,
    value: reportData.signatureEndDate || '',
  },
})

export const getReportTableColumns = (t: TFunction): GridLabel[] => [
  { text: t('reports:contract'), key: 'contract' },
  { text: t('reports:referenceNumber'), key: 'referenceNumber' },
  { text: t('reports:dateSigned'), key: 'dateSigned' },
  { text: t('reports:contractStatus'), key: 'contractStatus' },
  { text: t('reports:company'), key: 'company' },
  { text: t('reports:opportunity'), key: 'opportunity' },
  { text: t('reports:opportunityType'), key: 'opportunityType' },
  { text: t('reports:shop'), key: 'shop' },
  { text: t('reports:region'), key: 'region' },
]

export const transformReportTableRow = (contractReport: ContractReport, t: TFunction): PageElement => ({
  contract: {
    type: GridFieldTypes.LINK,
    value: contractReport.contractName,
    link: `/index/contracts/${contractReport.contractId}`,
  },
  referenceNumber: {
    type: GridFieldTypes.STRING,
    value: contractReport.referenceNumber,
  },
  dateSigned: {
    type: GridFieldTypes.STRING,
    value: contractReport.dateSigned ? moment(contractReport.dateSigned).format('MM/DD/YYYY') : '/',
  },
  contractStatus: {
    type: GridFieldTypes.STRING,
    value: t(`contracts:statuses.${contractReport.contractStatus.toLowerCase()}`),
  },
  company: {
    type: GridFieldTypes.LINK,
    value: contractReport.companyName,
    link: `/index/companies/${contractReport.companyId}`,
  },
  opportunity: {
    type: GridFieldTypes.LINK,
    value: contractReport.opportunityName,
    link: `/index/opportunities/${contractReport.opportunityId}`,
  },
  opportunityType: {
    type: GridFieldTypes.STRING,
    value: t(`opportunities:opportunityTypes.${contractReport.opportunityType.toLowerCase()}`),
  },
  shop: {
    type: GridFieldTypes.LINK,
    value: contractReport.shopName,
    link: `/index/shops/${contractReport.shopId}`,
  },
  region: {
    type: GridFieldTypes.LINK,
    value: contractReport.regionName,
    link: `/index/regions/${contractReport.regionId}`,
  },
})
