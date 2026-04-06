import SectionHeading from '../ui/SectionHeading'
import { trustMetrics } from '../../data/appData'

export default function TrustSection() {
  return (
    <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-5 lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
      <div className="space-y-4">
        <SectionHeading
          eyebrow="Trust system"
          title="Two-way ratings for fairness"
          description="Employers rate punctuality and skill. Workers rate payment behavior and job transparency."
        />
        <div className="rounded-3xl border border-violet-400/20 bg-violet-400/10 p-5 text-sm text-violet-100">
          Simple rating chips build local trust without heavy text or complex forms.
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {trustMetrics.map((metric) => (
          <article key={metric.label} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
            <div className="mt-3 text-3xl font-bold text-white">{metric.value}</div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{metric.note}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
