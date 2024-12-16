import { WithHeader } from '@/components/WithHeader';
import { LoginContainer } from '@/components/Login/LoginContainer';
import { FC } from 'react';

export const LoginPage: FC = () => {
  return (
    <WithHeader>
      <LoginContainer />
    </WithHeader>
  )
};