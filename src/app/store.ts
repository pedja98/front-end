import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import notificationsReducer from '../features/notifications/notifications.slice'

const rootReducer = combineReducers({
  notifications: notificationsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
