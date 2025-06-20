import { TFunction } from 'i18next'
import { AutocompleteHashMap, GridLabel, PageElement } from '../types/common'
import { GridFieldTypes } from '../consts/common'
import { dateFormatter } from '../helpers/common'
import {
  CustomerSession,
  CustomerSessionMode,
  CustomerSessionOutcome,
  CustomerSessionSearchFormProps,
  CustomerSessionStatus,
  CustomerSessionType,
  SaveCustomerSession,
} from '../types/customerSession'

export const getCustomerSessionDetailPageLabels = (t: TFunction): GridLabel[] => [
  { text: t('customerSessions:name'), key: 'name' },
  { text: t('customerSessions:status'), key: 'status' },
  { text: t('customerSessions:type'), key: 'type' },
  { text: t('customerSessions:mode'), key: 'mode' },
  { text: t('customerSessions:sessionStart'), key: 'sessionStart' },
  { text: t('customerSessions:sessionEnd'), key: 'sessionEnd' },
  { text: t('customerSessions:outcome'), key: 'outcome' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
  { text: t('general:description'), key: 'description' },
]

export const getCustomerSessionTableColumns = (t: TFunction): GridLabel[] => [
  { text: t('customerSessions:name'), key: 'name' },
  { text: t('customerSessions:status'), key: 'status' },
  { text: t('customerSessions:type'), key: 'type' },
  { text: t('customerSessions:mode'), key: 'mode' },
  { text: t('customerSessions:outcome'), key: 'outcome' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
]

export const getCustomerSessionSaveLabels = (t: TFunction): GridLabel[] => [
  { text: t('customerSessions:company'), key: 'company' },
  { text: t('customerSessions:status'), key: 'status' },
  { text: t('customerSessions:type'), key: 'type' },
  { text: t('customerSessions:mode'), key: 'mode' },
  { text: t('customerSessions:sessionStart'), key: 'sessionStart' },
  { text: t('customerSessions:sessionEnd'), key: 'sessionEnd' },
  { text: t('customerSessions:outcome'), key: 'outcome' },
  { text: t('customerSessions:description'), key: 'description' },
  { text: t('opportunities:opportunityType'), key: 'opportunityType' },
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
  status: {
    value: t(`customerSessions:customerSessionsStatuses.${customerSession.status}`),
    type: GridFieldTypes.STRING,
  },
  type: {
    value: t(`customerSessions:customerSessionTypes.${customerSession.type}`),
    type: GridFieldTypes.STRING,
  },
  mode: {
    value: t(`customerSessions:customerSessionModes.${customerSession.mode}`),
    type: GridFieldTypes.STRING,
  },
  sessionStart: { value: dateFormatter(customerSession.sessionStart as string), type: GridFieldTypes.STRING },
  sessionEnd: { value: dateFormatter(customerSession.sessionEnd as string), type: GridFieldTypes.STRING },
  outcome: {
    value: t(`customerSessions:customerSessionOutcomes.${customerSession.outcome}`),
    type: GridFieldTypes.STRING,
  },
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
  dateCreated: { value: dateFormatter(customerSession.dateCreated as string), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormatter(customerSession.dateModified as string), type: GridFieldTypes.STRING },
  description: { type: GridFieldTypes.AREA, value: customerSession.description },
})

export const getSaveCustomerSessionGridData = (
  customerSessionData: Partial<SaveCustomerSession>,
  customerSessionStatusOptions: string[],
  customerSessionStatusOptionValues: string[],
  customerSessionTypeOptions: string[],
  customerSessionTypeOptionValues: string[],
  customerSessionModeOptions: string[],
  customerSessionModeOptionValues: string[],
  customerSessionOutcomeOptions: string[],
  customerSessionOutcomeOptionValues: string[],
  companiesMap: AutocompleteHashMap,
  opportunityTypeOptions: string[],
  opportunityTypeOptionValues: string[],
): PageElement => ({
  company: {
    required: true,
    type: GridFieldTypes.AUTOCOMPLETE,
    autocompleteMap: companiesMap,
    value: customerSessionData.company,
  },
  status: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: customerSessionStatusOptions,
    optionsValues: customerSessionStatusOptionValues,
    value: customerSessionData.status,
  },
  type: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: customerSessionTypeOptions,
    optionsValues: customerSessionTypeOptionValues,
    value: customerSessionData.type,
  },
  mode: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: customerSessionModeOptions,
    optionsValues: customerSessionModeOptionValues,
    value: customerSessionData.mode,
  },
  sessionStart: { type: GridFieldTypes.DATE_TIME, required: true, value: customerSessionData.sessionStart },
  sessionEnd: { type: GridFieldTypes.DATE_TIME, required: true, value: customerSessionData.sessionEnd },
  outcome: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: customerSessionOutcomeOptions,
    optionsValues: customerSessionOutcomeOptionValues,
    value: customerSessionData.outcome,
  },
  description: { type: GridFieldTypes.AREA, required: false, value: customerSessionData.description },
  opportunityType: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: opportunityTypeOptions,
    optionsValues: opportunityTypeOptionValues,
    value: customerSessionData.opportunityType,
    disabled:
      customerSessionData.status !== CustomerSessionStatus.HELD ||
      customerSessionData.outcome !== CustomerSessionOutcome.NEW_OFFER,
  },
})

export const getCustomerSessionSearchLabels = (t: TFunction): GridLabel[] => [
  { text: t('customerSessions:name'), key: 'name' },
  { text: t('customerSessions:statuses'), key: 'status' },
  { text: t('customerSessions:types'), key: 'type' },
  { text: t('customerSessions:modes'), key: 'mode' },
  { text: t('customerSessions:outcomes'), key: 'outcome' },
]

export const getCustomerSessionSearchGridData = (
  customerSessionSearchData: CustomerSessionSearchFormProps,
  customerSessionStatuses: Record<CustomerSessionStatus, string>,
  customerSessionModes: Record<CustomerSessionMode, string>,
  customerSessionTypes: Record<CustomerSessionType, string>,
  customerSessionOutcomes: Record<CustomerSessionOutcome, string>,
): PageElement => ({
  name: {
    value: customerSessionSearchData.name,
    type: GridFieldTypes.STRING,
  },
  status: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: customerSessionStatuses,
    multiselectOptionValues: CustomerSessionStatus,
    multiselectValue: customerSessionSearchData.status,
    dialogField: true,
  },
  mode: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: customerSessionModes,
    multiselectOptionValues: CustomerSessionMode,
    multiselectValue: customerSessionSearchData.mode,
    dialogField: true,
  },
  type: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: customerSessionTypes,
    multiselectOptionValues: CustomerSessionType,
    multiselectValue: customerSessionSearchData.type,
    dialogField: true,
  },
  outcome: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: customerSessionOutcomes,
    multiselectOptionValues: CustomerSessionOutcome,
    multiselectValue: customerSessionSearchData.outcome,
    dialogField: true,
  },
})
