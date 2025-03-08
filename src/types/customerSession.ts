export interface SaveCustomerSession {
  name: string
  description: string
  status: CustomerSessionsStatus
  type: CustomerSessionType
  mode: CustomerSessionMode
  sessionStart: string
  sessionEnd: string
  companyId: number
  opportunityId: number
}

export interface CustomerSession {
  id: number
  name: string
  description: string
  status: CustomerSessionsStatus
  type: CustomerSessionType
  mode: CustomerSessionMode
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

export enum CustomerSessionsStatus {
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
