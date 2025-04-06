import { SaveCompany } from '../types/company'

export const SaveCompanyFormInitialState: Partial<SaveCompany> = {
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
