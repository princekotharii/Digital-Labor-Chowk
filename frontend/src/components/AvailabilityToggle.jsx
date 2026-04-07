import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

function AvailabilityToggle({ available, onToggle, language = 'en' }) {
  const text = language === 'hi'
    ? {
      on: 'आज के लिए उपलब्ध',
      off: 'आज उपलब्ध नहीं',
      sub: 'स्टेटस अगले 12 घंटे के लिए मान्य रहेगा',
    }
    : {
      on: 'Available Today',
      off: 'Not Available',
      sub: 'Status remains active for next 12 hours',
    }

  return (
    <>
      <button
        type="button"
        className={`availability-btn ${available ? 'on' : 'off'}`}
        onClick={onToggle}
      >
        {available ? <FaCheckCircle /> : <FaTimesCircle />}
        {available ? text.on : text.off}
      </button>
      <p className="muted">{text.sub}</p>
    </>
  )
}

export default AvailabilityToggle
