import { FC } from 'react'
import logo from '@/assets/logo.svg'
import { TerminalContainer } from '../Terminal/TerminalContainer'

export const Login: FC<{
  handleSubmit: (e: React.FormEvent) => void,
  username: string,
  setUsername: (username: string) => void,
  password: string,
  setPassword: (password: string) => void,
  loading: boolean,
  error: string,
  handleXLogin?: () => void
}> = ({ handleSubmit, username, setUsername, password, setPassword, loading, error, handleXLogin }) => {
  return (
    <div className='text-white h-full'>
      <TerminalContainer />
      <div className="flex flex-row h-full justify-center items-center from-[#000] to-[#111] bg-[url('/login_bg.svg')] bg-cover bg-center">
        <form action="" className='flex flex-col justify-center px-24 gap-4 items-center sm:w-1/3 w-full' onSubmit={handleSubmit}>
          <img src={logo} alt="logo" className='h-12 mb-12' />
          {
            error && (
              <div className='text-red-500 text-sm'>{error}</div>
            )
          }
          <div className="w-full flex flex-col gap-2">
            <span className=''>Username</span>
            <input
              type="text"
              placeholder='@Username'
              className='w-full p-2 border border-[#ffffff41] outline-none text-gray-600'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className=''>Password</span>
            <input
              type="password"
              placeholder='Password'
              className='w-full p-2 border border-[#ffffff41] outline-none text-gray-600'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='bg-[#111111] border border-[#4D4D4D] text-center w-full align-middle py-2 uppercase'>{loading ? `Authenticating...` : `Authenticate`}</button>
          <button 
            type='button' 
            className='text-xs bg-[#191919] border border-[#4D4D4D] px-4 py-2 w-full uppercase flex items-center justify-center gap-2'
            onClick={handleXLogin}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            continue with x
          </button>
        </form>
      </div>
    </div>
  )
}