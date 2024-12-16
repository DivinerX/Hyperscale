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
  error: string
}> = ({ handleSubmit, username, setUsername, password, setPassword, loading, error }) => {
  return (
    <div className='text-white h-full'>
      <TerminalContainer />
      <div className="flex flex-row h-full justify-center items-center">
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
          <button type='button' className='text-xs bg-[#191919] border border-[#4D4D4D] px-4 py-2 w-full uppercase'>continue with x</button>
        </form>
      </div>
    </div>
  )
}