import { ChangePasswordFormProps } from '../types/auth'
import { Language } from '../types/common'
import { User } from '../types/user'

export const Languages: Record<Language, Language> = {
  EN: 'EN',
  SR: 'SR',
}

export const SaveUserFormInitialState: Partial<User> = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  confirm: '',
  email: '',
  phone: '',
  type: undefined,
}

export const ChangePasswordFormInitialState: ChangePasswordFormProps = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}
