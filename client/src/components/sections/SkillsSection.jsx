import SectionHeading from '../ui/SectionHeading'
import { skillCategories } from '../../data/appData'

export default function SkillsSection() {
  return (
    <section className="space-y-5 rounded-[2rem] border border-white/10 bg-slate-900/70 p-5 lg:p-7">
      <SectionHeading
        eyebrow="Skill filters"
        title="Easy categories with icons"
        description="Workers can be discovered by skill type without reading long forms or complicated labels."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((skill) => (
          <article key={skill.name} className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/8">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-2xl">{skill.icon}</div>
              <div>
                <h3 className="text-base font-semibold text-white">{skill.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{skill.hint}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
