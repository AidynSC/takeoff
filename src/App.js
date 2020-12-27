import React from 'react'
import { BrowserRouter as Router} from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { AuthPage } from './pages/AuthPage'
import { Contacts } from './pages/Contacts'
import 'materialize-css'

function App() {
  const { login, logout, userId, userName } = useAuth()
  const isAuthenticated = !!userId

  return (
    <AuthContext.Provider value={{
      login, logout, userId, userName, isAuthenticated
    }}>
      <Router>
        { isAuthenticated ? 
          <div className="container">
            <Navbar />
            <Contacts />
          </div>
          :
          <AuthPage />
        }
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
