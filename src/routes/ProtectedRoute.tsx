import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setAuthDataFromLocalStorage } from '../features/auth.slice'
import { AuthState } from '../types/auth'

interface ProtectedRouteProps {
  element: JSX.Element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setAuthDataFromLocalStorage())
  }, [])
  const auth = (
    localStorage.getItem('currentUser') ? JSON.parse(String(localStorage.getItem('currentUser'))) : {}
  ) as AuthState
  return auth.username ? element : <Navigate to='/' />
}

export default ProtectedRoute
