import { FC, useEffect, useState } from 'react'
import { Login } from './Login'
import { AppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import { loginUser, setMode } from '@/store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useNavigate } from 'react-router-dom'

export const LoginContainer: FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setMode('AUTH')
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(loginUser({ username, password }));
  }

  const handleXLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/user/twitter`;
  };

  return (
    <Login
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      loading={loading}
      error={error || ''}
      handleXLogin={handleXLogin}
    />
  )
}