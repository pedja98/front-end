import {
  CustomerSessionMode,
  CustomerSessionOutcome,
  CustomerSessionStatus,
  CustomerSessionType,
  SaveCustomerSession,
} from '../types/customerSession'

export const SaveCustomerSessionFormInitialState: Partial<SaveCustomerSession> = {
  description: '',
  status: undefined,
  type: undefined,
  mode: undefined,
  outcome: undefined,
  sessionStart: '',
  sessionEnd: '',
  company: undefined,
  opportunityType: undefined,
}

export const CustomerSessionStatuses: Record<CustomerSessionStatus, CustomerSessionStatus> = {
  PLANNED: CustomerSessionStatus.PLANNED,
  HELD: CustomerSessionStatus.HELD,
  NOT_HELD: CustomerSessionStatus.NOT_HELD,
}

export const CustomerSessionModes: Record<CustomerSessionMode, CustomerSessionMode> = {
  CALL: CustomerSessionMode.CALL,
  MEETING: CustomerSessionMode.MEETING,
}

export const CustomerSessionTypes: Record<CustomerSessionType, CustomerSessionType> = {
  COLD_CALL: CustomerSessionType.COLD_CALL,
  ACTION_CALL: CustomerSessionType.ACTION_CALL,
  CUSTOMER_CARE: CustomerSessionType.CUSTOMER_CARE,
  COMPLAINTS: CustomerSessionType.COMPLAINTS,
  NEEDS_RECOGNITION: CustomerSessionType.NEEDS_RECOGNITION,
  NEGOTIATION: CustomerSessionType.NEGOTIATION,
  CONTRACT_SIGNING: CustomerSessionType.CONTRACT_SIGNING,
  TENDER: CustomerSessionType.TENDER,
}

export const CustomerSessionOutcomes: Record<CustomerSessionOutcome, CustomerSessionOutcome> = {
  NEW_CALL: CustomerSessionOutcome.NEW_CALL,
  NEW_MEETING: CustomerSessionOutcome.NEW_MEETING,
  NEW_OFFER: CustomerSessionOutcome.NEW_OFFER,
  CLOSED: CustomerSessionOutcome.CLOSED,
}
