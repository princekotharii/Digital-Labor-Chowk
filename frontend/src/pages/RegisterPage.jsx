import { useEffect, useState } from 'react'
import { FaEnvelope, FaIdBadge, FaLock, FaShieldAlt, FaUserPlus } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function getDefaultRouteByRole(role) {
  return role === 'Employer' ? '/employers' : '/workers'
}

function RegisterPage() {
  const { register, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    role: 'Worker',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate(getDefaultRouteByRole(user?.role), { replace: true })
    }
  }, [isAuthenticated, navigate, user?.role])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = await register({
      name: formData.name,
      role: formData.role,
      email: formData.email,
      password: formData.password,
    })

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate(getDefaultRouteByRole(result.user?.role), { replace: true })
  }

  return (
    <section className="card login-card register-card reveal">
      <p className="pill">Create Account</p>
      <h2>Register For Digital Labor Chowk</h2>
      <p className="muted">Create a worker or employer account and sign in instantly.</p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <div className="input-wrap">
          <FaIdBadge />
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <label htmlFor="role">Account Type</label>
        <select id="role" name="role" value={formData.role} onChange={handleChange} className="select-field">
          <option value="Worker">Worker</option>
          <option value="Employer">Employer</option>
        </select>

        <label htmlFor="email">Email</label>
        <div className="input-wrap">
          <FaEnvelope />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
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
            placeholder="Create password"
            required
          />
        </div>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="input-wrap">
          <FaLock />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat password"
            required
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="primary-btn">
          <FaUserPlus /> Register
        </button>
      </form>

      <div className="login-help muted">
        <p>Already have an account?</p>
        <Link to="/login">Go to login</Link>
      </div>
    </section>
  )
}

export default RegisterPage
