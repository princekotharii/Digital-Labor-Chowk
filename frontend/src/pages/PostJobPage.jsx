import { useState } from 'react'
import { FaBriefcase } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

function getAuthToken() {
  return localStorage.getItem('dlc-auth-token')
}

function PostJobPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skill: 'helper',
    wagePerDay: '',
    location: '',
    city: 'haridwar',
    workType: 'Daily',
    workStartDate: '',
    requiredWorkers: '1',
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const skillOptions = ['helper', 'mason', 'electrician', 'plumber', 'painter', 'carpenter', 'welder', 'labour']
  const workTypeOptions = ['Daily', 'Weekly', 'Monthly', 'Project']
  const cityOptions = ['haridwar', 'dehradun', 'roorkee', 'delhi']

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({
          ...formData,
          wagePerDay: Number(formData.wagePerDay),
          requiredWorkers: Number(formData.requiredWorkers),
          workStartDate: new Date(formData.workStartDate).toISOString(),
        }),
      })

      if (response.ok) {
        setMessage('Job posted successfully!')
        setFormData({
          title: '',
          description: '',
          skill: 'helper',
          wagePerDay: '',
          location: '',
          city: 'haridwar',
          workType: 'Daily',
          workStartDate: '',
          requiredWorkers: '1',
        })
        setTimeout(() => setMessage(''), 3000)
      } else {
        const error = await response.json()
        setMessage(`Error: ${error.message}`)
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (user?.role !== 'Employer') {
    return (
      <div className="card reveal">
        <p className="muted">Employer signup required to post jobs. Please login as an employer.</p>
      </div>
    )
  }

  return (
    <section className="card reveal">
      <h2><FaBriefcase /> Post a New Job</h2>

      <form onSubmit={handleSubmit} className="post-job-form">
        <div className="form-group">
          <label htmlFor="title">Job Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Mason needed for residential wall work"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description *</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe scope, site timing, wage expectations, and any material needs."
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="skill">Skill Required *</label>
            <select id="skill" name="skill" value={formData.skill} onChange={handleChange} required>
              {skillOptions.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="wagePerDay">Wage Per Day (₹) *</label>
            <input
              id="wagePerDay"
              name="wagePerDay"
              type="number"
              min="0"
              placeholder="700"
              value={formData.wagePerDay}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location/Site Address *</label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="NH-58 Industrial Area, Haridwar"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City *</label>
            <select id="city" name="city" value={formData.city} onChange={handleChange} required>
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="workType">Work Type *</label>
            <select id="workType" name="workType" value={formData.workType} onChange={handleChange} required>
              {workTypeOptions.map((wt) => (
                <option key={wt} value={wt}>
                  {wt}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="workStartDate">Start Date *</label>
            <input
              id="workStartDate"
              name="workStartDate"
              type="datetime-local"
              value={formData.workStartDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="requiredWorkers">Workers Needed</label>
          <input
            id="requiredWorkers"
            name="requiredWorkers"
            type="number"
            min="1"
            value={formData.requiredWorkers}
            onChange={handleChange}
          />
        </div>

        {message && (
          <p className={message.startsWith('Error') ? 'error-text' : 'success-text'}>{message}</p>
        )}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </section>
  )
}

export default PostJobPage
