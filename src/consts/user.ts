import { Language } from '../types/common'
import { UserState, UserType } from '../types/user'

export const InitialState: UserState = {}

export const UserTypes: Record<UserType, UserType> = {
  ADMIN: UserType.ADMIN,
  SALESMAN: UserType.SALESMAN,
  L1_MANAGER: UserType.L1_MANAGER,
  L2_MANAGER: UserType.L2_MANAGER,
  L3_MANAGER: UserType.L2_MANAGER,
}

export const Languages: Record<Language, Language> = {
  EN: 'EN',
  SR: 'SR',
}
