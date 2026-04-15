import { useEffect, useState } from 'react'
import { FaBriefcase, FaClock, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

function getAuthToken() {
  return localStorage.getItem('dlc-auth-token')
}

function JobBrowse() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [skill, setSkill] = useState('all')
  const [city, setCity] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [myApplications, setMyApplications] = useState(new Set())

  const skillOptions = ['all', 'helper', 'mason', 'electrician', 'plumber', 'painter', 'carpenter', 'welder', 'labour']
  const cityOptions = ['', 'haridwar', 'dehradun', 'roorkee', 'delhi']

  useEffect(() => {
    loadJobs()
    if (user?.role === 'Worker') {
      loadMyApplications()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skill, city, page])

  async function loadJobs() {
    try {
      setLoading(true)
      const query = new URLSearchParams({ skip: (page - 1) * 10, limit: 10, skill })
      if (city) query.append('city', city)

      const response = await fetch(`${API_BASE_URL}/jobs?${query}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setJobs(data.jobs || [])
        setTotalPages(Math.ceil(data.pagination.total / 10))
      } else {
        setJobs([])
      }
    } catch {
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  async function loadMyApplications() {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/worker/my-applications`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const appliedJobIds = new Set(data.applications?.map((app) => app.jobId))
        setMyApplications(appliedJobIds)
      }
    } catch {
      setMyApplications(new Set())
    }
  }

  async function applyJob(jobId) {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ jobId }),
      })

      if (response.ok) {
        alert('Application submitted!')
        setMyApplications((prev) => new Set([...prev, jobId]))
      } else {
        const error = await response.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
  }

  if (user?.role !== 'Worker') {
    return (
      <div className="card reveal">
        <p className="muted">Worker signup required to browse jobs. Please login as a worker.</p>
      </div>
    )
  }

  return (
    <section className="card reveal">
      <h2><FaBriefcase /> Browse Available Jobs</h2>

      <div className="filters-group">
        <div>
          <label htmlFor="skill-filter">Skill</label>
          <select id="skill-filter" value={skill} onChange={(e) => { setSkill(e.target.value); setPage(1) }}>
            {skillOptions.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All Skills' : s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city-filter">City</label>
          <select id="city-filter" value={city} onChange={(e) => { setCity(e.target.value); setPage(1) }}>
            {cityOptions.map((c) => (
              <option key={c} value={c}>
                {c === '' ? 'All Cities' : c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="muted">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="muted">No jobs found for your filters.</div>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <article key={job.id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <span className="job-type">{job.workType}</span>
              </div>

              <p className="job-description">{job.description}</p>

              <div className="job-meta">
                <div><FaRupeeSign /> {job.wagePerDay} / day</div>
                <div><FaMapMarkerAlt /> {job.city.charAt(0).toUpperCase() + job.city.slice(1)}</div>
                <div><FaClock /> From {new Date(job.workStartDate).toLocaleDateString()}</div>
              </div>

              <p className="muted">Posted by <strong>{job.employerName}</strong></p>

              <div className="job-actions">
                {myApplications.has(job.id) ? (
                  <button type="button" className="chip-action muted-action" disabled>
                    Applied
                  </button>
                ) : (
                  <button type="button" className="primary-btn small" onClick={() => applyJob(job.id)}>
                    Apply Now
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button type="button" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button type="button" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      )}
    </section>
  )
}

export default JobBrowse
