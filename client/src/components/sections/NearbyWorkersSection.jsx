import SectionHeading from '../ui/SectionHeading'
import { nearbyWorkers } from '../../data/appData'

export default function NearbyWorkersSection() {
  return (
    <section className="grid gap-6 rounded-4xl border border-white/10 bg-white/5 p-5 lg:grid-cols-[1.05fr_0.95fr] lg:p-7">
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Geo search"
          title="Workers near chowks and within 5 km"
          description="Employers can switch between list and map-style views to find the closest available labor quickly."
        />

        <div className="relative min-h-70 overflow-hidden rounded-4xl border border-white/10 bg-slate-950 p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_55%)]" />
          <div className="relative grid h-full place-items-center">
            <div className="grid h-44 w-44 place-items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-center text-sm text-cyan-100">
              <div>
                <div className="text-2xl font-bold text-white">5 km</div>
                <div>Radius search</div>
              </div>
            </div>
            <div className="absolute left-6 top-10 rounded-full border border-white/10 bg-slate-900 px-3 py-2 text-xs text-slate-200">
              Har Ki Pauri
            </div>
            <div className="absolute right-10 top-20 rounded-full border border-white/10 bg-slate-900 px-3 py-2 text-xs text-slate-200">
              Jwalapur
            </div>
            <div className="absolute bottom-8 left-12 rounded-full border border-white/10 bg-slate-900 px-3 py-2 text-xs text-slate-200">
              Ranipur More
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-300">Nearby live locations</p>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">Map + List</span>
        </div>

        <div className="space-y-3">
          {nearbyWorkers.map((item) => (
            <article key={item.name} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-white">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.distance} away</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  {item.status}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="rounded-full bg-white/5 px-3 py-1">{item.workers} workers</span>
                <span className="rounded-full bg-white/5 px-3 py-1">{item.demand}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
