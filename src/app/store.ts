import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import NotificationsReducer from '../features/notifications.slice'
import SearchReducer from '../features/search.slice'
import AuthReducer from '../features/auth.slice'
import ConfirmReducer from '../features/confirm.slice'
import CommonReducer from '../features/common.slice'
import { gwApi } from './apis/core/gw.api'
import { crmApi } from './apis/core/crm.api'
import { omApi } from './apis/core/om.api'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['search'],
}

const rootReducer = combineReducers({
  [gwApi.reducerPath]: gwApi.reducer,
  [crmApi.reducerPath]: crmApi.reducer,
  [omApi.reducerPath]: omApi.reducer,
  common: CommonReducer,
  notifications: NotificationsReducer,
  search: SearchReducer,
  auth: AuthReducer,
  confirm: ConfirmReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'payload.onConfirm'],
        ignoredActionPaths: ['payload.onConfirm', 'payload.onCancel', 'meta.baseQueryMeta'],
        ignoredPaths: ['confirm.onConfirm', 'confirm.onCancel', 'api.meta.baseQueryMeta'],
      },
    })
      .concat(gwApi.middleware)
      .concat(omApi.middleware)
      .concat(crmApi.middleware),
})

export const persister = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
