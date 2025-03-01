import { ContactDocumentType } from '../types/contact'

export const ContactDocumentTypes: Record<ContactDocumentType, ContactDocumentType> = {
  IDENTITY_CARD: ContactDocumentType.IDENTITY_CARD,
  PASSPORT: ContactDocumentType.PASSPORT,
}

export const SaveContactFormInitialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  documentType: undefined,
  documentId: '',
}
