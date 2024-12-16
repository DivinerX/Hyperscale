import './App.css'
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { useEffect } from 'react'
import { PrivateRoute } from './components/PrivateRoute';
import { storageService } from '@/services/storage';
import { useDispatch } from 'react-redux';
import { validateToken } from '@/services/validToken';
import { setUser } from '@/store/slices/userSlice';
import { jwtDecode } from 'jwt-decode';
import { SocketService } from './services/socket';
import { IDecodedToken } from '@/Types';
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    SocketService.init();

    const token = storageService.getItem('token');
    if (token && validateToken(token)) {
      const decoded = jwtDecode<IDecodedToken>(token);
      dispatch(setUser(decoded));
      SocketService.emit(SocketService.event.userIdentify, { id: decoded.sub, username: decoded.username });
    }

    return () => {
      SocketService.disconnect();
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
