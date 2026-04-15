import { useEffect, useState } from 'react'
import { FaEnvelope, FaLock, FaShieldAlt, FaUserPlus } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function getDefaultRouteByRole(role) {
  return role === 'Employer' ? '/employers' : '/workers'
}

function LoginPage() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (isAuthenticated) {
      const destination = (from === '/' || from === '/login' || from === '/register')
        ? getDefaultRouteByRole(user?.role)
        : from
      navigate(destination, { replace: true })
    }
  }, [from, isAuthenticated, navigate, user?.role])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const result = await login(formData)
    if (!result.ok) {
      setError(result.message)
      return
    }

    const destination = (from === '/' || from === '/login' || from === '/register')
      ? getDefaultRouteByRole(result.user?.role)
      : from

    navigate(destination, { replace: true })
  }

  return (
    <section className="card login-card reveal">
      <p className="pill">Secure Login</p>
      <h2>Sign In To Digital Labor Chowk</h2>
      <p className="muted">Access workers, employers and directory management modules.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <div className="input-wrap">
          <FaEnvelope />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
          />
        </div>

        <label htmlFor="password">Password</label>
        <div className="input-wrap">
          <FaLock />
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="primary-btn">
          <FaShieldAlt /> Login
        </button>
      </form>

      <div className="login-help muted">
        <p>Use the account you created as a worker or employer.</p>
        <p>Role-specific pages open automatically after sign-in.</p>
        <p className="register-link-row">
          New user? <Link to="/register"><FaUserPlus /> Register here</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage
