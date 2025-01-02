import { Languages } from '../consts/user'
import { dateFormater } from '../helpers/common'
import { ViewElement } from '../types/common'
import { User, UserType } from '../types/user'

export const transformUserDataForView = (user: User, skipUsernameAsLink?: boolean): ViewElement => ({
  username: skipUsernameAsLink
    ? user.username || null
    : user.username
      ? { value: user.username, link: `/index/user-managment/user/${user.username}` }
      : null,
  firstName: user.firstName || null,
  lastName: user.lastName || null,
  email: user.email || null,
  phone: user.phone || null,
  type: user.type || null,
  shopName: user.shopName ? { value: user.shopName, link: `/index/shop/${user.shopId}` } : null,
  createdByUsername: user.createdByUsername
    ? { value: user.createdByUsername, link: `/index/user-managment/user/${user.createdByUsername}` }
    : null,
  modifiedByUsername: user.modifiedByUsername
    ? { value: user.modifiedByUsername, link: `/index/user-managment/user/${user.modifiedByUsername}` }
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
    currentValue: user.type,
    options: Object.keys(UserType),
  },
  language: {
    currentValue: user.language,
    options: Object.keys(Languages),
  },
})
