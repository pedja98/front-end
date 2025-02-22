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

export const transformCompanyIntoEditPageGridData = (company: Company, skipNameAsLink?: boolean): PageElement => ({
  name: {
    value: company.name,
    link: `/index/companies/${company.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  hqAddress: { type: GridFieldTypes.STRING, value: company.hqAddress },
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
  { label: t('company:name'), key: 'name' },
  { label: t('company:hqAddress'), key: 'hqAddress' },
  { label: t('company:industry'), key: 'industry' },
  { label: t('company:contactPhone'), key: 'contactPhone' },
  { label: t('company:numberOfEmployees'), key: 'numberOfEmployees' },
  { label: t('company:tin'), key: 'tin' },
  { label: t('company:bankName'), key: 'bankName' },
  { label: t('company:bankAccountNumber'), key: 'bankAccountNumber' },
  { label: t('company:assignedTo') + ':  ', key: 'assignedTo' },
  { label: t('company:temporaryAssignedTo'), key: 'temporaryAssignedTo' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
  { label: t('company:comment'), key: 'comment' },
]

export const getCompanyListColumns = (t: TFunction): GridLabel[] => [
  { label: t('company:name'), key: 'name' },
  { label: t('company:hqAddress'), key: 'hqAddress' },
  { label: t('company:contactPhone'), key: 'contactPhone' },
  { label: t('company:tin'), key: 'tin' },
  { label: t('company:assignedTo'), key: 'assignedTo' },
  { label: t('company:temporaryAssignedTo'), key: 'temporaryAssignedTo' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]

export const getCompanySaveLabels = (t: TFunction): GridLabel[] => [
  { label: t('company:name'), key: 'name' },
  { label: t('company:hqAddress'), key: 'hqAddress' },
  { label: t('company:industry'), key: 'industry' },
  { label: t('company:contactPhone'), key: 'contactPhone' },
  { label: t('company:tin'), key: 'tin' },
  { label: t('company:numberOfEmployees'), key: 'numberOfEmployees' },
  { label: t('company:bankName'), key: 'bankName' },
  { label: t('company:bankAccountNumber'), key: 'bankAccountNumber' },
  { label: t('company:assignedTo'), key: 'assignedTo' },
  { label: t('company:temporaryAssignedTo'), key: 'temporaryAssignedTo' },
  { label: t('company:comment'), key: 'comment' },
]
