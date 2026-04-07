import { skills } from '../data/skills'

function SkillFilter({ selectedSkill, onSelectSkill, language = 'en' }) {
  return (
    <div className="skills-grid">
      <button
        type="button"
        className={selectedSkill === 'all' ? 'skill-chip selected' : 'skill-chip'}
        onClick={() => onSelectSkill('all')}
      >
        🌐 {language === 'hi' ? 'सभी' : 'All'}
      </button>
      {skills.map((skill) => (
        <button
          type="button"
          key={skill.id}
          className={selectedSkill === skill.id ? 'skill-chip selected' : 'skill-chip'}
          onClick={() => onSelectSkill(skill.id)}
        >
          {skill.icon} {skill.label[language]}
        </button>
      ))}
    </div>
  )
}

export default SkillFilter
