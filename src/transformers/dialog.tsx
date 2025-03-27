import { ReactNode } from 'react'
import { ModulesOptions } from '../types/common'
import UserSearchDialog from '../components/searchDialogs/UserSearchDialog'
import RegionSearchDialog from '../components/searchDialogs/RegionSearchDialog'
import CompanySearchDialog from '../components/searchDialogs/CompanySearchDialog'
import ShopSearchDialog from '../components/searchDialogs/ShopSearchDialog'
import ContactSearchDialog from '../components/searchDialogs/ContactSearchDialog'
import CustomerSessionSearchDialog from '../components/searchDialogs/CustomerSessionSearchDialog'
import CompanyContactRelationEntityDialog from '../components/entityDialogs/CompanyContactRelationEntityDialog'

export const getSearchDialog = (currentModule: ModulesOptions): ReactNode | undefined => {
  const dialogs: Partial<Record<ModulesOptions, ReactNode>> = {
    [ModulesOptions.Users]: <UserSearchDialog />,
    [ModulesOptions.Regions]: <RegionSearchDialog />,
    [ModulesOptions.Companies]: <CompanySearchDialog />,
    [ModulesOptions.Shops]: <ShopSearchDialog />,
    [ModulesOptions.Contacts]: <ContactSearchDialog />,
    [ModulesOptions.CustomerSessions]: <CustomerSessionSearchDialog />,
  }

  return dialogs[currentModule]
}

export const getEntityDialog = (currentModule: ModulesOptions): ReactNode | undefined => {
  const dialogs: Partial<Record<ModulesOptions, ReactNode>> = {
    [ModulesOptions.Contacts]: <CompanyContactRelationEntityDialog />,
  }

  return dialogs[currentModule]
}
