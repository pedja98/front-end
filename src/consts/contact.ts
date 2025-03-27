import { CompanyContactRelationType, ContactDocumentType } from '../types/contact'

export const ContactDocumentTypes: Record<ContactDocumentType, ContactDocumentType> = {
  IDENTITY_CARD: ContactDocumentType.IDENTITY_CARD,
  PASSPORT: ContactDocumentType.PASSPORT,
}

export const CompanyContactRelationTypes: Record<CompanyContactRelationType, CompanyContactRelationType> = {
  THIRD_PARTY_PERSON: CompanyContactRelationType.THIRD_PARTY_PERSON,
  TECHNICAL_CONTACT: CompanyContactRelationType.TECHNICAL_CONTACT,
  RESPONSIBLE_PERSON: CompanyContactRelationType.RESPONSIBLE_PERSON,
  CONTACT_PERSON: CompanyContactRelationType.CONTACT_PERSON,
  RESPONSIBLE_APR_PERSON: CompanyContactRelationType.RESPONSIBLE_APR_PERSON,
}

export const SaveContactFormInitialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  documentType: undefined,
  documentId: '',
}

export const InitialState: Record<string, unknown> = {}
