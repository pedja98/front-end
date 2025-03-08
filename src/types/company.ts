export interface Company {
  id?: number
  name?: string
  hqAddress?: string
  industry?: string
  status?: CompanyStatus
  contactPhone?: string
  numberOfEmployees?: number
  tin?: number
  bankName?: string
  bankAccountNumber?: string
  comment?: string
  assignedToId?: number
  assignedToUsername?: string
  temporaryAssignedToId?: number
  temporaryAssignedToUsername?: string
  createdByUsername?: string
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
}

export interface SaveCompanyDto {
  id?: number
  name?: string
  hqAddress?: string
  industry?: string
  contactPhone?: string
  numberOfEmployees?: number
  tin?: number
  bankName?: string
  bankAccountNumber?: string
  comment?: string
  assignedTo?: number
  temporaryAssignedTo?: number
}

export interface SearchCompanyDataFormProps {
  name?: string
  hqAddress?: string
  tin?: number
  status?: string[]
  sortBy?: string
  sortOrder?: string
  contactPhone?: string
}

export enum CompanyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  POTENTIAL = 'POTENTIAL',
}
