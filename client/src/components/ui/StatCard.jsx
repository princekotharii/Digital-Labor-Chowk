export default function StatCard({ label, value, note }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {note ? <p className="mt-2 text-sm leading-6 text-slate-300">{note}</p> : null}
    </article>
  )
}
