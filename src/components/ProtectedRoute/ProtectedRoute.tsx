// npm modules
import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

// types
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = (props: ProtectedRouteProps): JSX.Element => {
  const {children } = props
  const userProfile = useSelector((state: RootState) => state.userProfile)

  if (!userProfile.id) return <Navigate to="/" />
  return <> { children } </>
}

export default ProtectedRoute
