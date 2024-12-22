import { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../helpers/common'
import { useAppDispatch } from '../app/hooks'
import { setAuthDataFromCookies } from '../features/auth.slice'

const IndexProtectedRoute: FC<{
  element: JSX.Element
}> = ({ element }) => {
  const username = getCurrentUser().username
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setAuthDataFromCookies())
  })
  return username ? element : <Navigate to='/' />
}

export default IndexProtectedRoute
