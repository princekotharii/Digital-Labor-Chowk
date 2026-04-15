import { useEffect, useState } from 'react'
import { getMyWorkerProfile, updateMyAvailability } from '../api/client'
import AvailabilityToggle from '../components/AvailabilityToggle'
import LanguageVoicePanel from '../components/LanguageVoicePanel'
import SectionCard from '../components/SectionCard'
import { useAuth } from '../hooks/useAuth'

function WorkersPage() {
  const { user } = useAuth()
  const [available, setAvailable] = useState(false)
  const [loading, setLoading] = useState(true)
  const [language, setLanguage] = useState('en')
  const [statusMessage, setStatusMessage] = useState('Loading your worker profile...')

  useEffect(() => {
    let active = true

    async function loadMyWorkerState() {
      try {
        const data = await getMyWorkerProfile()
        if (active && data?.worker) {
          setAvailable(Boolean(data.worker.available))
          setStatusMessage(
            data.worker.available
              ? 'You are visible to employers right now.'
              : 'You are currently hidden from employer search.',
          )
        }
      } catch {
        if (active) {
          setStatusMessage('Worker profile not found. Complete worker registration details.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadMyWorkerState()

    return () => {
      active = false
    }
  }, [])

  const handleToggle = async () => {
    const next = !available
    setAvailable(next)

    try {
      await updateMyAvailability(next)
      setStatusMessage(next ? 'Availability synced for next 12 hours.' : 'Availability turned off.')
    } catch {
      setAvailable(!next)
      setStatusMessage('Could not sync with server. Running in local mode.')
    }
  }

  if (user?.role !== 'Worker') {
    return (
      <SectionCard title="Worker Dashboard" className="reveal">
        <p className="muted">This section is only for Worker accounts. Please login as a worker.</p>
      </SectionCard>
    )
  }

  return (
    <section className="grid-2">
      <SectionCard title="Worker Quick Actions" className="reveal">
        <AvailabilityToggle
          available={available}
          onToggle={handleToggle}
          language={language}
          disabled={loading}
        />
        <p className="muted">{statusMessage}</p>
      </SectionCard>

      <SectionCard title="Language and Voice Support" className="reveal delay-1">
        <LanguageVoicePanel language={language} onLanguageChange={setLanguage} />
      </SectionCard>
    </section>
  )
}

export default WorkersPage
