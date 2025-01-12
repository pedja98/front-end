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
import NotFound from '../pages/NotFound'
import UserManagment from '../pages/UserManagment'
import CreateUser from '../components/user/CreateUser'
import EntityIndex from '../pages/EntityIndex'
import UsersListView from '../components/user/UsersListView'
import UserDetailView from '../components/user/UserDetailView'
import UserEditView from '../components/user/UserEditView'
import CreateShop from '../components/shop/CreateShop'
import Regions from '../pages/Regions'
import CreateRegion from '../components/region/CreateRegion'
import RegionListView from '../components/region/RegionListView'

export default createBrowserRouter([
  { path: '/', element: <LoginProtectedRoute element={<Login />} /> },
  {
    path: '/index',
    element: <IndexProtectedRoute element={<Layout />} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Navigate to='/index' /> },
      { path: 'companies', element: <Companies />, children: [{ index: true, element: <EntityIndex /> }] },
      {
        path: 'regions',
        element: <Regions />,
        children: [
          { index: true, element: <EntityIndex /> },
          { path: 'create', element: <CreateRegion /> },
          { path: 'list', element: <RegionListView /> },
        ],
      },
      { path: 'contacts', element: <Contacts />, children: [{ index: true, element: <EntityIndex /> }] },
      {
        path: 'customer-sessions',
        element: <CustomerSessions />,
        children: [{ index: true, element: <EntityIndex /> }],
      },
      { path: 'opportunities', element: <Opportunities />, children: [{ index: true, element: <EntityIndex /> }] },
      { path: 'offers', element: <Offers />, children: [{ index: true, element: <EntityIndex /> }] },
      {
        path: 'user-managment',
        element: <UserManagment />,
        children: [
          { index: true, element: <EntityIndex /> },
          { path: 'create', element: <CreateUser /> },
          { path: 'list', element: <UsersListView /> },
          { path: 'user/:username', element: <UserDetailView /> },
          { path: 'user/edit/:username', element: <UserEditView /> },
        ],
      },
      {
        path: 'contracts',
        element: <Contracts />,
        children: [{ index: true, element: <EntityIndex /> }],
      },
      {
        path: 'shops',
        element: <Shops />,
        children: [
          { index: true, element: <EntityIndex /> },
          { path: 'create', element: <CreateShop /> },
        ],
      },
      { path: 'edit-profile', element: <EditProfile /> },
      { path: 'catalogue', element: <Catalogue /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])
