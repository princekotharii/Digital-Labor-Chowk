import { useEffect, useState } from 'react'
import { FaCheckCircle, FaClock, FaCoins, FaUsers } from 'react-icons/fa'
import SectionCard from '../components/SectionCard'

function AboutPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

    fetch(`${API_BASE_URL}/jobs/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {
        setStats({
          openJobs: 0,
          totalApplicants: 0,
          completedJobs: 0,
          activeWorkers: 0,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <SectionCard title="About Digital Labor Chowk" className="reveal">
        <p>
          Digital Labor Chowk is a real-time marketplace connecting daily wage workers with employers who need them. Built with production patterns and scalable architecture, the platform solves the fundamental problem of information asymmetry in manual labor markets.
        </p>
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>How It Works</h3>
        <ul className="about-list">
          <li><strong>Workers:</strong> Register, mark daily availability, and get discovered by nearby employers searching by skill. Build trust through ratings.</li>
          <li><strong>Employers:</strong> Post jobs by skill, location, and wage. Search available workers in real-time. Rate worker performance after completion.</li>
          <li><strong>Platform:</strong> Provides real-time matching, transparent ratings, and local business directory for tool rentals.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Platform Statistics" className="reveal delay-1">
        {loading ? (
          <p className="muted">Loading platform stats...</p>
        ) : stats ? (
          <div className="stats-grid">
            <div className="stat-card">
              <FaCoins /> <strong>{stats.openJobs}</strong> <small>Open Job Listings</small>
            </div>
            <div className="stat-card">
              <FaUsers /> <strong>{stats.totalApplicants}</strong> <small>Job Applications</small>
            </div>
            <div className="stat-card">
              <FaCheckCircle /> <strong>{stats.completedJobs}</strong> <small>Completed Jobs</small>
            </div>
            <div className="stat-card">
              <FaClock /> <strong>11 min</strong> <small>Avg Match Time</small>
            </div>
          </div>
        ) : null}
      </SectionCard>

      <SectionCard title="Technical Architecture" className="reveal delay-2">
        <p>This multi-page structure is built with production-grade patterns:</p>
        <ul className="about-list">
          <li><strong>Frontend:</strong> React with Vite, modular components, role-based pages.</li>
          <li><strong>Backend:</strong> Express.js with JWT auth, role-based middleware, MongoDB models.</li>
          <li><strong>APIs:</strong> RESTful endpoints with pagination, validation, and error handling.</li>
          <li><strong>Security:</strong> Stateless auth, protected routes, input validation, CORS.</li>
          <li><strong>Deployment:</strong> Docker-ready, cloud-agnostic, MongoDB Atlas compatible.</li>
        </ul>
      </SectionCard>
    </>
  )
}

export default AboutPage
