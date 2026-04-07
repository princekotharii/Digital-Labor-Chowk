import Worker from '../models/Worker.js'

function toApiWorker(worker) {
  return {
    id: worker.code,
    name: worker.name,
    skill: worker.skill,
    chowk: worker.chowk,
    distance: worker.distance,
    rating: worker.rating,
    available: worker.available,
    availableUntil: worker.availableUntil,
  }
}

export async function listWorkers(req, res) {
  try {
    const radius = Number(req.query.radius || 5)
    const skill = String(req.query.skill || 'all')

    const workers = await Worker.find().sort({ rating: -1 }).lean()
    const filtered = workers.filter((worker) => {
      const matchesRadius = Number(worker.distance) <= radius
      const matchesSkill = skill === 'all' || worker.skill === skill
      return worker.available && matchesRadius && matchesSkill
    })

    return res.json({ workers: filtered.map(toApiWorker) })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load workers', error: error.message })
  }
}

export async function updateAvailability(req, res) {
  try {
    const worker = await Worker.findOne({ code: req.params.id })

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' })
    }

    const available = Boolean(req.body.available)
    worker.available = available
    worker.availableUntil = available ? new Date(Date.now() + 12 * 60 * 60 * 1000) : null
    await worker.save()

    return res.json({ message: 'Availability updated', worker: toApiWorker(worker) })
  } catch (error) {
    return res.status(500).json({ message: 'Could not update availability', error: error.message })
  }
}
