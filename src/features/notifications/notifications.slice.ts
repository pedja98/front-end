import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NotificationsInitialState } from '../../constants/notification'
import { SetNotificationProps } from './notifications.types'

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: NotificationsInitialState,
  reducers: {
    setNotification: (state, action: PayloadAction<SetNotificationProps>) => {
      return [...state, { ...action.payload, key: new Date().getTime() + Math.random() }]
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      return state.filter((notification) => notification.key !== action.payload)
    },
  },
})

export const { setNotification, removeNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
