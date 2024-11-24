import { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../helpers/common'
import { useAppDispatch } from '../app/hooks'
import { setAuthDataFromLocalStorage } from '../features/auth.slice'

interface IndexProtectedRouteProps {
  element: JSX.Element
}

const IndexProtectedRoute: FC<IndexProtectedRouteProps> = ({ element }) => {
  const currentUser = getCurrentUser() ?? undefined
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setAuthDataFromLocalStorage())
  })
  return currentUser && currentUser.username ? element : <Navigate to='/' />
}

export default IndexProtectedRoute
