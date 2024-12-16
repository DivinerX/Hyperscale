import { jwtDecode } from 'jwt-decode';

export const validateToken = (token: string) => {
  try {
    if (!token) return false;
    const decoded = jwtDecode<{ exp?: number }>(token);
    return decoded.exp ? decoded.exp > Date.now() / 1000 : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}