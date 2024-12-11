import './App.css'
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { socketService } from './services/socket'
import { useEffect } from 'react'

function App() {

  useEffect(() => {
    socketService.init();
  }, [])

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.element />}
        />
      ))}
    </Routes>
  )
}

export default App
