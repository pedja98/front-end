import { EmptyValue, GridFieldTypes } from '../consts/common'
import { dateFormater } from '../helpers/common'
import { PageElement } from '../types/common'
import { Company } from '../types/company'

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

export const transformCompanyIntoEditPageGridData = (company: Company, skipNameAsLink?: boolean): PageElement => ({
  name: {
    value: company.name,
    link: `/index/companies/${company.id}`,
    type: skipNameAsLink ? GridFieldTypes.STRING : GridFieldTypes.LINK,
  },
  hqAddress: { type: GridFieldTypes.STRING, value: company.hqAddress },
  contactPhone: { type: GridFieldTypes.STRING, value: company.contactPhone },
  tin: { type: GridFieldTypes.STRING, value: company.tin },
  createdByUsername: {
    value: company.createdByUsername,
    link: `/index/user-management/user/${company.createdByUsername}`,
    type: GridFieldTypes.LINK,
  },
  modifiedByUsername: {
    value: company.modifiedByUsername,
    link: `/index/user-management/user/${company.modifiedByUsername}`,
    type: GridFieldTypes.LINK,
  },
  dateCreated: {
    value: company.dateCreated ? dateFormater(String(company.dateCreated)) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
  dateModified: {
    value: company.dateModified ? dateFormater(String(company.dateModified)) : EmptyValue,
    type: GridFieldTypes.STRING,
  },
})
