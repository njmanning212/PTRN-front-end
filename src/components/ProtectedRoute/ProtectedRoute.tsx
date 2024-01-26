// npm modules
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// types
import { Profile } from '../../types/models'

interface ProtectedRouteProps {
  user: Profile | null;
  children: ReactNode;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
  const { user, children } = props

  if (!user) return <Navigate to="/auth/login" />
  return <> { children } </>
}

export default ProtectedRoute
