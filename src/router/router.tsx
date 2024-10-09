import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ProtectedRoute from '../routes/ProtectedRoute'

export default createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/home', element: <ProtectedRoute element={<Home />} /> },
])
