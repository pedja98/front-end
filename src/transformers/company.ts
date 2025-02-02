import { EmptyValue, GridFieldTypes } from '../consts/common'
import { dateFormater } from '../helpers/common'
import { PageElement } from '../types/common'
import { Company } from '../types/company'

export const getCreateCompanyGridData = (
  assignedToIds: (number | undefined)[],
  assignedToUsernames: (string | undefined)[],
): PageElement => ({
  name: { type: GridFieldTypes.STRING, required: true },
  hqAddress: { type: GridFieldTypes.STRING, required: true },
  industry: { type: GridFieldTypes.STRING, required: true },
  contactPhone: { type: GridFieldTypes.STRING, required: true },
  tin: { type: GridFieldTypes.NUMBER, required: true },
  numberOfEmployees: { type: GridFieldTypes.NUMBER, required: false },
  bankName: { type: GridFieldTypes.STRING, required: false },
  bankAccountNumber: { type: GridFieldTypes.STRING, required: false },
  assignedTo: {
    type: GridFieldTypes.SELECT,
    required: true,
    options: assignedToUsernames,
    optionsValues: assignedToIds,
  },
  temporaryAssignedTo: {
    type: GridFieldTypes.SELECT,
    required: true,
    options: assignedToUsernames,
    optionsValues: assignedToIds,
  },
  comment: { type: GridFieldTypes.AREA, required: false },
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
  bankName: { type: GridFieldTypes.STRING, value: company.bankName },
  bankAccountNumber: { type: GridFieldTypes.STRING, value: company.bankAccountNumber },
  comment: { type: GridFieldTypes.AREA, value: company.comment },
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
