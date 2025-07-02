export interface PrintTariffPlan {
  name: ItemName
  identifier: string
  price: number
  count: number
}

export interface TariffPlanGroupedByStatus {
  activeTariffPlans: PrintTariffPlan[]
  deactivatedTariffPlans: PrintTariffPlan[]
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
