import './App.css'
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { socketService } from './services/socket'
import { useEffect } from 'react'
import { PrivateRoute } from './components/PrivateRoute';
import { storageService } from './services/storage';
import { useDispatch } from 'react-redux';
import { validateToken } from './services/validToken';
import { DecodedToken, setUser } from './store/slices/userSlice';
import { jwtDecode } from 'jwt-decode';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    socketService.init();

    const token = storageService.getItem('token');
    console.log("token", token);
    if (token && validateToken(token)) {
      const decoded = jwtDecode<DecodedToken>(token);
      dispatch(setUser(decoded));
    }
  }, [])

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
