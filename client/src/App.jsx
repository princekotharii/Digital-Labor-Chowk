import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import HeroSection from './components/sections/HeroSection'
import AvailabilitySection from './components/sections/AvailabilitySection'
import NearbyWorkersSection from './components/sections/NearbyWorkersSection'
import SkillsSection from './components/sections/SkillsSection'
import TrustSection from './components/sections/TrustSection'
import DirectorySection from './components/sections/DirectorySection'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <HeroSection />
        <AvailabilitySection />
        <NearbyWorkersSection />
        <SkillsSection />
        <TrustSection />
        <DirectorySection />
      </main>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>
    </div>
  )
}

export default App