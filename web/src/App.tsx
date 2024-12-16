import './App.css'
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { useEffect } from 'react'
import { storageService } from '@/services/storage';
import { useDispatch } from 'react-redux';
import { isTokenValid } from '@/services/validToken';
import { setUser } from '@/store/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import { IDecodedToken } from '@/Types';
import { PrivateRoute } from './components/PrivateRoute';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = storageService.getItem('token');
    if (token && isTokenValid(token)) {
      const decoded = jwtDecode<IDecodedToken>(token);
      dispatch(setUser(decoded));
    }

    return () => {
    }
  }, [dispatch])

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.protected ? (
              <PrivateRoute>
                {typeof route.element === 'function' ? <route.element /> : route.element}
              </PrivateRoute>
            ) : (
              typeof route.element === 'function' ? <route.element /> : route.element
            )
          }
        />
      ))}
    </Routes>
  )
}

export default App
