import { ChatboardPage } from '@/pages/Chatboard'
import { LoginPage } from '@/pages/Login'
import { PortfolioPage } from '@/pages/Portfolio';

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
    path: '/',
    element: ChatboardPage,
    protected: true
  },
  {
    path: '/portfolio',
    element: PortfolioPage,
    protected: true
  }
];
