export interface Notification {
  key: number
  text: string
  type: NotificationTypeEnum
}

export type NotificationState = Notification[]

export enum NotificationTypeEnum {
  Default = 'default',
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
}

export type SetNotificationProps = { text: string; type: NotificationTypeEnum }
