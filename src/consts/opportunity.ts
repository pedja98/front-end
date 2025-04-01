import { OpportunityStatus, OpportunityType } from '../types/opportunity'

export const OpportunityTypes: Record<OpportunityType, OpportunityType> = {
  ACQUISITION: OpportunityType.ACQUISITION,
  RENEWAL: OpportunityType.RENEWAL,
  CHANGE: OpportunityType.CHANGE,
  TERMINATION: OpportunityType.TERMINATION,
}

export const OpportunityStatuses: Record<OpportunityStatus, OpportunityStatus> = {
  CREATED: OpportunityStatus.CREATED,
  NEGOTIATIONS: OpportunityStatus.NEGOTIATIONS,
  CLOSE_LOST: OpportunityStatus.CLOSE_LOST,
  CLOSE_WON: OpportunityStatus.CLOSE_WON,
}
