import { useState } from 'react'
import ActionButton from '../ui/ActionButton'
import SectionHeading from '../ui/SectionHeading'

export default function AvailabilitySection() {
  const [available, setAvailable] = useState(true)

  return (
    <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/20 lg:grid-cols-[0.95fr_1.05fr] lg:p-7">
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Worker control"
          title="Daily availability in one tap"
          description="Workers can go visible for the next 12 hours without typing long details."
        />
        <ActionButton onClick={() => setAvailable((value) => !value)}>
          {available ? 'Mark Unavailable' : 'Mark Available for 12h'}
        </ActionButton>
        <p className="text-sm text-slate-300">
          Status: <span className="font-semibold text-white">{available ? 'Available' : 'Unavailable'}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
          <p className="text-sm font-medium text-emerald-200">Visible at chowk</p>
          <p className="mt-3 text-3xl font-bold text-white">12h timer</p>
          <p className="mt-2 text-sm leading-6 text-emerald-50/80">Auto hides after shift window ends.</p>
        </div>
        <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
          <p className="text-sm font-medium text-cyan-200">Voice prompt</p>
          <p className="mt-3 text-2xl font-bold text-white">“Kaam ke liye taiyaar”</p>
          <p className="mt-2 text-sm leading-6 text-cyan-50/80">Supports workers with low literacy and fast onboarding.</p>
        </div>
      </div>
    </section>
  )
}
