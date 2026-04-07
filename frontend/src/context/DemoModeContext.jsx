import { createContext, useMemo, useState } from 'react'

export const DemoModeContext = createContext(null)

export function DemoModeProvider({ children }) {
  const [demoMode, setDemoMode] = useState(() => {
    const stored = localStorage.getItem('dlc-demo-mode')
    return stored ? stored === 'true' : true
  })

  const toggleDemoMode = () => {
    setDemoMode((prev) => {
      const next = !prev
      localStorage.setItem('dlc-demo-mode', String(next))
      return next
    })
  }

  const value = useMemo(() => ({ demoMode, toggleDemoMode }), [demoMode])

  return <DemoModeContext.Provider value={value}>{children}</DemoModeContext.Provider>
}
