import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

interface ProtectedRouteProps {
  element: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const username = useSelector((state: RootState) => state.auth.username)
  return username ? element : <Navigate to='/' />
}

export default ProtectedRoute
