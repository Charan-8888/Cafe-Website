import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

type ProtectedRouteProps = {
  children: ReactNode;
  isAllowed: boolean;
  redirectTo: string;
};

export default function ProtectedRoute({ children, isAllowed, redirectTo }: ProtectedRouteProps) {
  return isAllowed ? children : <Navigate to={redirectTo} replace />;
}
