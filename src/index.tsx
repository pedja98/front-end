import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import './index.css'
import { Provider } from 'react-redux'
import { persister, store } from './app/store'
import { CssBaseline, ThemeProvider } from '@mui/material'
import crmTheme from './theme/crmTheme'
import './utils/i18n'
import { SnackbarProvider } from 'notistack'
import Notification from './components/Notification'
import { PersistGate } from 'redux-persist/integration/react'
import Spinner from './components/Spinner'
import Confirm from './components/Confirm'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={crmTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <CssBaseline />
          <Suspense fallback={<Spinner />}>
            <RouterProvider router={router} />
          </Suspense>
          <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
            <Notification />
          </SnackbarProvider>
          <Confirm />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
