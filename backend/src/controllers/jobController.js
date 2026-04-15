import Job from '../models/Job.js'
import User from '../models/User.js'
import Worker from '../models/Worker.js'

function toApiJob(job) {
  return {
    id: job._id.toString(),
    title: job.title,
    description: job.description,
    skill: job.skill,
    wagePerDay: job.wagePerDay,
    location: job.location,
    city: job.city,
    workType: job.workType,
    workStartDate: job.workStartDate,
    workEndDate: job.workEndDate,
    requiredWorkers: job.requiredWorkers,
    hiredWorkers: job.hiredWorkers,
    status: job.status,
    employerName: job.employerName,
    applicantCount: job.applicants?.length || 0,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  }
}

function parsePositiveNumber(value, fallback) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }
  return parsed
}

const ALLOWED_SKILLS = new Set(['all', 'plumber', 'electrician', 'painter', 'mason', 'helper', 'carpenter', 'welder', 'labour'])
const ALLOWED_WORK_TYPES = new Set(['Daily', 'Weekly', 'Monthly', 'Project'])
const ALLOWED_STATUS = new Set(['Open', 'InProgress', 'Completed', 'Cancelled'])

export async function listJobs(req, res) {
  try {
    const page = Math.floor(parsePositiveNumber(req.query.page, 1))
    const limit = Math.min(Math.floor(parsePositiveNumber(req.query.limit, 10)), 50)
    const skill = String(req.query.skill || 'all').toLowerCase()
    const city = req.query.city ? String(req.query.city).toLowerCase() : null
    const status = req.query.status ? String(req.query.status) : 'Open'

    if (!ALLOWED_SKILLS.has(skill)) {
      return res.status(400).json({ message: 'Invalid skill filter' })
    }

    if (!ALLOWED_STATUS.has(status)) {
      return res.status(400).json({ message: 'Invalid status filter' })
    }

    const filter = { status }
    if (skill !== 'all') {
      filter.skill = skill
    }
    if (city) {
      filter.city = city
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean()

    const start = (page - 1) * limit
    const end = start + limit
    const paginated = jobs.slice(start, end)

    return res.json({
      jobs: paginated.map(toApiJob),
      pagination: {
        page,
        limit,
        total: jobs.length,
        hasNextPage: end < jobs.length,
      },
      filters: { skill, city, status },
    })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load jobs', error: error.message })
  }
}

export async function getJobDetail(req, res) {
  try {
    const job = await Job.findById(req.params.id).lean()

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    return res.json({
      job: toApiJob(job),
      applicants: job.applicants || [],
    })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load job', error: error.message })
  }
}

export async function createJob(req, res) {
  try {
    const { title, description, skill, wagePerDay, location, city, workType, workStartDate, requiredWorkers } = req.body

    if (!title || !description || !skill || !location || !city || !wagePerDay || !workStartDate) {
      return res.status(400).json({
        message: 'title, description, skill, location, city, wagePerDay, and workStartDate are required',
      })
    }

    if (!ALLOWED_SKILLS.has(String(skill).toLowerCase())) {
      return res.status(400).json({ message: 'Invalid skill value' })
    }

    if (workType && !ALLOWED_WORK_TYPES.has(workType)) {
      return res.status(400).json({ message: 'Invalid workType' })
    }

    const wage = Number(wagePerDay)
    if (!Number.isFinite(wage) || wage <= 0) {
      return res.status(400).json({ message: 'wagePerDay must be a positive number' })
    }

    const workers = Number(requiredWorkers || 1)
    if (!Number.isFinite(workers) || workers < 1) {
      return res.status(400).json({ message: 'requiredWorkers must be at least 1' })
    }

    const startDate = new Date(workStartDate)
    if (Number.isNaN(startDate.getTime())) {
      return res.status(400).json({ message: 'workStartDate must be a valid date' })
    }

    const job = await Job.create({
      title: String(title).trim(),
      description: String(description).trim(),
      skill: String(skill).toLowerCase(),
      wagePerDay: wage,
      location: String(location).trim(),
      city: String(city).toLowerCase().trim(),
      workType: workType || 'Daily',
      workStartDate: startDate,
      requiredWorkers: workers,
      employerEmail: req.auth.email,
      employerName: req.auth.name,
    })

    return res.status(201).json({ job: toApiJob(job) })
  } catch (error) {
    return res.status(500).json({ message: 'Could not create job', error: error.message })
  }
}

export async function applyJob(req, res) {
  try {
    const { jobId } = req.body

    if (!jobId) {
      return res.status(400).json({ message: 'jobId is required' })
    }

    const job = await Job.findById(jobId)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.status !== 'Open') {
      return res.status(400).json({ message: 'This job is no longer accepting applications' })
    }

    const alreadyApplied = job.applicants.some((app) => app.workerEmail === req.auth.email)
    if (alreadyApplied) {
      return res.status(409).json({ message: 'You have already applied for this job' })
    }

    job.applicants.push({
      workerEmail: req.auth.email,
      workerName: req.auth.name,
      appliedAt: new Date(),
      status: 'Applied',
    })

    await job.save()

    return res.json({ message: 'Application submitted', job: toApiJob(job) })
  } catch (error) {
    return res.status(500).json({ message: 'Could not apply to job', error: error.message })
  }
}

export async function getMyJobs(req, res) {
  try {
    const jobs = await Job.find({ employerEmail: req.auth.email }).sort({ createdAt: -1 }).lean()

    return res.json({
      jobs: jobs.map(toApiJob),
    })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load your jobs', error: error.message })
  }
}

export async function getMyApplications(req, res) {
  try {
    const jobs = await Job.find({ 'applicants.workerEmail': req.auth.email }).lean()

    const applications = []
    for (const job of jobs) {
      const applicant = job.applicants.find((app) => app.workerEmail === req.auth.email)
      if (applicant) {
        applications.push({
          jobId: job._id.toString(),
          jobTitle: job.title,
          employer: job.employerName,
          wage: job.wagePerDay,
          city: job.city,
          appliedAt: applicant.appliedAt,
          status: applicant.status,
        })
      }
    }

    return res.json({ applications })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load applications', error: error.message })
  }
}

export async function getPlatformStats(req, res) {
  try {
    const openJobs = await Job.countDocuments({ status: 'Open' })
    const totalApplicants = await Job.aggregate([
      {
        $group: {
          _id: null,
          totalApplicants: {
            $sum: {
              $size: '$applicants',
            },
          },
        },
      },
    ])

    const completedJobs = await Job.countDocuments({ status: 'Completed' })
    const activeCities = await Job.distinct('city')
    const activeWorkers = await Worker.countDocuments({ available: true })
    const verifiedEmployers = await User.countDocuments({ role: 'Employer' })

    return res.json({
      openJobs,
      totalApplicants: totalApplicants[0]?.totalApplicants || 0,
      completedJobs,
      activeCities: activeCities.length,
      activeWorkers,
      verifiedEmployers,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load stats', error: error.message })
  }
}
