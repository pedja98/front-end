import { NotificationType } from './notifications.types'

export interface Notification {
  key: number
  text: string
  type: NotificationType
}
