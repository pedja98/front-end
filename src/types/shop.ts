export interface Shop {
  id: number
  name: string
  address: string
  shopLeaderId?: number
  shopLeaderUsername?: string
  regionId?: number
  regionName?: string
  createdById?: number
  createdByUsername?: string
  modifiedById?: number
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
