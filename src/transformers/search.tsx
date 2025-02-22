import { ReactNode } from 'react'
import { ModulesOptions } from '../types/common'
import UserSearchDialog from '../components/searchDialogs/UserSearchDialog'
import RegionSearchDialog from '../components/searchDialogs/RegionSearchDialog'
import CompanySearchDialog from '../components/searchDialogs/CompanySearchDialog'
import ShopSearchDialog from '../components/searchDialogs/ShopSearchDialog'

export const getCurrentSearchDialog = (currentModule: ModulesOptions): ReactNode | undefined => {
  switch (currentModule) {
    case ModulesOptions.Users:
      return <UserSearchDialog />
    case ModulesOptions.Regions:
      return <RegionSearchDialog />
    case ModulesOptions.Companies:
      return <CompanySearchDialog />
    case ModulesOptions.Shops:
      return <ShopSearchDialog />
    default:
      return undefined
  }
}
