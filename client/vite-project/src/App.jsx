import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './Pages/landing.jsx'
import Login from './Pages/login.jsx'
import Signup from './Pages/signup.jsx'
import Home from './Pages/home.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Landing</h1>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Signup />}/>
          <Route path='/home' element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
