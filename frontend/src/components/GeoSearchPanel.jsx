import { useEffect, useState } from 'react'
import { FaMap, FaMapMarkerAlt, FaSlidersH, FaThList } from 'react-icons/fa'
import { getWorkers } from '../api/client'
import { labels } from '../data/labels'
import WorkerList from './WorkerList'

function GeoSearchPanel({ selectedSkill, language = 'en' }) {
  const [view, setView] = useState('list')
  const [radius, setRadius] = useState(5)
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(false)
  const t = labels[language]

  useEffect(() => {
    let active = true

    async function loadWorkers() {
      try {
        setLoading(true)
        const data = await getWorkers({ radius, skill: selectedSkill })
        if (active) {
          setWorkers(data.workers || [])
        }
      } catch {
        if (active) {
          setWorkers([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadWorkers()

    return () => {
      active = false
    }
  }, [radius, selectedSkill])

  return (
    <>
      <div className="toolbar">
        <div className="tabs">
          <button type="button" className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}>
            <FaMap /> {t.map}
          </button>
          <button type="button" className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>
            <FaThList /> {t.list}
          </button>
        </div>
        <label htmlFor="radius">
          <FaSlidersH /> {t.radius}: <strong>{radius} km</strong>
        </label>
        <input
          id="radius"
          type="range"
          min="1"
          max="8"
          value={radius}
          onChange={(event) => setRadius(Number(event.target.value))}
        />
      </div>

      {view === 'map' ? (
        <div className="map-placeholder">
          <span><FaMapMarkerAlt /></span>
          <p>{language === 'hi' ? 'बैकएंड कोऑर्डिनेट्स से मैप इंटीग्रेशन पॉइंट' : 'Map integration point with backend coordinates'}</p>
        </div>
      ) : loading ? (
        <div className="skeleton-list" aria-label="Loading workers">
          <div className="skeleton-row" />
          <div className="skeleton-row" />
          <div className="skeleton-row" />
        </div>
      ) : (
        <WorkerList workers={workers} language={language} />
      )}
    </>
  )
}

export default GeoSearchPanel
