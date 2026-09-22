import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/login.jsx';
import Signup from './Pages/signup.jsx';
import Home from './Pages/home.jsx';
import Products from './Pages/Products.jsx';
import ProductDetails from './Pages/ProductDetails.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Landing</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
