import { SaveCompanyDto } from '../types/company'

export const SaveCompanyFormInitialState: Partial<SaveCompanyDto> = {
  name: '',
  hqAddress: '',
  industry: '',
  contactPhone: '',
  numberOfEmployees: undefined,
  tin: undefined,
  bankName: '',
  bankAccountNumber: '',
  comment: '',
  assignedTo: undefined,
  temporaryAssignedTo: undefined,
}
