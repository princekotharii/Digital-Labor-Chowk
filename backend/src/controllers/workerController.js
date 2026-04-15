import Worker from '../models/Worker.js'

const ALLOWED_SKILLS = new Set(['all', 'plumber', 'electrician', 'painter', 'mason', 'helper'])

function parsePositiveNumber(value, fallback) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }
  return parsed
}

function toBoolean(value) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    if (value === 'true') {
      return true
    }

    if (value === 'false') {
      return false
    }
  }

  return null
}

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
    const radius = parsePositiveNumber(req.query.radius, 5)
    const page = Math.floor(parsePositiveNumber(req.query.page, 1))
    const limit = Math.min(Math.floor(parsePositiveNumber(req.query.limit, 10)), 50)
    const skill = String(req.query.skill || 'all').toLowerCase()

    if (!ALLOWED_SKILLS.has(skill)) {
      return res.status(400).json({ message: 'Invalid skill filter value' })
    }

    const workers = await Worker.find().sort({ rating: -1 }).lean()
    const filtered = workers.filter((worker) => {
      const matchesRadius = Number(worker.distance) <= radius
      const matchesSkill = skill === 'all' || worker.skill === skill
      return worker.available && matchesRadius && matchesSkill
    })

    const start = (page - 1) * limit
    const end = start + limit
    const paginated = filtered.slice(start, end)

    return res.json({
      workers: paginated.map(toApiWorker),
      pagination: {
        page,
        limit,
        total: filtered.length,
        hasNextPage: end < filtered.length,
      },
      filters: { radius, skill },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load workers', error: error.message })
  }
}

export async function getMyWorkerProfile(req, res) {
  try {
    const worker = await Worker.findOne({ userEmail: req.auth.email }).lean()

    if (!worker) {
      return res.status(404).json({ message: 'Worker profile not found for this account' })
    }

    return res.json({ worker: toApiWorker(worker) })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load worker profile', error: error.message })
  }
}

export async function updateAvailability(req, res) {
  try {
    const worker = await Worker.findOne({ code: req.params.id })

    if (!worker) {
      return res.status(404).json({ message: 'Worker not found' })
    }

    const available = toBoolean(req.body.available)
    if (available === null) {
      return res.status(400).json({ message: 'available must be true or false' })
    }

    worker.available = available
    worker.availableUntil = available ? new Date(Date.now() + 12 * 60 * 60 * 1000) : null
    await worker.save()

    return res.json({ message: 'Availability updated', worker: toApiWorker(worker) })
  } catch (error) {
    return res.status(500).json({ message: 'Could not update availability', error: error.message })
  }
}

export async function updateMyAvailability(req, res) {
  try {
    const worker = await Worker.findOne({ userEmail: req.auth.email })

    if (!worker) {
      return res.status(404).json({ message: 'Worker profile not found for this account' })
    }

    const available = toBoolean(req.body.available)
    if (available === null) {
      return res.status(400).json({ message: 'available must be true or false' })
    }

    worker.available = available
    worker.availableUntil = available ? new Date(Date.now() + 12 * 60 * 60 * 1000) : null
    await worker.save()

    return res.json({ message: 'Availability updated', worker: toApiWorker(worker) })
  } catch (error) {
    return res.status(500).json({ message: 'Could not update availability', error: error.message })
  }
}
