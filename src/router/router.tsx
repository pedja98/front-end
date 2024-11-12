import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import IndexProtectedRoute from '../routes/IndexProtectedRoute'
import Layout from '../layouts/layout'
import LoginProtectedRoute from '../routes/LoginProtectedRoute'
import Companies from '../pages/Companies'
import CustomerSessions from '../pages/CustomerSessions'
import Opportunities from '../pages/Opportunities'
import Offers from '../pages/Offers'
import Contracts from '../pages/Contracts'
import Shops from '../pages/Shops'
import EditProfile from '../pages/EditProfile'
import Catalogue from '../pages/Catalogue'
import Contacts from '../pages/Contacts'

export default createBrowserRouter([
  { path: '/', element: <LoginProtectedRoute element={<Login />} /> },
  {
    path: '/index',
    element: <IndexProtectedRoute element={<Layout />} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Navigate to='/index' /> },
      { path: 'companies', element: <Companies /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'customer-sessions', element: <CustomerSessions /> },
      { path: 'opportunities', element: <Opportunities /> },
      { path: 'offers', element: <Offers /> },
      { path: 'contracts', element: <Contracts /> },
      { path: 'shops', element: <Shops /> },
      { path: 'edit-profile', element: <EditProfile /> },
      { path: 'catalogue', element: <Catalogue /> },
    ],
  },
])
