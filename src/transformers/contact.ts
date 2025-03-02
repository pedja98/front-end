import { TFunction } from 'i18next'
import { GridLabel, PageElement } from '../types/common'
import { Contact } from '../types/contact'
import { GridFieldTypes } from '../consts/common'
import { dateFormater } from '../helpers/common'

export const getContactDetailListLabels = (t: TFunction): GridLabel[] => [
  { label: t('contacts:fullName'), key: 'fullName' },
  { label: t('contacts:email'), key: 'email' },
  { label: t('contacts:phone'), key: 'phone' },
  { label: t('contacts:documentType'), key: 'documentType' },
  { label: t('contacts:documentId'), key: 'documentId' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]

export const getContactSaveLabels = (t: TFunction): GridLabel[] => [
  { label: t('contacts:firstName'), key: 'firstName' },
  { label: t('contacts:lastName'), key: 'lastName' },
  { label: t('contacts:email'), key: 'email' },
  { label: t('contacts:phone'), key: 'phone' },
  { label: t('contacts:documentType'), key: 'documentType' },
  { label: t('contacts:documentId'), key: 'documentId' },
]

export const transformContactIntoPageGridData = (contact: Contact, skipFullNameAsLink?: boolean): PageElement => ({
  fullName: {
    value: contact.firstName + ' ' + contact.lastName,
    link: `/index/contacts/${contact.id}`,
    type: skipFullNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  email: { value: contact.email, type: GridFieldTypes.STRING },
  phone: { value: contact.phone, type: GridFieldTypes.STRING },
  documentType: { value: contact.documentType, type: GridFieldTypes.STRING },
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
  dateCreated: { value: dateFormater(contact.dateCreated as string), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormater(contact.dateModified as string), type: GridFieldTypes.STRING },
})

export const getSaveContactGridData = (
  documentTypeOptions: string[],
  documentTypeOptionValues: string[],
): PageElement => ({
  firstName: {
    type: GridFieldTypes.STRING,
    required: true,
  },
  lastName: {
    type: GridFieldTypes.STRING,
    required: true,
  },
  email: { type: GridFieldTypes.STRING, required: true },
  phone: { type: GridFieldTypes.STRING, required: true },
  documentType: {
    required: true,
    type: GridFieldTypes.SELECT,
    options: documentTypeOptions,
    optionsValues: documentTypeOptionValues,
  },
  documentId: { type: GridFieldTypes.STRING, required: true },
})
