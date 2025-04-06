import { SaveCustomerSession } from '../types/customerSession'

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
