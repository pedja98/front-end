import { CommonState } from '../types/common'

export const PrimaryThemeColor = '#6e6e6e'

export const SecondaryThemeColor = '#454444'

export const TernaryColor = '#000'

export const WhiteTeamColor = '#FFF'

export const QuaternaryColor = '#d6cece'

export const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PhonePattern = /^\+?\d+$/

export const PasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const EmptyValue = '/'

export const GridFieldTypes = {
  STRING: 'string',
  NUMBER: 'number',
  SELECT: 'select',
  LINK: 'link',
  PASSWORD: 'password',
  MULTISELECT: 'multiselect',
  AREA: 'area',
} as const

export const InitialState: CommonState = {}

export const CrmApiTags = {
  USER: 'User',
  REGION: 'Region',
  COMPANY: 'Company',
  SHOP: 'Shop',
  CONTACT: 'Contact',
}

export const TabelRowPerPage = 20
