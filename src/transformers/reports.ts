import { TFunction } from 'i18next'
import { GridLabel, MultipleSelectEntityItem, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { createEnumMultiselectOptions, createMultiselectOptions } from '../helpers/common'
import { ContractStatus } from '../types/contract'
import { OpportunityType } from '../types/opportunity'
import { ReportFormProps } from '../types/report'

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
