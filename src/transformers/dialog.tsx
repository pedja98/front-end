import { ReactNode } from 'react'
import { EntityConfirmationDialogOptions, ModuleOptions } from '../types/common'
import UserSearchDialog from '../components/SearchDialogs/UserSearchDialog'
import RegionSearchDialog from '../components/SearchDialogs/RegionSearchDialog'
import CompanySearchDialog from '../components/SearchDialogs/CompanySearchDialog'
import ShopSearchDialog from '../components/SearchDialogs/ShopSearchDialog'
import ContactSearchDialog from '../components/SearchDialogs/ContactSearchDialog'
import CustomerSessionSearchDialog from '../components/SearchDialogs/CustomerSessionSearchDialog'
import CompanyContactRelationCreateDialog from '../components/EntityDialogs/CompanyContactRelationCreateDialog'
import CompanyContactRelationUpdateDialog from '../components/EntityDialogs/CompanyContactRelationUpdateDialog'
import { CompanyContactRelationType } from '../types/contact'
import OpportunitySearchDialog from '../components/SearchDialogs/OpportunitySearchDialog'
import OfferSearchDialog from '../components/SearchDialogs/OfferSearchDialog'
import ContractSearchDialog from '../components/SearchDialogs/ContractSearchDialog'
import UploadContractDocument from '../components/EntityDialogs/UploadContractDocument'

export const getSearchDialog = (currentModule: ModuleOptions): ReactNode | undefined => {
  const dialogs: Partial<Record<ModuleOptions, ReactNode>> = {
    [ModuleOptions.Users]: <UserSearchDialog />,
    [ModuleOptions.Regions]: <RegionSearchDialog />,
    [ModuleOptions.Companies]: <CompanySearchDialog />,
    [ModuleOptions.Shops]: <ShopSearchDialog />,
    [ModuleOptions.Contacts]: <ContactSearchDialog />,
    [ModuleOptions.CustomerSessions]: <CustomerSessionSearchDialog />,
    [ModuleOptions.Opportunities]: <OpportunitySearchDialog />,
    [ModuleOptions.Offers]: <OfferSearchDialog />,
    [ModuleOptions.Contracts]: <ContractSearchDialog />,
  }

  return dialogs[currentModule]
}

export const getEntityConfirmationDialog = (
  confirmationComponentContext: EntityConfirmationDialogOptions,
  customConfirmComponentAttributes: Record<string, unknown>,
): ReactNode | undefined => {
  const dialogs: Partial<Record<string, ReactNode>> = {
    [EntityConfirmationDialogOptions.CompanyContactRelationCreateDialog]: (
      <CompanyContactRelationCreateDialog contactId={customConfirmComponentAttributes?.contactId as number} />
    ),
    [EntityConfirmationDialogOptions.CompanyContactRelationUpdateDialog]: (
      <CompanyContactRelationUpdateDialog
        relationId={customConfirmComponentAttributes?.relationId as number}
        relationType={customConfirmComponentAttributes?.relationType as CompanyContactRelationType}
        companyId={customConfirmComponentAttributes?.companyId as number}
      />
    ),
    [EntityConfirmationDialogOptions.UploadContractDocument]: (
      <UploadContractDocument contractId={customConfirmComponentAttributes?.contractId as number} />
    ),
  }

  return dialogs[confirmationComponentContext]
}
