import { ChatboardPage } from './pages/Chatboard'
import { LoginPage } from './pages/Login'

interface RouteConfig {
  path: string;
  element: React.ComponentType | JSX.Element;
  protected?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: '/login',
    element: LoginPage,
    protected: false
  },
  {
    path: '/chat',
    element: ChatboardPage,
    protected: true
  }
];
