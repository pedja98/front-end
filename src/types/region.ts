export interface Region {
  id: number
  name: string
  createdById: number
  createdByUsername: string
  modifiedById: number
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
}

export interface SearchRegionDataFormProps {
  name?: string
  sortBy?: string
  sortOrder?: string
}
