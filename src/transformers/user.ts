import { GridFieldTypes } from '../consts/common'
import { Languages } from '../consts/user'
import { dateFormater } from '../helpers/common'
import { ViewElement } from '../types/common'
import { User, UserType } from '../types/user'

export const transformUserIntoViewGridData = (user: User, skipUsernameAsLink?: boolean): ViewElement => ({
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

export const transformUserIntoEditViewGridData = (user: User): ViewElement => ({
  firstName: { value: user.firstName, type: GridFieldTypes.STRING },
  lastName: { value: user.lastName, type: GridFieldTypes.STRING },
  email: { value: user.email, type: GridFieldTypes.STRING },
  phone: { value: user.phone, type: GridFieldTypes.STRING },
  type: {
    options: Object.keys(UserType),
    type: GridFieldTypes.SELECT,
  },
  language: {
    options: Object.keys(Languages),
    type: GridFieldTypes.SELECT,
  },
})

export const getCreateUserGridData = (): ViewElement => ({
  firstName: { type: GridFieldTypes.STRING },
  lastName: { type: GridFieldTypes.STRING },
  username: { type: GridFieldTypes.STRING },
  email: { type: GridFieldTypes.STRING },
  password: { type: GridFieldTypes.PASSWORD },
  confirm: { type: GridFieldTypes.PASSWORD },
  phone: { type: GridFieldTypes.STRING },
  type: {
    options: Object.keys(UserType),
    type: GridFieldTypes.SELECT,
  },
})
