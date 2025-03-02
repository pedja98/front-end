import { TFunction } from 'i18next'
import { GridFieldTypes } from '../consts/common'
import { dateFormater } from '../helpers/common'
import { PageElement, GridLabel } from '../types/common'
import { User } from '../types/user'

export const transformUserIntoPageGridData = (t: TFunction, user: User, skipUsernameAsLink?: boolean): PageElement => ({
  username: {
    value: user.username,
    link: `/index/users/${user.username}`,
    type: skipUsernameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  firstName: { value: user.firstName, type: GridFieldTypes.STRING },
  lastName: { value: user.lastName, type: GridFieldTypes.STRING },
  email: { value: user.email, type: GridFieldTypes.STRING },
  phone: { value: user.phone, type: GridFieldTypes.STRING },
  type: { value: t(`users:userTypes.${user.type.toLocaleLowerCase()}`), type: GridFieldTypes.STRING },
  shopName: { value: user.shopName, link: `/index/shop/${user.shopId}`, type: GridFieldTypes.LINK },
  createdByUsername: {
    value: user.createdByUsername,
    link: `/index/users/${user.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: user.modifiedByUsername,
    link: `/index/users/${user.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: { value: dateFormater(user.dateCreated), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormater(user.dateModified), type: GridFieldTypes.STRING },
})

export const transformUserIntoEditPageGridData = (
  userTypeOptions: string[],
  userTypeOptionValues: string[],
  languageOptions: string[],
  languageOptionValues: string[],
): PageElement => ({
  firstName: { type: GridFieldTypes.STRING, required: true },
  lastName: { type: GridFieldTypes.STRING, required: true },
  username: { type: GridFieldTypes.STRING, required: true },
  email: { type: GridFieldTypes.STRING, required: true },
  phone: { type: GridFieldTypes.STRING, required: true },
  password: { type: GridFieldTypes.PASSWORD, required: true },
  confirm: { type: GridFieldTypes.PASSWORD, required: true },
  type: {
    options: userTypeOptions,
    type: GridFieldTypes.SELECT,
    optionsValues: userTypeOptionValues,
    required: true,
  },
  language: {
    options: languageOptions,
    type: GridFieldTypes.SELECT,
    optionsValues: languageOptionValues,
    required: true,
  },
})

export const getUseDetailListPagesLabels = (t: TFunction): GridLabel[] => [
  { label: t('users:username'), key: 'username' },
  { label: t('users:firstName'), key: 'firstName' },
  { label: t('users:lastName'), key: 'lastName' },
  { label: t('users:email'), key: 'email' },
  { label: t('users:phone'), key: 'phone' },
  { label: t('users:type'), key: 'type' },
  { label: t('shops:shopLabel'), key: 'shopName' },
  { label: t('general:createdBy'), key: 'createdByUsername' },
  { label: t('general:modifiedBy'), key: 'modifiedByUsername' },
  { label: t('general:dateCreated'), key: 'dateCreated' },
  { label: t('general:dateModified'), key: 'dateModified' },
]

export const getCreateUserPagesLabels = (t: TFunction): GridLabel[] => [
  { label: t('users:firstName'), key: 'firstName' },
  { label: t('users:lastName'), key: 'lastName' },
  { label: t('users:username'), key: 'username' },
  { label: t('users:password'), key: 'password' },
  { label: t('users:confirm'), key: 'confirm' },
  { label: t('users:email'), key: 'email' },
  { label: t('users:phone'), key: 'phone' },
  { label: t('users:type'), key: 'type' },
]

export const getEditUserPagesLabels = (t: TFunction, removeType: boolean): GridLabel[] => {
  const labels = [
    { label: t('users:firstName'), key: 'firstName' },
    { label: t('users:lastName'), key: 'lastName' },
    { label: t('users:email'), key: 'email' },
    { label: t('users:phone'), key: 'phone' },
    { label: t('users:type'), key: 'type' },
    { label: t('users:language'), key: 'language' },
  ]
  if (removeType) {
    labels.splice(4, 1)
  }
  return labels
}

export const getUserChangePasswordLabels = (t: TFunction): GridLabel[] => [
  { label: t('users:currentPassword'), key: 'currentPassword' },
  { label: t('users:newPassword'), key: 'newPassword' },
  { label: t('users:confirmNewPassword'), key: 'confirmNewPassword' },
]

export const getUserChangePasswordGridData = (): PageElement => ({
  currentPassword: { type: GridFieldTypes.PASSWORD, required: true },
  newPassword: { type: GridFieldTypes.PASSWORD, required: true },
  confirmNewPassword: { type: GridFieldTypes.PASSWORD, required: true },
})
