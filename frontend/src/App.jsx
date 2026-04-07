import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import HomePage from './pages/HomePage'
import WorkersPage from './pages/WorkersPage'
import EmployersPage from './pages/EmployersPage'
import DirectoryPage from './pages/DirectoryPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/workers" element={<ProtectedRoute><WorkersPage /></ProtectedRoute>} />
        <Route path="/employers" element={<ProtectedRoute><EmployersPage /></ProtectedRoute>} />
        <Route path="/directory" element={<ProtectedRoute><DirectoryPage /></ProtectedRoute>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
