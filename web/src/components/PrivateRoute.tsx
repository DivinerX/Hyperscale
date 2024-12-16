import { Navigate } from 'react-router-dom';
import { storageService } from "@/services/storage";
import { isTokenValid } from "@/services/validToken";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  if (!isTokenValid(storageService.getItem('token'))) {
    storageService.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  return children;
}; 