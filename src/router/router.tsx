import { createBrowserRouter } from 'react-router-dom'
import SignIn from '../components/auth/SignIn'

export default createBrowserRouter([{ path: '/', element: <SignIn /> }])
