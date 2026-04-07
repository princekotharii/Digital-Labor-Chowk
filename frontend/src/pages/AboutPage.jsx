import SectionCard from '../components/SectionCard'

function AboutPage() {
  return (
    <SectionCard title="About This Architecture" className="reveal">
      <p>
        This multi-page structure is built for MERN expansion. Frontend routes are modular,
        API calls are isolated in reusable clients, and backend endpoints are ready for MongoDB.
      </p>
      <ul className="about-list">
        <li>Worker flow: availability toggle, language support, voice input.</li>
        <li>Employer flow: nearby worker search, category filtering, trust scores.</li>
        <li>Ecosystem flow: local hardware shops and equipment rental listings.</li>
      </ul>
    </SectionCard>
  )
}

export default AboutPage
