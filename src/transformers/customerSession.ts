import { TFunction } from 'i18next'
import { AutocompleteHashMap, GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { dateFormater } from '../helpers/common'
import { CustomerSession } from '../types/customerSession'

export const getCustomerSessionDetailListLabels = (t: TFunction): GridLabel[] => [
  { label: t('customerSessions:name'), key: 'name' },
  { label: t('customerSessions:status'), key: 'status' },
  { label: t('customerSessions:type'), key: 'type' },
  { label: t('customerSessions:mode'), key: 'mode' },
  { label: t('customerSessions:sessionStart'), key: 'sessionStart' },
  { label: t('customerSessions:sessionEnd'), key: 'sessionEnd' },
  { label: t('customerSessions:outcome'), key: 'outcome' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
  { label: t('general:description'), key: 'description' },
]

export const getCustomerSessionTableColumns = (t: TFunction): GridLabel[] => [
  { label: t('customerSessions:name'), key: 'name' },
  { label: t('customerSessions:status'), key: 'status' },
  { label: t('customerSessions:type'), key: 'type' },
  { label: t('customerSessions:mode'), key: 'mode' },
  { label: t('customerSessions:outcome'), key: 'outcome' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]

export const getCustomerSessionSaveLabels = (t: TFunction): GridLabel[] => [
  { label: t('customerSessions:company'), key: 'company' },
  { label: t('customerSessions:status'), key: 'status' },
  { label: t('customerSessions:type'), key: 'type' },
  { label: t('customerSessions:mode'), key: 'mode' },
  { label: t('customerSessions:sessionStart'), key: 'sessionStart' },
  { label: t('customerSessions:sessionEnd'), key: 'sessionEnd' },
  { label: t('customerSessions:outcome'), key: 'outcome' },
  { label: t('customerSessions:description'), key: 'description' },
]

export const transformCustomerSessionIntoPageGridData = (
  t: TFunction,
  customerSession: CustomerSession,
  skipNameAsLink?: boolean,
): PageElement => ({
  name: {
    value: customerSession.name,
    link: `/index/customer-sessions/${customerSession.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  status: { value: customerSession.status, type: GridFieldTypes.STRING },
  type: { value: customerSession.type, type: GridFieldTypes.STRING },
  mode: {
    value: t(`customerSessions:documentTypes.${customerSession.mode.toLocaleLowerCase()}`),
    type: GridFieldTypes.STRING,
  },
  sessionStart: { value: dateFormater(customerSession.sessionStart as string), type: GridFieldTypes.STRING },
  sessionEnd: { value: dateFormater(customerSession.sessionEnd as string), type: GridFieldTypes.STRING },
  outcome: { value: customerSession.outcome, type: GridFieldTypes.STRING },
  createdByUsername: {
    value: customerSession.createdByUsername,
    link: `/index/users/${customerSession.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: customerSession.modifiedByUsername,
    link: `/index/users/${customerSession.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: { value: dateFormater(customerSession.dateCreated as string), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormater(customerSession.dateModified as string), type: GridFieldTypes.STRING },
  description: { type: GridFieldTypes.AREA, value: customerSession.description },
})

export const getSaveCustomerSessionGridData = (
  customerSessionStatusOptions: string[],
  customerSessionStatusOptionValues: string[],
  customerSessionTypeOptions: string[],
  customerSessionTypeOptionValues: string[],
  customerSessionModeOptions: string[],
  customerSessionModeOptionValues: string[],
  customerSessionOutcomeOptions: string[],
  customerSessionOutcomeOptionValues: string[],
  companiesMap: AutocompleteHashMap,
): PageElement => ({
  company: {
    required: true,
    type: GridFieldTypes.AUTOCOMPLETE,
    autocompleteMap: companiesMap,
  },
  status: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: customerSessionStatusOptions,
    optionsValues: customerSessionStatusOptionValues,
  },
  type: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: customerSessionTypeOptions,
    optionsValues: customerSessionTypeOptionValues,
  },
  mode: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: customerSessionModeOptions,
    optionsValues: customerSessionModeOptionValues,
  },
  sessionStart: { type: GridFieldTypes.DATE_TIME, required: true },
  sessionEnd: { type: GridFieldTypes.DATE_TIME, required: true },
  outcome: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: customerSessionOutcomeOptions,
    optionsValues: customerSessionOutcomeOptionValues,
  },
  description: { type: GridFieldTypes.AREA, required: false },
})
