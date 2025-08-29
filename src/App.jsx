import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import useAuth from './Hooks/useAuth';
import useLastVisited from './Hooks/useLastVisited';

function App() {
  const { isAuthenticated, user} = useAuth();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const {setLastPath, getLastPath} = useLastVisited();

  useEffect(()=> {setLastPath(pathname), [pathname, setLastPath]});

  useEffect(() => {
    if(window.location.pathname === '/') {
      const last = getLastPath();
      if(last && isAuthenticated() && last !== '/') navigate(last, {replace: true});
    }
  }, [isAuthenticated, getLastPath, navigate]);

  return (
    <> 
       <div className='min-h-screen'>
        <Navbar />
        <main className='container-app py-8'>
          <Routes>
           <Route path='/' element={<Login/>} />
           <Route path='/register' element={<Register/>} />
        </Routes>
        </main>
       </div>
    </>
  )
}

export default App
