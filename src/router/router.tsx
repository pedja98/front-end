import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import HomePage from '../pages/HomePage'
import IndexProtectedRoute from '../routes/IndexProtectedRoute'
import Layout from '../layouts/layout'
import LoginProtectedRoute from '../routes/LoginProtectedRoute'
import CompanyPage from '../pages/company/CompanyPage'
import CustomerSessionPage from '../pages/customerSession/CustomerSessionPage'
import OpportunityPage from '../pages/opportunity/OpportunityPage'
import OfferPage from '../pages/offer/OfferPage'
import ContractPage from '../pages/contract/ContractPage'
import ShopPage from '../pages/shop/ShopPage'
import CataloguePage from '../pages/CataloguePage'
import ContactPage from '../pages/contact/ContactPage'
import NotFoundPage from '../pages/NotFoundPage'
import UserPage from '../pages/user/UserPage'
import UserCreatePage from '../pages/user/UserCreatePage'
import EntityIndexPage from '../pages/EntityIndexPage'
import UserListPage from '../pages/user/UserListPage'
import UserDetailPage from '../pages/user/UserDetailPage'
import UserEditPage from '../pages/user/UserEditPage'
import ShopSavePage from '../pages/shop/ShopSavePage'
import RegionPage from '../pages/region/RegionPage'
import RegionSavePage from '../pages/region/RegionSavePage'
import RegionListPage from '../pages/region/RegionListPage'
import RegionDetailPage from '../pages/region/RegionDetailPage'
import CompanySavePage from '../pages/company/CompanySavePage'
import CompanyListPage from '../pages/company/CompanyListPage'
import CompanyDetailPage from '../pages/company/CompanyDetailPage'
import ShopListPage from '../pages/shop/ShopListPage'
import ShopDetailPage from '../pages/shop/ShopDetailPage'
import ContactSavePage from '../pages/contact/ContactSavePage'
import ContactListPage from '../pages/contact/ContactListPage'
import ContactDetailPage from '../pages/contact/ContactDetailPage'
import CustomerSessionSavePage from '../pages/customerSession/CustomerSessionSavePage'
import CustomerSessionListPage from '../pages/customerSession/CustomerSessionListPage'
import CustomerSessionDetailPage from '../pages/customerSession/CustomerSessionDetailPage'
import OpportunityListPage from '../pages/opportunity/OpportunityListPage'
import OpportunityDetailPage from '../pages/opportunity/OpportunityDetailPage'
import OfferEditPage from '../pages/offer/OfferEditPage'
import OfferDetailPage from '../pages/offer/OfferDetailPage'
import OfferListPage from '../pages/offer/OfferListPage'
import AdminProtectedRoute from '../routes/AdminProtectedRoute'
import ContractListPage from '../pages/contract/ContractListPage'
import ContractDetailPage from '../pages/contract/ContractDetailPage'
import ReportPage from '../pages/ReportPage'
import AdminL2ProtectedRoute from '../routes/AdminL2ProtectedRoute'

export default createBrowserRouter([
  { path: '/', element: <LoginProtectedRoute element={<LoginPage />} /> },
  {
    path: '/index',
    element: <IndexProtectedRoute element={<Layout />} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'home', element: <Navigate to='/index' /> },
      { path: 'reports', element: <AdminL2ProtectedRoute element={<ReportPage />} /> },
      {
        path: 'companies',
        element: <CompanyPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <CompanySavePage /> },
          { path: 'list', element: <CompanyListPage /> },
          { path: ':id/edit', element: <CompanySavePage /> },
          { path: ':id', element: <CompanyDetailPage /> },
        ],
      },
      {
        path: 'regions',
        element: <AdminProtectedRoute element={<RegionPage />} />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <RegionSavePage /> },
          { path: 'list', element: <RegionListPage /> },
          { path: ':id', element: <RegionDetailPage /> },
          { path: ':id/edit', element: <RegionSavePage /> },
        ],
      },
      {
        path: 'contacts',
        element: <ContactPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <ContactSavePage /> },
          { path: 'list', element: <ContactListPage /> },
          { path: ':id', element: <ContactDetailPage /> },
          { path: ':id/edit', element: <ContactSavePage /> },
        ],
      },
      {
        path: 'customer-sessions',
        element: <CustomerSessionPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <CustomerSessionSavePage /> },
          { path: 'list', element: <CustomerSessionListPage /> },
          { path: ':id', element: <CustomerSessionDetailPage /> },
          { path: ':id/edit', element: <CustomerSessionSavePage /> },
        ],
      },
      {
        path: 'opportunities',
        element: <OpportunityPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'list', element: <OpportunityListPage /> },
          { path: ':id', element: <OpportunityDetailPage /> },
        ],
      },
      {
        path: 'offers',
        element: <OfferPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'list', element: <OfferListPage /> },
          { path: ':id', element: <OfferDetailPage /> },
          { path: ':id/edit', element: <OfferEditPage /> },
        ],
      },
      {
        path: 'users',
        element: <AdminProtectedRoute element={<UserPage />} />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <UserCreatePage /> },
          { path: 'list', element: <UserListPage /> },
          { path: ':username', element: <UserDetailPage /> },
          { path: ':username/edit', element: <UserEditPage /> },
        ],
      },
      {
        path: 'contracts',
        element: <ContractPage />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'list', element: <ContractListPage /> },
          { path: ':id', element: <ContractDetailPage /> },
        ],
      },
      {
        path: 'shops',
        element: <AdminL2ProtectedRoute element={<ShopPage />} />,
        children: [
          { index: true, element: <EntityIndexPage /> },
          { path: 'create', element: <AdminL2ProtectedRoute element={<ShopSavePage />} /> },
          { path: ':id/edit', element: <ShopSavePage /> },
          { path: 'list', element: <ShopListPage /> },
          { path: ':id', element: <ShopDetailPage /> },
        ],
      },
      { path: 'edit-profile', element: <UserEditPage /> },
      { path: 'catalogue', element: <AdminProtectedRoute element={<CataloguePage />} /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
