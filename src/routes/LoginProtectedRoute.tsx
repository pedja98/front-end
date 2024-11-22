import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../helpers/common'

interface LoginProtectedRouteProps {
  element: JSX.Element
}

const LoginProtectedRoute: FC<LoginProtectedRouteProps> = ({ element }) => {
  const currentUser = getCurrentUser()
  return !currentUser || !currentUser.username || !Object.values(currentUser).length ? (
    element
  ) : (
    <Navigate to='/index' />
  )
}

export default LoginProtectedRoute
