declare module 'catalogue/CatalogueApp' {
  const CatalogueApp: React.ComponentType
  export default CatalogueApp
}

declare module 'offerEdit/OfferEditApp' {
  import { ComponentType } from 'react'
  import { OfferEditProps } from './types/offer'

  const OfferEditApp: ComponentType<OfferEditProps>
  export default OfferEditApp
}
