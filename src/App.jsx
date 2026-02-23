import LandingPage from './pages/Landing'
import Login from './pages/Login'
import Registeration from './pages/Registeration'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registeration" element={<Registeration />} />
        <Route path="/login" element={ <Login /> } />
        <Route path="/dashboard" element={ <Dashboard /> } />

      </Routes>
    </div>
  )
}

export default App
