import { ReactNode } from 'react'
import { EntityConfirmationDialogOptions, ModuleOptions } from '../types/common'
import UserSearchDialog from '../components/searchDialogs/UserSearchDialog'
import RegionSearchDialog from '../components/searchDialogs/RegionSearchDialog'
import CompanySearchDialog from '../components/searchDialogs/CompanySearchDialog'
import ShopSearchDialog from '../components/searchDialogs/ShopSearchDialog'
import ContactSearchDialog from '../components/searchDialogs/ContactSearchDialog'
import CustomerSessionSearchDialog from '../components/searchDialogs/CustomerSessionSearchDialog'
import CompanyContactRelationCreateDialog from '../components/entityDialogs/CompanyContactRelationCreateDialog'

export const getSearchDialog = (currentModule: ModuleOptions): ReactNode | undefined => {
  const dialogs: Partial<Record<ModuleOptions, ReactNode>> = {
    [ModuleOptions.Users]: <UserSearchDialog />,
    [ModuleOptions.Regions]: <RegionSearchDialog />,
    [ModuleOptions.Companies]: <CompanySearchDialog />,
    [ModuleOptions.Shops]: <ShopSearchDialog />,
    [ModuleOptions.Contacts]: <ContactSearchDialog />,
    [ModuleOptions.CustomerSessions]: <CustomerSessionSearchDialog />,
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
  }

  return dialogs[confirmationComponentContext]
}
