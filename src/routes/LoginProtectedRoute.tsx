import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../helpers/common'

const LoginProtectedRoute: FC<{
  element: JSX.Element
}> = ({ element }) => {
  const username = getCurrentUser().username
  return !username ? element : <Navigate to='/index' />
}

export default LoginProtectedRoute
