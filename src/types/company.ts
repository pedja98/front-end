export interface Company {
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
  createdById?: number
  createdByUsername?: string
  modifiedById?: number
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
}

export interface SearchCompanyDataFormProps {
  name?: string
  hqAddress?: string
  tin?: number
  sortBy?: string
  sortOrder?: string
  contactPhone?: string
}
