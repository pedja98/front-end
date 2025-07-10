import { OpportunityType } from './opportunity'

export enum ContractStatus {
  CREATED = 'CREATED',
  CONTRACT_SIGNED = 'CONTRACT_SIGNED',
  SALESMAN_CLOSED = 'SALESMAN_CLOSED',
  CLOSED_BY_SYSTEM = 'CLOSED_BY_SYSTEM',
  CONTRACT_SIGNED_AND_VERIFIED = 'CONTRACT_SIGNED_AND_VERIFIED',
}

export interface Contract {
  id: number
  name: string
  opportunityType: OpportunityType
  referenceNumber: string
  dateSigned: string | null
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

export interface ContractReport {
  contractId: number
  contractName: string
  referenceNumber: string
  dateSigned: string | null
  contractStatus: ContractStatus
  companyId: number
  companyName: string
  opportunityId: number
  opportunityName: string
  opportunityType: OpportunityType
}
