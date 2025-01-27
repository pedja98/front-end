import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import IndexProtectedRoute from '../routes/IndexProtectedRoute'
import Layout from '../layouts/layout'
import LoginProtectedRoute from '../routes/LoginProtectedRoute'
import CompanyPage from '../pages/company/CompanyPage'
import CustomerSessionPage from '../pages/CustomerSessionPage'
import OpportunityPage from '../pages/OpportunityPage'
import OfferPage from '../pages/OfferPage'
import ContractPage from '../pages/ContractPage'
import ShopPage from '../pages/shop/ShopPage'
import CataloguePage from '../pages/CataloguePage'
import ContactPage from '../pages/ContactPage'
import NotFoundPage from '../pages/NotFoundPage'
import UserManagementPage from '../pages/user/UserManagementPage'
import UserCreatePage from '../pages/user/UserCreatePage'
import EntityIndexPage from '../pages/EntityIndexPage'
import UsersListPage from '../pages/user/UsersListPage'
import UserDetailPage from '../pages/user/UserDetailPage'
import UserEditPage from '../pages/user/UserEditPage'
import ShopCreatePage from '../pages/shop/ShopCreatePage'
import RegionPage from '../pages/region/RegionPage'
import RegionCreatePage from '../pages/region/RegionCreatePage'
import RegionListPage from '../pages/region/RegionListPage'
import RegionDetailPage from '../pages/region/RegionDetailPage'
import RegionEditPage from '../pages/region/RegionEditPage'
import CompanyCreatePage from '../pages/company/CompanyCreatePage'
import CompanyListPage from '../pages/company/CompanyListPage'

export default createBrowserRouter([
  { path: '/', element: <LoginProtectedRoute element={<LoginPage />} /> },
  {
    path: '/index',
    element: <IndexProtectedRoute element={<Layout />} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <Navigate to='/index' /> },
      {
        path: 'companies',
        element: <CompanyPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <CompanyCreatePage /> },
          { path: 'list', element: <CompanyListPage /> },
        ],
      },
      {
        path: 'regions',
        element: <RegionPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <RegionCreatePage /> },
          { path: 'list', element: <RegionListPage /> },
          { path: ':id', element: <RegionDetailPage /> },
          { path: ':id/edit', element: <RegionEditPage /> },
        ],
      },
      { path: 'contacts', element: <ContactPage />, children: [{ index: true, element: <EntityIndexPage /> }] },
      {
        path: 'customer-sessions',
        element: <CustomerSessionPage />,
        children: [{ index: true, element: <EntityIndexPage /> }],
      },
      {
        path: 'opportunities',
        element: <OpportunityPage />,
        children: [{ index: true, element: <EntityIndexPage /> }],
      },
      { path: 'offers', element: <OfferPage />, children: [{ index: true, element: <EntityIndexPage /> }] },
      {
        path: 'user-management',
        element: <UserManagementPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <UserCreatePage /> },
          { path: 'list', element: <UsersListPage /> },
          { path: 'user/:username', element: <UserDetailPage /> },
          { path: 'user/:username/edit', element: <UserEditPage /> },
        ],
      },
      {
        path: 'contracts',
        element: <ContractPage />,
        children: [{ index: true, element: <EntityIndexPage /> }],
      },
      {
        path: 'shops',
        element: <ShopPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <ShopCreatePage /> },
        ],
      },
      { path: 'edit-profile', element: <UserEditPage /> },
      { path: 'catalogue', element: <CataloguePage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
