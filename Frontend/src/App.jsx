import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Products from './Pages/Products';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import RefreshHandler from './Pages/RefreshHandler';
function App() {
  const [authenticate,setIsauthenticate] = useState(false);

  const PrivateRoute = ({element})=>{
    return authenticate ? element : <Navigate to={"/login"}/>

  }

  return (
    <>
      <Router>
        <RefreshHandler setIsauthenticate={setIsauthenticate} />
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/products' element={<PrivateRoute element={<Products/>}/>}/>
              </Routes>
      </Router>
    </>
  )
}

export default App
