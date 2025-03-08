import { TFunction } from 'i18next'
import { EmptyValue, GridFieldTypes } from '../consts/common'
import { dateFormater } from '../helpers/common'
import { GridLabel, PageElement } from '../types/common'
import { Company } from '../types/company'

export const getSaveCompanyGridData = (
  assignedToIds: (number | undefined)[],
  assignedToUsernames: (string | undefined)[],
): PageElement => ({
  name: { type: GridFieldTypes.STRING, required: true },
  hqAddress: { type: GridFieldTypes.STRING, required: true },
  industry: { type: GridFieldTypes.STRING, required: true },
  contactPhone: { type: GridFieldTypes.STRING, required: true },
  tin: { type: GridFieldTypes.NUMBER, required: true },
  numberOfEmployees: { type: GridFieldTypes.NUMBER, required: false },
  bankName: { type: GridFieldTypes.STRING, required: false },
  bankAccountNumber: { type: GridFieldTypes.STRING, required: false },
  assignedTo: {
    type: GridFieldTypes.SELECT,
    required: true,
    options: assignedToUsernames,
    optionsValues: assignedToIds,
  },
  temporaryAssignedTo: {
    type: GridFieldTypes.SELECT,
    required: false,
    options: assignedToUsernames,
    optionsValues: assignedToIds,
  },
  comment: { type: GridFieldTypes.AREA, required: false },
})

export const transformCompanyIntoEditPageGridData = (
  t: TFunction,
  company: Company,
  skipNameAsLink?: boolean,
): PageElement => ({
  name: {
    value: company.name,
    link: `/index/companies/${company.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  status: { type: GridFieldTypes.STRING, value: t(`companies:statuses.${company.status?.toLocaleLowerCase()}`) },
  hqAddress: { type: GridFieldTypes.AREA, value: company.hqAddress },
  contactPhone: { type: GridFieldTypes.STRING, value: company.contactPhone },
  tin: { type: GridFieldTypes.STRING, value: company.tin },
  bankName: { type: GridFieldTypes.STRING, value: company.bankName },
  bankAccountNumber: { type: GridFieldTypes.STRING, value: company.bankAccountNumber },
  comment: { type: GridFieldTypes.AREA, value: company.comment },
  assignedTo: {
    value: company.assignedToUsername,
    link: `/index/users/${company.assignedToUsername}`,
    type: GridFieldTypes.LINK,
  },
  temporaryAssignedTo: {
    value: company.temporaryAssignedToUsername,
    link: `/index/users/${company.temporaryAssignedToUsername}`,
    type: GridFieldTypes.LINK,
  },
  createdByUsername: {
    value: company.createdByUsername,
    link: `/index/users/${company.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: company.modifiedByUsername,
    link: `/index/users/${company.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: {
    value: company.dateCreated ? dateFormater(String(company.dateCreated)) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
  dateModified: {
    value: company.dateModified ? dateFormater(String(company.dateModified)) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
})

export const getCompanyDetailLabels = (t: TFunction): GridLabel[] => [
  { label: t('companies:name'), key: 'name' },
  { label: t('companies:status'), key: 'status' },
  { label: t('companies:industry'), key: 'industry' },
  { label: t('companies:contactPhone'), key: 'contactPhone' },
  { label: t('companies:numberOfEmployees'), key: 'numberOfEmployees' },
  { label: t('companies:tin'), key: 'tin' },
  { label: t('companies:bankName'), key: 'bankName' },
  { label: t('companies:bankAccountNumber'), key: 'bankAccountNumber' },
  { label: t('companies:assignedTo') + ':  ', key: 'assignedTo' },
  { label: t('companies:temporaryAssignedTo'), key: 'temporaryAssignedTo' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
  { label: t('companies:hqAddress'), key: 'hqAddress' },
  { label: t('companies:comment'), key: 'comment' },
]

export const getCompanyListColumns = (t: TFunction): GridLabel[] => [
  { label: t('companies:name'), key: 'name' },
  { label: t('companies:status'), key: 'status' },
  { label: t('companies:contactPhone'), key: 'contactPhone' },
  { label: t('companies:tin'), key: 'tin' },
  { label: t('companies:assignedTo'), key: 'assignedTo' },
  { label: t('companies:temporaryAssignedTo'), key: 'temporaryAssignedTo' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]

export const getCompanySaveLabels = (t: TFunction): GridLabel[] => [
  { label: t('companies:name'), key: 'name' },
  { label: t('companies:hqAddress'), key: 'hqAddress' },
  { label: t('companies:industry'), key: 'industry' },
  { label: t('companies:contactPhone'), key: 'contactPhone' },
  { label: t('companies:tin'), key: 'tin' },
  { label: t('companies:numberOfEmployees'), key: 'numberOfEmployees' },
  { label: t('companies:bankName'), key: 'bankName' },
  { label: t('companies:bankAccountNumber'), key: 'bankAccountNumber' },
  { label: t('companies:assignedTo'), key: 'assignedTo' },
  { label: t('companies:temporaryAssignedTo'), key: 'temporaryAssignedTo' },
  { label: t('companies:comment'), key: 'comment' },
]
