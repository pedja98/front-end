import { GridFieldTypes } from '../consts/common'
import { Languages } from '../consts/user'
import { dateFormater } from '../helpers/common'
import { ViewElement } from '../types/common'
import { User, UserType } from '../types/user'

export const transformUserDataForView = (user: User, skipUsernameAsLink?: boolean): ViewElement => ({
  username: skipUsernameAsLink
    ? user.username || null
    : user.username
      ? { text: user.username, link: `/index/user-managment/user/${user.username}`, type: GridFieldTypes.LINK }
      : null,
  firstName: user.firstName || null,
  lastName: user.lastName || null,
  email: user.email || null,
  phone: user.phone || null,
  type: user.type || null,
  shopName: user.shopName
    ? { text: user.shopName, link: `/index/shop/${user.shopId}`, type: GridFieldTypes.LINK }
    : null,
  createdByUsername: user.createdByUsername
    ? {
        text: user.createdByUsername,
        link: `/index/user-managment/user/${user.createdByUsername}`,
        type: GridFieldTypes.LINK,
      }
    : null,
  modifiedByUsername: user.modifiedByUsername
    ? {
        text: user.modifiedByUsername,
        link: `/index/user-managment/user/${user.modifiedByUsername}`,
        type: GridFieldTypes.LINK,
      }
    : null,
  dateCreated: dateFormater(user.dateCreated) || null,
  dateModified: dateFormater(user.dateModified) || null,
})

export const transformUserDataForEditView = (user: User): ViewElement => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  phone: user.phone,
  type: {
    options: Object.keys(UserType),
    type: GridFieldTypes.SELECT,
  },
  language: {
    options: Object.keys(Languages),
    type: GridFieldTypes.SELECT,
  },
})
