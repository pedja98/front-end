import { GridFieldTypes } from '../consts/common'
import { PageElement } from '../types/common'

export const getCreateCompanyGridData = (): PageElement => ({
  name: { type: GridFieldTypes.STRING, required: true },
  hqAddress: { type: GridFieldTypes.STRING, required: true },
  industry: { type: GridFieldTypes.STRING, required: true },
  contactPhone: { type: GridFieldTypes.STRING, required: true },
  numberOfEmployees: { type: GridFieldTypes.NUMBER, required: true },
  tin: { type: GridFieldTypes.NUMBER, required: true },
  bankName: { type: GridFieldTypes.STRING, required: false },
  bankAccountNumber: { type: GridFieldTypes.STRING, required: false },
  comment: { type: GridFieldTypes.STRING, required: false },
})
