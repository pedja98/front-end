import { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../helpers/common'
import { useAppDispatch } from '../app/hooks'
import { setAuthDataFromCookies } from '../features/auth.slice'
import { UserType } from '../types/user'

const AdminL2ProtectedRoute: FC<{
  element: JSX.Element
}> = ({ element }) => {
  const userType = getCurrentUser().type as UserType
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setAuthDataFromCookies())
  })
  return [UserType.L2_MANAGER, UserType.ADMIN].includes(userType) ? element : <Navigate to='/' />
}

export default AdminL2ProtectedRoute
