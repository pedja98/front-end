import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import notificationsReducer from '../features/notifications.slice'
import searchReducer from '../features/search.slice'
import authReducer from '../features/auth.slice'
import { gwApi } from './apis/gw.api'
import { crmApi } from './apis/crm.api'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['search'],
}

const rootReducer = combineReducers({
  [gwApi.reducerPath]: gwApi.reducer,
  [crmApi.reducerPath]: crmApi.reducer,
  notifications: notificationsReducer,
  search: searchReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
      .concat(gwApi.middleware)
      .concat(crmApi.middleware),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
