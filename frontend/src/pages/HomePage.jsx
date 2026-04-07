import { useState } from 'react'
import { FaBolt, FaLanguage, FaMapMarkerAlt, FaRegClock, FaRocket, FaShieldAlt, FaTools, FaUsers } from 'react-icons/fa'
import AvailabilityToggle from '../components/AvailabilityToggle'
import GeoSearchPanel from '../components/GeoSearchPanel'
import LanguageVoicePanel from '../components/LanguageVoicePanel'
import SectionCard from '../components/SectionCard'
import SkillFilter from '../components/SkillFilter'
import { labels } from '../data/labels'
import { useDemoMode } from '../hooks/useDemoMode'

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

const featuredOpportunities = [
  {
    id: 'f1',
    title: 'Labour (Helper) Required for Site Work',
    wage: 'Rs 700 / day',
    city: 'Haridwar',
    tone: 'tone-1',
    tag: 'Immediate Hiring',
  },
  {
    id: 'f2',
    title: 'Mason Required for Residential Construction',
    wage: 'Rs 900 / day',
    city: 'Roorkee',
    tone: 'tone-2',
    tag: 'Verified Employer',
  },
  {
    id: 'f3',
    title: 'Electrician Needed for Wiring Project',
    wage: 'Rs 1000 / day',
    city: 'Dehradun',
    tone: 'tone-3',
    tag: 'High Demand',
  },
]

function HomePage() {
  const [available, setAvailable] = useState(true)
  const [language, setLanguage] = useState('en')
  const [selectedSkill, setSelectedSkill] = useState('all')
  const t = labels[language]
  const { demoMode } = useDemoMode()

  return (
    <>
      <section className="hero card hero-scale reveal">
        <div className="hero-copy-block">
          <p className="hero-kicker">India Labor Network 2.0</p>
          <h2>{t.title}</h2>
          <p>Find trusted workers quickly and help laborers get daily work with confidence.</p>
          <div className="hero-actions">
            <button type="button" className="hero-cta">Post Requirement</button>
            <button type="button" className="hero-ghost">Browse Jobs</button>
          </div>
          <div className="hero-trust-row">
            <span><FaUsers /> 2,400+ Active Workers</span>
            <span><FaShieldAlt /> 1,100+ Verified Employers</span>
            <span><FaRegClock /> Live in 12 Cities</span>
          </div>
        </div>
        <div className="hero-visual-block" aria-label="platform network visual">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <article className="metric-card">
            <p>Live Requests</p>
            <strong>128</strong>
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

      {demoMode && (
        <section className="card demo-strip reveal delay-1">
          <h3>Live Demo Flow</h3>
          <p className="muted">Register {">"} Login {">"} Workers availability {">"} Employers filter {">"} Trust ratings.</p>
        </section>
      )}

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

      <SectionCard title="Featured Opportunities" className="reveal delay-3">
        <div className="featured-grid">
          {featuredOpportunities.map((job) => (
            <article key={job.id} className="featured-card">
              <div className={`featured-media ${job.tone}`}>
                <span>{job.tag}</span>
              </div>
              <div className="featured-body">
                <h3>{job.title}</h3>
                <p className="muted">{job.city}</p>
                <p className="featured-wage">{job.wage}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Built For Scale" className="reveal delay-4">
        <div className="scale-grid">
          <article className="scale-card">
            <h3><FaRocket /> Expansion Ready</h3>
            <p className="muted">Launch city by city with shared infra and predictable onboarding flow.</p>
          </article>
          <article className="scale-card">
            <h3><FaMapMarkerAlt /> Geo First</h3>
            <p className="muted">Nearby workers and job locality make hiring faster and practical.</p>
          </article>
          <article className="scale-card">
            <h3><FaShieldAlt /> Trust Layer</h3>
            <p className="muted">Profiles, ratings and worker availability combine into safer matching.</p>
          </article>
        </div>
      </SectionCard>

      <section className="grid-2">
        <SectionCard title="Availability Toggle" className="reveal delay-4">
          <p className="section-tag"><FaBolt /> Real-time availability status</p>
          <AvailabilityToggle
            available={available}
            onToggle={() => setAvailable((prev) => !prev)}
            language={language}
          />
        </SectionCard>

        <SectionCard title="Language And Voice" className="reveal delay-5">
          <p className="section-tag"><FaLanguage /> Primary English interface with optional Hindi switch</p>
          <LanguageVoicePanel language={language} onLanguageChange={setLanguage} />
        </SectionCard>
      </section>

      <SectionCard title="Geo-Location Based Search" className="reveal delay-5">
        <p className="section-tag"><FaMapMarkerAlt /> Discover workers by radius and local chowk points</p>
        <GeoSearchPanel selectedSkill={selectedSkill} language={language} />
      </SectionCard>

      <SectionCard title="Skill-Specific Categories" className="reveal delay-6">
        <p className="section-tag"><FaTools /> Filter fast by trade category</p>
        <SkillFilter selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} language={language} />
      </SectionCard>
    </>
  )
}

export default HomePage
