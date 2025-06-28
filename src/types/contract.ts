export enum ContractStatus {
  CREATED = 'CREATED',
  FINALIZED = 'FINALIZED',
  CONTRACT_SIGNED = 'CONTRACT_SIGNED',
  SALESMAN_CLOSED = 'SALESMAN_CLOSED',
  CLOSED_BY_SYSTEM = 'CLOSED_BY_SYSTEM',
  CONTRACT_SIGNED_AND_VERIFIED = 'CONTRACT_SIGNED_AND_VERIFIED',
  CONTRACT_SIGNED_AND_REJECTED = 'CONTRACT_SIGNED_AND_REJECTED',
}

export interface Contract {
  id: number
  name: string
  referenceNumber: string
  contractObligation: number
  status: ContractStatus
  companyId: number
  companyName: string
  opportunityId: number
  opportunityName: string
  offerId: number
  offerName: string
  createdByUsername?: string
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
}

export interface CreateContract {
  contractObligation: number
  offerId: number
}

export interface ContractSearchFormProps {
  name: string
  status?: string[]
  referenceNumber: string
  sortBy?: string
  sortOrder?: string
}
