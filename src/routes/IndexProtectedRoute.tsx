import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../helpers/common'

interface IndexProtectedRouteProps {
  element: JSX.Element
}

const IndexProtectedRoute: FC<IndexProtectedRouteProps> = ({ element }) => {
  const currentUser = getCurrentUser()
  return currentUser.username ? element : <Navigate to='/' />
}

export default IndexProtectedRoute
