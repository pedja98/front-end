import { SaveCustomerSessionFormInitialState } from '../consts/customerSession'
import { CustomerSession } from '../types/customerSession'

export const transformFetchedCustomerSessionData = (fetchedCustomerSessionData?: CustomerSession) =>
  fetchedCustomerSessionData
    ? {
        name: fetchedCustomerSessionData.name,
        description: fetchedCustomerSessionData.description,
        status: fetchedCustomerSessionData.status,
        type: fetchedCustomerSessionData.type,
        mode: fetchedCustomerSessionData.mode,
        outcome: fetchedCustomerSessionData.outcome,
        sessionStart: fetchedCustomerSessionData.sessionStart,
        sessionEnd: fetchedCustomerSessionData.sessionEnd,
        company: fetchedCustomerSessionData.companyId,
      }
    : SaveCustomerSessionFormInitialState
