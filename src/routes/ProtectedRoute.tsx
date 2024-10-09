import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

interface ProtectedRouteProps {
  element: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = useSelector((state: RootState) => state.auth.token)
  return token ? element : <Navigate to='/' />
}

export default ProtectedRoute
