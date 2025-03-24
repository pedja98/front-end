import { SaveCustomerSession } from '../types/customerSession'

export const SaveCustomerSessionFormInitialState: Partial<SaveCustomerSession> = {
  name: '',
  description: '',
  status: '',
  type: '',
  mode: '',
  outcome: '',
  sessionStart: '',
  sessionEnd: '',
  companyId: undefined,
  opportunityId: undefined,
}
