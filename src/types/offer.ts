import { OpportunityType } from './opportunity'
import { UserType } from './user'

export interface Offer {
  id: number
  name: string
  companyId: number
  companyName: string
  opportunityId: number
  opportunityName: string
  contractId: number
  contractName: string
  status: OfferStatus
  createdByUsername: string
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
}

export interface CreateOffer {
  name: string
  companyId: number
  opportunityId: number
  opportunityType: OpportunityType
}

export enum OfferStatus {
  DRAFT = 'DRAFT',
  L1_PENDING = 'L1_PENDING',
  L2_PENDING = 'L2_PENDING',
  SALESMEN_CLOSED = 'SALESMEN_CLOSED',
  CLOSED_BY_SYSTEM = 'CLOSED_BY_SYSTEM',
  L1_REJECTED = 'L1_REJECTED',
  L2_REJECTED = 'L2_REJECTED',
  OFFER_APPROVED = 'OFFER_APPROVED',
  CUSTOMER_ACCEPTED = 'CUSTOMER_ACCEPTED',
  CONCLUDED = 'CONCLUDED',
}

export interface OfferSearchFormProps {
  name: string
  status?: string[]
  sortBy?: string
  sortOrder?: string
}

export interface OfferEditProps {
  crmOfferId: number
  language?: string
  username?: string
  type?: UserType
}
