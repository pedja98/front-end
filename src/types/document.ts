export interface DocumentUploadDto {
  fileName: string
  contentType: string
  fileContent: string
  contractId: string
}

export interface Document {
  id: number
  documentName: string
  createdByUsername: string
  modifiedByUsername: string
  dateCreated: string
  dateModified: string
}
