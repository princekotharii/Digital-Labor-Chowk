import { useState } from 'react'
import { FaLanguage, FaMicrophone } from 'react-icons/fa'

function LanguageVoicePanel({ language, onLanguageChange }) {
  const [voiceInput, setVoiceInput] = useState('')

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setVoiceInput('Voice feature is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => setVoiceInput(event.results[0][0].transcript)
    recognition.onerror = () => setVoiceInput('Could not capture audio. Please try again.')
    recognition.start()
  }

  return (
    <>
      <div className="language-group">
        <button
          type="button"
          className={language === 'en' ? 'active' : ''}
          onClick={() => onLanguageChange('en')}
        >
          <FaLanguage /> English
        </button>
        <button
          type="button"
          className={language === 'hi' ? 'active' : ''}
          onClick={() => onLanguageChange('hi')}
        >
          <FaLanguage /> Hindi
        </button>
      </div>
      <button type="button" className="voice-btn" onClick={startVoiceInput}><FaMicrophone /> Voice to Text</button>
      <div className="voice-box">{voiceInput || 'Speak here to fill text automatically.'}</div>
    </>
  )
}

export default LanguageVoicePanel
