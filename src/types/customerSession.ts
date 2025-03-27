export interface SaveCustomerSession {
  name: string
  description: string
  status: CustomerSessionStatus
  type: CustomerSessionType
  mode: CustomerSessionMode
  outcome: CustomerSessionOutcome
  sessionStart: string
  sessionEnd: string
  company: number
  opportunity: number
}

export interface CustomerSession {
  id: number
  name: string
  description: string
  status: CustomerSessionStatus
  type: CustomerSessionType
  mode: CustomerSessionMode
  outcome: CustomerSessionOutcome
  sessionStart: string
  sessionEnd: string
  companyId: number
  companyName: string
  opportunityId: number
  opportunityName: string
  createdByUsername: string
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
}

export enum CustomerSessionStatus {
  PLANNED = 'PLANNED',
  HELD = 'HELD',
  NOT_HELD = 'NOT_HELD',
}

export enum CustomerSessionMode {
  CALL = 'CALL',
  MEETING = 'MEETING',
}

export enum CustomerSessionType {
  COLD_CALL = 'COLD_CALL',
  ACTION_CALL = 'ACTION_CALL',
  CUSTOMER_CARE = 'CUSTOMER_CARE',
  COMPLAINTS = 'COMPLAINTS',
  NEEDS_RECOGNITION = 'NEEDS_RECOGNITION',
  NEGOTIATION = 'NEGOTIATION',
  CONTRACT_SIGNING = 'CONTRACT_SIGNING',
  TENDER = 'TENDER',
}

export enum CustomerSessionOutcome {
  NEW_CALL = 'NEW_CALL',
  NEW_MEETING = 'NEW_MEETING',
  NEW_OFFER = 'NEW_OFFER',
  CLOSED = 'CLOSED',
}

export interface CustomerSessionSearchFormProps {
  name?: string
  status?: string[]
  type?: string[]
  mode?: string[]
  outcome?: string[]
  sortBy?: string
  sortOrder?: string
}
