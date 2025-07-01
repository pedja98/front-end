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
