import { ChatboardPage } from './pages/Chatboard'
import { LoginPage } from './pages/Login'

export const routes = [
  {
    path: '/login',
    element: LoginPage
  },
  {
    path: '/chat',
    element: ChatboardPage
  }
  // You can easily add more routes like:
  // { path: '/about', element: <AboutPage /> },
  // { path: '/profile', element: <ProfilePage /> }
];