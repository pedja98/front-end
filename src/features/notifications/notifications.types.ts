export type NotificationType = 'default' | 'error' | 'success' | 'warning' | 'info' | undefined

export type SetNotificationProps = { text: string; type: NotificationType }
