export interface Region {
  id: number
  name: string
  createdByUsername: string
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
}

export interface SearchRegionDataFormProps {
  name?: string
  sortBy?: string
  sortOrder?: string
}
