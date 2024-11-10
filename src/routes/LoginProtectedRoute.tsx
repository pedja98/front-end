import { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setAuthDataFromLocalStorage } from '../features/auth.slice'
import { AuthState } from '../types/auth'

interface LoginProtectedRouteProps {
  element: JSX.Element
}

const LoginProtectedRoute: FC<LoginProtectedRouteProps> = ({ element }) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setAuthDataFromLocalStorage())
  }, [])
  const auth = (
    localStorage.getItem('currentUser') ? JSON.parse(String(localStorage.getItem('currentUser'))) : {}
  ) as AuthState
  return !auth.username ? element : <Navigate to='/index' />
}

export default LoginProtectedRoute
