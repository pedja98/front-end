import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import notificationsReducer from '../features/notifications.slice'
import authReducer from '../features/auth.slice'
import userReducer from '../features/user.slice'
import { gwApi } from './apis/gw.api'
import { crmApi } from './apis/crm.api'

const rootReducer = combineReducers({
  [gwApi.reducerPath]: gwApi.reducer,
  [crmApi.reducerPath]: crmApi.reducer,
  notifications: notificationsReducer,
  auth: authReducer,
  user: userReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gwApi.middleware).concat(crmApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
