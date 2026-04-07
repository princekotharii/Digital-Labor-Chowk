import { skills } from '../data/skills'

function WorkerList({ workers, language = 'en' }) {
  if (!workers.length) {
    return <p className="muted">No active workers found in this filter.</p>
  }

  return (
    <div className="worker-list">
      {workers.map((worker) => {
        const skillData = skills.find((item) => item.id === worker.skill)
        const initials = worker.name.slice(0, 1).toUpperCase()

        return (
          <article key={worker.id} className="worker-card">
            <div className="worker-main">
              <div className="worker-avatar" aria-hidden="true">{initials}</div>
              <div>
                <strong>{worker.name}</strong>
                <p>{worker.chowk}</p>
                <p className="muted worker-badges">Verified Worker • Available now</p>
              </div>
            </div>
            <div>{skillData?.icon} {skillData?.label?.[language] || worker.skill}</div>
            <div>{worker.distance} km</div>
            <div>⭐ {worker.rating}</div>
            <div className="worker-actions">
              <button type="button" className="chip-action">Call</button>
              <button type="button" className="chip-action muted-action">Details</button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default WorkerList
