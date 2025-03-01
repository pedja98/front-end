import { ReactNode } from 'react'
import { ModulesOptions } from '../types/common'
import UserSearchDialog from '../components/searchDialogs/UserSearchDialog'
import RegionSearchDialog from '../components/searchDialogs/RegionSearchDialog'
import CompanySearchDialog from '../components/searchDialogs/CompanySearchDialog'
import ShopSearchDialog from '../components/searchDialogs/ShopSearchDialog'
import ContactSearchDialog from '../components/searchDialogs/ContactSearchDialog'

export const getCurrentSearchDialog = (currentModule: ModulesOptions): ReactNode | undefined => {
  const dialogs: Partial<Record<ModulesOptions, ReactNode>> = {
    [ModulesOptions.Users]: <UserSearchDialog />,
    [ModulesOptions.Regions]: <RegionSearchDialog />,
    [ModulesOptions.Companies]: <CompanySearchDialog />,
    [ModulesOptions.Shops]: <ShopSearchDialog />,
    [ModulesOptions.Contacts]: <ContactSearchDialog />,
  }

  return dialogs[currentModule]
}
