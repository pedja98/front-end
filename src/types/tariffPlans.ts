export interface PrintTariffPlan {
  name: ItemName
  identifier: string
  price: number
  count: number
}

export interface TariffPlanGroupedByStatus {
  activeTariffPlans: PrintTariffPlan[]
  deactivatedTariffPlans: PrintTariffPlan[]
  activeTariffPlansAddons: Record<string, Addon[]>
  activeDiscounts: Record<string, string>
}

export interface Addon {
  id: string
  name: ItemName
  identifier: string
  price: string
  tariffPlanIdentifier: string
  offerId: string
}

export interface ItemName {
  sr: string
  en: string
}

export interface TariffPlanCharacteristicResponse {
  tariffPlan: TariffPlanRelationship
  characteristics: TariffPlanCharacteristicChar[]
}

export interface TariffPlanRelationship {
  id: string
  name: ItemName
  identifier: string
}

export interface TariffPlanCharacteristicChar {
  charId: string
  relationId: string
  name: ItemName
  identifier: string
  createdByUser: string
  dateCreated: string
}
