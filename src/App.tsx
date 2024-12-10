import './App.css'
import { HeaderContainer } from './components/Header/HeaderContainer'
import { Chatboard } from './components/Chatboard'
function App() {

  return (
    <div className="bg-black h-full w-full text-xs text-white">
      <HeaderContainer />
      <Chatboard />
    </div>
  )
}

export default App
