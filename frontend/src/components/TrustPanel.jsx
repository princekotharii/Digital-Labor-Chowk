import { useEffect, useState } from 'react'
import { FaCheckCircle, FaClock, FaDollarSign, FaShieldAlt } from 'react-icons/fa'
import { getTrustSummary } from '../api/client'

function TrustPanel() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    let active = true

    async function loadSummary() {
      try {
        const data = await getTrustSummary()
        if (active) {
          setSummary(data)
        }
      } catch {
        if (active) {
          setSummary({
            punctuality: 4.5,
            skillQuality: 4.4,
            paymentBehavior: 4.2,
            mutualRespect: 4.7,
          })
        }
      }
    }

    loadSummary()

    return () => {
      active = false
    }
  }, [])

  if (!summary) {
    return <p className="muted">Loading trust metrics...</p>
  }

  return (
    <div className="ratings">
      <div><FaClock /> Punctuality: {summary.punctuality}/5</div>
      <div><FaCheckCircle /> Skill Quality: {summary.skillQuality}/5</div>
      <div><FaDollarSign /> Employer Payment Behavior: {summary.paymentBehavior}/5</div>
      <div><FaShieldAlt /> Mutual Respect Score: {summary.mutualRespect}/5</div>
    </div>
  )
}

export default TrustPanel
