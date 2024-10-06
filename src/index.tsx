import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { CssBaseline, ThemeProvider } from '@mui/material'
import crmTheme from './theme/crmTheme'
import './utils/i18n'
import { SnackbarProvider } from 'notistack'
import Notification from './components/notification/Notification'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={crmTheme}>
      <Provider store={store}>
        <CssBaseline />
        <RouterProvider router={router} />
        <SnackbarProvider maxSnack={5} autoHideDuration={8000}>
          <Notification />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
