export interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  documentType: ContactDocumentType
  documentId: string
  createdByUsername: string
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
}

export interface SaveContact {
  firstName: string
  lastName: string
  email: string
  phone: string
  documentType: ContactDocumentType
  documentId: string
}

export enum ContactDocumentType {
  IDENTITY_CARD = 'IDENTITY_CARD',
  PASSPORT = 'PASSPORT',
}

export interface ContactSearchFormProps {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  documentType?: string[]
  documentId?: string
  sortBy?: string
  sortOrder?: string
}
