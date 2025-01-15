import { GridFieldTypes } from '../consts/common'
import { PageElement } from '../types/common'

export const getCreateCompanyGridData = (): PageElement => ({
  name: { type: GridFieldTypes.STRING },
  hqAddress: { type: GridFieldTypes.STRING },
  industry: { type: GridFieldTypes.STRING },
  contactPhone: { type: GridFieldTypes.STRING },
  numberOfEmployees: { type: GridFieldTypes.NUMBER },
  tin: { type: GridFieldTypes.NUMBER },
  bankName: { type: GridFieldTypes.STRING },
  bankAccountNumber: { type: GridFieldTypes.STRING },
  comment: { type: GridFieldTypes.STRING },
})
