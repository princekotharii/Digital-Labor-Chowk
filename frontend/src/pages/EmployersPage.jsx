import GeoSearchPanel from '../components/GeoSearchPanel'
import SectionCard from '../components/SectionCard'
import SkillFilter from '../components/SkillFilter'
import TrustPanel from '../components/TrustPanel'
import { useState } from 'react'
import { FaLanguage } from 'react-icons/fa'

function EmployersPage() {
  const [selectedSkill, setSelectedSkill] = useState('all')
  const [language, setLanguage] = useState('en')

  return (
    <>
      <SectionCard title="Employer Search Filters" className="reveal">
        <div className="language-group compact">
          <button type="button" className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}><FaLanguage /> English</button>
          <button type="button" className={language === 'hi' ? 'active' : ''} onClick={() => setLanguage('hi')}><FaLanguage /> Hindi</button>
        </div>
        <SkillFilter selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} language={language} />
      </SectionCard>

      <SectionCard title="Find Workers Near Your Site" className="reveal delay-1">
        <GeoSearchPanel selectedSkill={selectedSkill} language={language} />
      </SectionCard>

      <SectionCard title="Trust Ratings" className="reveal delay-2">
        <TrustPanel />
      </SectionCard>
    </>
  )
}

export default EmployersPage
