import { GridFieldTypes } from '../consts/common'
import { Languages } from '../consts/user'
import { dateFormater } from '../helpers/common'
import { PageElement } from '../types/common'
import { User, UserType } from '../types/user'

export const transformUserIntoPageGridData = (user: User, skipUsernameAsLink?: boolean): PageElement => ({
  username: {
    value: user.username,
    link: `/index/user-management/user/${user.username}`,
    type: skipUsernameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  firstName: { value: user.firstName, type: GridFieldTypes.STRING },
  lastName: { value: user.lastName, type: GridFieldTypes.STRING },
  email: { value: user.email, type: GridFieldTypes.STRING },
  phone: { value: user.phone, type: GridFieldTypes.STRING },
  type: { value: user.type, type: GridFieldTypes.STRING },
  shopName: { value: user.shopName, link: `/index/shop/${user.shopId}`, type: GridFieldTypes.LINK },
  createdByUsername: {
    value: user.createdByUsername,
    link: `/index/user-management/user/${user.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: user.modifiedByUsername,
    link: `/index/user-management/user/${user.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: { value: dateFormater(user.dateCreated), type: GridFieldTypes.STRING },
  dateModified: { value: dateFormater(user.dateModified), type: GridFieldTypes.STRING },
})

export const transformUserIntoEditPageGridData = (user: User): PageElement => ({
  firstName: { value: user.firstName, type: GridFieldTypes.STRING, required: true },
  lastName: { value: user.lastName, type: GridFieldTypes.STRING, required: true },
  email: { value: user.email, type: GridFieldTypes.STRING, required: true },
  phone: { value: user.phone, type: GridFieldTypes.STRING, required: true },
  type: {
    options: Object.keys(UserType),
    type: GridFieldTypes.SELECT,
    required: true,
  },
  language: {
    options: Object.keys(Languages),
    type: GridFieldTypes.SELECT,
    required: true,
  },
})

export const getCreateUserGridData = (): PageElement => ({
  firstName: { type: GridFieldTypes.STRING, required: true },
  lastName: { type: GridFieldTypes.STRING, required: true },
  username: { type: GridFieldTypes.STRING, required: true },
  email: { type: GridFieldTypes.STRING, required: true },
  password: { type: GridFieldTypes.PASSWORD, required: true },
  confirm: { type: GridFieldTypes.PASSWORD, required: true },
  phone: { type: GridFieldTypes.STRING, required: true },
  type: {
    options: Object.keys(UserType),
    type: GridFieldTypes.SELECT,
    required: true,
  },
})
