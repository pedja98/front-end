export enum OpportunityType {
  ACQUISITION = 'ACQUISITION',
  RENEWAL = 'RENEWAL',
  CHANGE = 'CHANGE',
  TERMINATION = 'TERMINATION',
}

export interface Opportunity {
  id?: number
  name?: string
  type?: OpportunityType
  companyId?: number
  companyName?: string
  createdByUsername?: string
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
}
