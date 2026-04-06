import { languages } from '../../data/appData'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">Digital Labor Chowk</p>
          <h1 className="text-lg font-semibold text-white sm:text-xl">Worker-first local hiring platform</h1>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2 md:flex">
          {languages.map((language) => (
            <span
              key={language.value}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                language.active ? 'bg-cyan-400 text-slate-950' : 'text-slate-300'
              }`}
            >
              {language.label}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
