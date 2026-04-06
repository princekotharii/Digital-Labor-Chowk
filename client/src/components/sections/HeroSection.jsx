import ActionButton from '../ui/ActionButton'
import StatCard from '../ui/StatCard'
import { appStats } from '../../data/appData'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(2,6,23,0.96))] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.03)_50%,transparent_100%)] opacity-30" />

      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
            <span className="text-lg">🎙️</span>
            Voice-first, Hindi-friendly, low-text interface
          </div>

          <div className="space-y-4">
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Hire and get hired quickly at local Labor Chowks.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              A mobile-friendly system for daily wage workers and contractors with availability toggle, nearby search,
              skill filters, trust ratings, and a local shop directory.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ActionButton>Mark Available for 12h</ActionButton>
            <ActionButton variant="secondary">Search Workers Nearby</ActionButton>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {appStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-cyan-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Quick worker status</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Available now</h3>
            </div>
            <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-300">
              Live
            </div>
          </div>

          <div className="mt-5 space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Next auto-expire</span>
              <span>12 hours</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Primary language</p>
                <p className="mt-2 text-lg font-semibold text-white">हिंदी / Regional</p>
              </div>
              <div className="rounded-2xl bg-slate-900 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Access mode</p>
                <p className="mt-2 text-lg font-semibold text-white">Voice + Tap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
