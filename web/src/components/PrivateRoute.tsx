import { Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { storageService } from "@/services/storage";

interface JwtPayload {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

const isAuthenticated = (): boolean => {
  const token = storageService.getItem('token');
  if (!token) return false;
  
  return !isTokenExpired(token);
};

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    storageService.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  return children;
}; 