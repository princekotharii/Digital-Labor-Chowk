import { useContext } from 'react'
import { DemoModeContext } from '../context/DemoModeContext'

export function useDemoMode() {
  const context = useContext(DemoModeContext)
  if (!context) {
    throw new Error('useDemoMode must be used inside DemoModeProvider')
  }
  return context
}
