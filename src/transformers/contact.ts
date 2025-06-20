import { TFunction } from 'i18next'
import { AutocompleteHashMap, GridLabel, PageElement } from '../types/common'
import {
  CompanyContactRelation,
  Contact,
  ContactDocumentType,
  ContactSearchFormProps,
  SaveContact,
  UpdateCompanyContactRelation,
} from '../types/contact'
import { GridFieldTypes } from '../consts/common'
import { dateFormatter } from '../helpers/common'

export const getContactDetailListLabels = (t: TFunction): GridLabel[] => [
  { text: t('contacts:fullName'), key: 'fullName' },
  { text: t('contacts:email'), key: 'email' },
  { text: t('contacts:phone'), key: 'phone' },
  { text: t('contacts:documentType'), key: 'documentType' },
  { text: t('contacts:documentId'), key: 'documentId' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
]

export const getContactSaveLabels = (t: TFunction): GridLabel[] => [
  { text: t('contacts:firstName'), key: 'firstName' },
  { text: t('contacts:lastName'), key: 'lastName' },
  { text: t('contacts:email'), key: 'email' },
  { text: t('contacts:phone'), key: 'phone' },
  { text: t('contacts:documentType'), key: 'documentType' },
  { text: t('contacts:documentId'), key: 'documentId' },
]

export const transformContactIntoPageGridData = (
  t: TFunction,
  contact: Contact,
  skipFullNameAsLink?: boolean,
): PageElement => ({
  fullName: {
    value: contact.firstName + ' ' + contact.lastName,
    link: `/index/contacts/${contact.id}`,
    type: skipFullNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  email: { value: contact.email, type: GridFieldTypes.STRING },
  phone: { value: contact.phone, type: GridFieldTypes.STRING },
  documentType: {
    value: t(`contacts:documentTypes.${contact.documentType.toLocaleLowerCase()}`),
    type: GridFieldTypes.STRING,
  },
  documentId: { value: contact.documentId, type: GridFieldTypes.STRING },
  createdByUsername: {
    value: contact.createdByUsername,
    link: `/index/users/${contact.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: contact.modifiedByUsername,
    link: `/index/users/${contact.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: { value: dateFormatter(contact.dateCreated as string), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormatter(contact.dateModified as string), type: GridFieldTypes.STRING },
})

export const getSaveContactGridData = (
  contactData: Partial<SaveContact>,
  documentTypeOptions: string[],
  documentTypeOptionValues: (undefined | string)[],
): PageElement => ({
  firstName: {
    type: GridFieldTypes.STRING,
    required: true,
    value: contactData.firstName,
  },
  lastName: {
    type: GridFieldTypes.STRING,
    required: true,
    value: contactData.lastName,
  },
  email: { type: GridFieldTypes.STRING, required: true, value: contactData.email },
  phone: { type: GridFieldTypes.STRING, required: true, value: contactData.phone },
  documentType: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: documentTypeOptions,
    optionsValues: documentTypeOptionValues,
    value: contactData.documentType,
  },
  documentId: { type: GridFieldTypes.STRING, required: true, value: contactData.documentId },
})

export const getCompanyContactRelationColumnLabels = (t: TFunction): GridLabel[] => [
  { text: t('contacts:relatedCompany'), key: 'relatedCompany' },
  { text: t('contacts:companyRelationType'), key: 'companyRelationType' },
  { text: t('general:createdBy'), key: 'createdByUsername' },
  { text: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { text: t('general:dateCreated'), key: 'dateCreated' },
  { text: t('general:dateModified'), key: 'dateModified' },
  { text: t('general:edit'), key: 'edit' },
  { text: t('general:delete'), key: 'delete' },
]

export const getUpdateContactRelationDialogFormLabels = (t: TFunction): GridLabel[] => [
  { text: t('contacts:relatedCompany'), key: 'companyId' },
  { text: t('contacts:companyRelationType'), key: 'relationType' },
]

export const getUpdateContactRelationDialogFormGridData = (
  relationData: UpdateCompanyContactRelation,
  relationTypeOptions: string[],
  relationTypeOptionValues: string[],
  companiesMap: AutocompleteHashMap,
): PageElement => ({
  companyId: {
    required: true,
    type: GridFieldTypes.AUTOCOMPLETE,
    autocompleteMap: companiesMap,
    value: relationData.companyId,
  },
  relationType: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: relationTypeOptions,
    optionsValues: relationTypeOptionValues,
    value: relationData.relationType,
    dialogField: true,
  },
})

export const transformCompanyContactRelationIntoPageGridData = (
  t: TFunction,
  relation: CompanyContactRelation,
  handleRelationDelete: (id: number) => void,
  handleUpdateRelationDialogOpen: (id: number) => void,
): PageElement => ({
  relatedCompany: {
    value: relation.companyName,
    link: `/index/companies/${relation.companyId}`,
    type: GridFieldTypes.LINK,
  },
  companyRelationType: {
    value: t(`contacts:companyContactRelationType.${relation.relationType}`),
    type: GridFieldTypes.STRING,
  },
  createdByUsername: {
    value: relation.createdByUsername,
    link: `/index/users/${relation.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: relation.modifiedByUsername,
    link: `/index/users/${relation.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: { value: dateFormatter(relation.dateCreated as string), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormatter(relation.dateModified as string), type: GridFieldTypes.STRING },
  edit: { type: GridFieldTypes.BUTTON, handleClick: handleUpdateRelationDialogOpen, id: relation.id },
  delete: { type: GridFieldTypes.BUTTON, handleClick: handleRelationDelete, id: relation.id },
})

export const getContactSearchLabels = (t: TFunction): GridLabel[] => [
  { text: t('contacts:firstName'), key: 'firstName' },
  { text: t('contacts:lastName'), key: 'lastName' },
  { text: t('contacts:email'), key: 'email' },
  { text: t('contacts:phone'), key: 'phone' },
  { text: t('contacts:contactDocumentType'), key: 'documentType' },
  { text: t('contacts:documentId'), key: 'documentId' },
]

export const getContactSearchGridData = (
  contactSearchData: Partial<ContactSearchFormProps>,
  documentTypes: Record<ContactDocumentType, string>,
): PageElement => ({
  firstName: {
    type: GridFieldTypes.STRING,
    value: contactSearchData.firstName,
  },
  lastName: {
    type: GridFieldTypes.STRING,
    value: contactSearchData.lastName,
  },
  email: { type: GridFieldTypes.STRING, value: contactSearchData.email },
  phone: { type: GridFieldTypes.STRING, value: contactSearchData.phone },
  documentType: {
    type: GridFieldTypes.MULTISELECT,
    multiselectOptions: documentTypes,
    multiselectOptionValues: ContactDocumentType,
    multiselectValue: contactSearchData.documentType,
    dialogField: true,
  },
  documentId: { type: GridFieldTypes.STRING, value: contactSearchData.documentId },
})
