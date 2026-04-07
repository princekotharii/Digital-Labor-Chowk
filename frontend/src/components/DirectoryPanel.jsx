import { useEffect, useState } from 'react'
import { FaBuilding, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { getDirectory } from '../api/client'

function DirectoryPanel() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    let active = true

    async function loadDirectory() {
      try {
        const data = await getDirectory()
        if (active) {
          setEntries(data.entries || [])
        }
      } catch {
        if (active) {
          setEntries([])
        }
      }
    }

    loadDirectory()

    return () => {
      active = false
    }
  }, [])

  if (!entries.length) {
    return <p className="muted">No listings found. Add local hardware and rental data from backend.</p>
  }

  return (
    <div className="directory-list">
      {entries.map((item) => (
        <article key={item.id} className="directory-card">
          <p><FaBuilding /> <strong>{item.name}</strong></p>
          <p>{item.type}</p>
          <p><FaMapMarkerAlt /> {item.area}</p>
          <p><FaPhone /> {item.contact}</p>
        </article>
      ))}
    </div>
  )
}

export default DirectoryPanel
