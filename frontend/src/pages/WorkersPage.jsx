import { useState } from 'react'
import { updateAvailability } from '../api/client'
import AvailabilityToggle from '../components/AvailabilityToggle'
import LanguageVoicePanel from '../components/LanguageVoicePanel'
import SectionCard from '../components/SectionCard'

function WorkersPage() {
  const [available, setAvailable] = useState(true)
  const [language, setLanguage] = useState('en')
  const [statusMessage, setStatusMessage] = useState('')

  const handleToggle = async () => {
    const next = !available
    setAvailable(next)

    try {
      await updateAvailability('w1', next)
      setStatusMessage(next ? 'Availability synced for next 12 hours.' : 'Availability turned off.')
    } catch {
      setStatusMessage('Could not sync with server. Running in local mode.')
    }
  }

  return (
    <section className="grid-2">
      <SectionCard title="Worker Quick Actions" className="reveal">
        <AvailabilityToggle
          available={available}
          onToggle={handleToggle}
          language={language}
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
