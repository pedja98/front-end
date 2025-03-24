import { SaveCustomerSession } from '../types/customerSession'

export const SaveCustomerSessionFormInitialState: Partial<SaveCustomerSession> = {
  name: undefined,
  description: '',
  status: '',
  type: '',
  mode: '',
  outcome: '',
  sessionStart: '',
  sessionEnd: '',
  company: undefined,
  opportunity: undefined,
}
