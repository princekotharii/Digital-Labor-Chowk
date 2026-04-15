import { useEffect, useState } from 'react'
import { FaBolt, FaLanguage, FaMapMarkerAlt, FaRegClock, FaRocket, FaShieldAlt, FaTools, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import AvailabilityToggle from '../components/AvailabilityToggle'
import GeoSearchPanel from '../components/GeoSearchPanel'
import LanguageVoicePanel from '../components/LanguageVoicePanel'
import SectionCard from '../components/SectionCard'
import SkillFilter from '../components/SkillFilter'
import { labels } from '../data/labels'

const highlightedSkills = [
  'All Skills',
  'Labour',
  'Mason',
  'Carpenter',
  'Electrician',
  'Painter',
  'Plumber',
  'Welder',
  'Helper',
]

const highlightedStates = [
  'All States',
  'Uttarakhand',
  'Delhi',
  'Uttar Pradesh',
  'Haryana',
  'Punjab',
  'Rajasthan',
  'Maharashtra',
]

function HomePage() {
  const [available, setAvailable] = useState(true)
  const [language, setLanguage] = useState('en')
  const [selectedSkill, setSelectedSkill] = useState('all')
  const [stats, setStats] = useState(null)
  const navigate = useNavigate()
  const t = labels[language]

  useEffect(() => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

    fetch(`${API_BASE_URL}/jobs/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {
        setStats({
          openJobs: 0,
          activeWorkers: 0,
          verifiedEmployers: 0,
          activeCities: 0,
        })
      })
  }, [])

  return (
    <>
      <section className="hero card hero-scale reveal">
        <div className="hero-copy-block">
          <p className="hero-kicker">India Labor Network 2.0</p>
          <h2>{t.title}</h2>
          <p>Post work requirements, discover nearby workers, and manage applications from one dashboard.</p>
          <div className="hero-actions">
            <button type="button" className="hero-cta" onClick={() => navigate('/post-job')}>
              Post Requirement
            </button>
            <button type="button" className="hero-ghost" onClick={() => navigate('/browse-jobs')}>
              Browse Jobs
            </button>
          </div>
          <div className="hero-trust-row">
            <span><FaUsers /> {(stats?.activeWorkers ?? 0).toLocaleString()} Active Workers</span>
            <span><FaShieldAlt /> {(stats?.verifiedEmployers ?? 0).toLocaleString()} Verified Employers</span>
            <span><FaRegClock /> Live in {stats?.activeCities ?? 0} Cities</span>
          </div>
        </div>
        <div className="hero-visual-block" aria-label="platform network visual">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <article className="metric-card">
            <p>Live Requests</p>
            <strong>{stats?.openJobs ?? 0}</strong>
            <small>in last 60 mins</small>
          </article>
          <article className="metric-card">
            <p>Avg Match Time</p>
            <strong>11 min</strong>
            <small>worker to employer</small>
          </article>
          <article className="metric-card">
            <p>Success Rate</p>
            <strong>92%</strong>
            <small>completed bookings</small>
          </article>
        </div>
      </section>

      <SectionCard title="Popular Skills" className="reveal delay-1">
        <div className="chip-list feature-chips">
          {highlightedSkills.map((chip) => (
            <button type="button" key={chip} className="pill-chip">{chip}</button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Top Hiring States" className="reveal delay-2">
        <div className="chip-list feature-chips">
          {highlightedStates.map((chip) => (
            <button type="button" key={chip} className="pill-chip state">{chip}</button>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Built For Scale" className="reveal delay-3">
        <div className="scale-grid">
          <article className="scale-card">
            <h3><FaRocket /> Expansion Ready</h3>
            <p className="muted">Launch city by city with shared infrastructure and predictable onboarding.</p>
          </article>
          <article className="scale-card">
            <h3><FaMapMarkerAlt /> Geo First</h3>
            <p className="muted">Nearby workers and job locality make hiring faster and more practical.</p>
          </article>
          <article className="scale-card">
            <h3><FaShieldAlt /> Trust Layer</h3>
            <p className="muted">Profiles, ratings, and worker availability combine into safer matching.</p>
          </article>
        </div>
      </SectionCard>

      <section className="grid-2">
        <SectionCard title="Availability Toggle" className="reveal delay-3">
          <p className="section-tag"><FaBolt /> Real-time availability status</p>
          <AvailabilityToggle
            available={available}
            onToggle={() => setAvailable((prev) => !prev)}
            language={language}
          />
        </SectionCard>

        <SectionCard title="Language And Voice" className="reveal delay-4">
          <p className="section-tag"><FaLanguage /> Primary English interface with optional Hindi switch</p>
          <LanguageVoicePanel language={language} onLanguageChange={setLanguage} />
        </SectionCard>
      </section>

      <SectionCard title="Geo-Location Based Search" className="reveal delay-4">
        <p className="section-tag"><FaMapMarkerAlt /> Discover workers by radius and local chowk points</p>
        <GeoSearchPanel selectedSkill={selectedSkill} language={language} />
      </SectionCard>

      <SectionCard title="Skill-Specific Categories" className="reveal delay-5">
        <p className="section-tag"><FaTools /> Filter fast by trade category</p>
        <SkillFilter selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} language={language} />
      </SectionCard>
    </>
  )
}

export default HomePage
