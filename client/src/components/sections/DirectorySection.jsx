import SectionHeading from '../ui/SectionHeading'
import { directoryItems, workflowSteps } from '../../data/appData'

export default function DirectorySection() {
  return (
    <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 lg:grid-cols-[0.95fr_1.05fr] lg:p-7">
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Local ecosystem"
          title="Hardware shops and equipment rentals"
          description="A city-level directory helps workers and contractors find tools, safety gear, and rentals in one place."
        />

        <div className="space-y-3">
          {directoryItems.map((item) => (
            <article key={item.name} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-white">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-400">{item.type}</p>
                </div>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{item.service}</span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{item.location}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-5">
        <p className="text-sm font-medium text-slate-300">Platform flow</p>
        <div className="space-y-3">
          {workflowSteps.map((step, index) => (
            <article key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-400 text-sm font-bold text-slate-950">
                  {index + 1}
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
