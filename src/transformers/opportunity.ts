import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { dateFormatter } from '../helpers/common'
import { Opportunity, OpportunitySearchFormProps, OpportunityStatus, OpportunityType } from '../types/opportunity'

export const getOpportunityDetailGridLabels = (t: TFunction, isExpandableTable?: boolean): GridLabel[] => [
  { text: t('opportunities:name'), key: 'name' },
  ...(!isExpandableTable ? [{ text: t('opportunities:company'), key: 'company' }] : []),
  { text: t('opportunities:status'), key: 'status' },
  { text: t('opportunities:type'), key: 'type' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
]

export const transformOpportunityDataIntoGridData = (
  t: TFunction,
  opportunity: Opportunity,
  skipNameAsLink?: boolean,
): PageElement => ({
  name: {
    value: opportunity.name,
    link: `/index/opportunities/${opportunity.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  company: {
    type: GridFieldTypes.LINK,
    value: opportunity.companyName,
    link: `/index/companies/${opportunity.companyId}`,
  },
  status: {
    type: GridFieldTypes.STRING,
    value: t(`opportunities:opportunityStatuses.${opportunity.status?.toLowerCase()}`),
  },
  type: { type: GridFieldTypes.STRING, value: t(`opportunities:opportunityTypes.${opportunity.type?.toLowerCase()}`) },
  createdByUsername: {
    value: opportunity.createdByUsername,
    link: `/index/users/${opportunity.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: opportunity.modifiedByUsername,
    link: `/index/users/${opportunity.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: {
    value: opportunity.dateCreated ? dateFormatter(String(opportunity.dateCreated)) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
  dateModified: {
    value: opportunity.dateModified ? dateFormatter(String(opportunity.dateModified)) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
})

export const getOpportunitySearchLabels = (t: TFunction): GridLabel[] => [
  { text: t('opportunities:name'), key: 'name' },
  { text: t('opportunities:statuses'), key: 'status' },
  { text: t('opportunities:types'), key: 'type' },
]

export const getOpportunitySearchGridData = (
  opportunitySearchData: OpportunitySearchFormProps,
  opportunityStatuses: Record<OpportunityStatus, string>,
  opportunityTypes: Record<OpportunityType, string>,
): PageElement => ({
  name: { type: GridFieldTypes.STRING, value: opportunitySearchData.name },
  status: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: opportunityStatuses,
    multiselectOptionValues: OpportunityStatus,
    multiselectValue: opportunitySearchData.status,
    dialogField: true,
  },
  type: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: opportunityTypes,
    multiselectOptionValues: OpportunityType,
    multiselectValue: opportunitySearchData.type,
    dialogField: true,
  },
})
