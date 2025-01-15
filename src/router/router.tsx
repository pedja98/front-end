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
import UserManagement from '../components/user/UserManagement'
import UserCreateView from '../components/user/UserCreateView'
import EntityIndex from '../pages/EntityIndex'
import UsersListView from '../components/user/UsersListView'
import UserDetailView from '../components/user/UserDetailView'
import UserEditView from '../components/user/UserEditView'
import CreateShop from '../components/shop/CreateShop'
import Regions from '../pages/Regions'
import RegionCreateView from '../components/region/RegionCreateView'
import RegionListView from '../components/region/RegionListView'
import RegionDetailView from '../components/region/RegionDetailView'
import RegionEditView from '../components/region/RegionEditView'
import CompanyCreateView from '../components/company/CompanyCreateView'

export default createBrowserRouter([
  { path: '/', element: <LoginProtectedRoute element={<Login />} /> },
  {
    path: '/index',
    element: <IndexProtectedRoute element={<Layout />} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Navigate to='/index' /> },
      {
        path: 'companies',
        element: <Companies />,
        children: [
          { index: true, element: <EntityIndex /> },
          { path: 'create', element: <CompanyCreateView /> },
        ],
      },
      {
        path: 'regions',
        element: <Regions />,
        children: [
          { index: true, element: <EntityIndex /> },
          { path: 'create', element: <RegionCreateView /> },
          { path: 'list', element: <RegionListView /> },
          { path: ':id', element: <RegionDetailView /> },
          { path: ':id/edit', element: <RegionEditView /> },
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
        path: 'user-management',
        element: <UserManagement />,
        children: [
          { index: true, element: <EntityIndex /> },
          { path: 'create', element: <UserCreateView /> },
          { path: 'list', element: <UsersListView /> },
          { path: 'user/:username', element: <UserDetailView /> },
          { path: 'user/:username/edit', element: <UserEditView /> },
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
