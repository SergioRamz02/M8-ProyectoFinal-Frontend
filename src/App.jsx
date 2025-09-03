import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Events from './Pages/Events';
import EventDetail from './Pages/EventDetail';
import Scan from './Pages/Scan';
import CreateEvent from './Pages/CreateEvent';
import NotFound from './Pages/NotFound';
import useAuth from './Hooks/useAuth';
import useLastVisited from './Hooks/useLastVisited';
import ProtectedRoute from './Components/ProtectedRoute';

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

  const hasRole = (...roles) => roles.includes(user?.role);

  return (
    <> 
       <div className='min-h-screen'>
        <Navbar />
        <main className='container-app py-8'>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/events' element={<Events/>} />
            <Route path='/events/: id' element={<EventDetail/>} />
            <Route 
              path='/events/new' 
              element={
              <ProtectedRoute>
                { hasRole('organizer', 'admin') ? <CreateEvent /> : <NotFound /> }
              </ProtectedRoute>
            }
            />
            <Route
                 path='/scan' 
                 element={ 
                  <ProtectedRoute>
                    { hasRole('organizer','admin','staff') ? <Scan /> : <NotFound />}
                  </ProtectedRoute>
                }
                />
            <Route path='*' element={<NotFound/>} />
            
        </Routes>
        </main>
       </div>
    </>
  )
}

export default App
