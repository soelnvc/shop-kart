import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './Pages/landing.jsx'
import Login from './Pages/login.jsx'
import Signup from './Pages/signup.jsx'
import './Pages/home.jsx'

function App() {

  return (
    <>  
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<h1>Landing</h1>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Signup />}/>
        <Route path='/home' element={<h1>Home</h1>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
