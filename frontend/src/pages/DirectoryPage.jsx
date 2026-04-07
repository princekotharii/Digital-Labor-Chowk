import DirectoryPanel from '../components/DirectoryPanel'
import SectionCard from '../components/SectionCard'

function DirectoryPage() {
  return (
    <SectionCard title="Local Hardware and Rental Directory" className="reveal">
      <p className="muted">Haridwar-focused local ecosystem listings.</p>
      <DirectoryPanel />
    </SectionCard>
  )
}

export default DirectoryPage
