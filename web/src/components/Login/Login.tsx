import { FC } from 'react'
import logo_title from '@/assets/logo_title.svg'
import logo from '@/assets/logo.svg'

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
      <div className="flex flex-col h-full">
        <div className='flex flex-row justify-between w-full px-4 py-3 items-center border-b border-[#ffffff41]'>
          <div className='flex flex-row justify-center items-center gap-4'>
            <img src={logo_title} alt="logo" className='h-7' />
          </div>
          <div className='flex flex-row justify-center items-center bg-[#ffffff41] border border-[#ffffff1a] text-center w-20 h-8 align-middle py-4 px-2'>
            <a href="/auth">
              LOG IN
            </a>
          </div>
        </div>
        <div className='flex flex-row justify-start h-full'>
          <div className='flex flex-col gap-24 w-16 items-center pt-24'>
            <a href="" className='uppercase transform -rotate-90'>home</a>
            <a href="" className='uppercase transform -rotate-90'>portfolio</a>
            <a href="" className='uppercase transform -rotate-90'>blog</a>
            <a href="" className='uppercase transform -rotate-90'>careers</a>
          </div>
          <div className='w-1 h-full border-r border-[#ffffff41]'></div>
          <form action="" className='flex flex-col justify-center px-36 gap-4 items-start sm:w-1/2 w-full' onSubmit={handleSubmit}>
            <img src={logo} alt="logo" className='h-12' />
            <span className='text-2xl font-bold'>Log In</span>
            <span className='text-sm text-[#bfbfbf]'>Enter your authentication details.</span>
            {
              error && (
                <div className='text-red-500 text-sm'>{error}</div>
              )
            }
            <div className="w-full">
              <span className='text-md'>Username</span>
              <input 
                type="text" 
                placeholder='Username' 
                className='w-full p-2 border border-[#ffffff41] outline-none text-gray-600' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div className="w-full">
              <span className='text-md'>Password</span>
              <input 
                type="password" 
                placeholder='Password' 
                className='w-full p-2 border border-[#ffffff41] outline-none text-gray-600'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            {
              loading ?
              <button type='submit' className='bg-[#ffffff15] border border-[#ffffff3f] text-center w-full align-middle py-2 uppercase'>Authenticating...</button>
              :
              <button type='submit' className='bg-[#ffffff15] border border-[#ffffff3f] text-center w-full align-middle py-2 uppercase'>Authenticate</button>
            }
          </form>
          <img src="/login_bg.png" alt="login_bg" className='w-1/2 h-full' />
        </div>
      </div>
    </div>
  )
}