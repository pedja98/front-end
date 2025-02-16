export interface Shop {
  id: number
  name: string
  address: string
  shopLeaderId?: number
  shopLeaderUsername?: string
  regionId?: number
  regionName?: string
  createdByUsername?: string
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
}

export interface SaveShop {
  name?: string
  address?: string
  shopLeader?: number
  region?: number
}

export interface ShopSearchFormProps {
  name?: string
  region?: string[]
  shopLeader?: string[]
  sortBy?: string
  sortOrder?: string
}
