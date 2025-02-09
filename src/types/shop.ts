export interface Shop {
  id: number
  name: string
  address: string
  shopLeaderId?: number
  shopLeaderUsername?: string
  createdById?: number
  createdByUsername?: string
  modifiedById?: number
  modifiedByUsername?: string
  dateCreated?: string
  dateModified?: string
}
