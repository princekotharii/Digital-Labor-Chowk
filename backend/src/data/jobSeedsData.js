import bcrypt from 'bcryptjs'
import Job from '../models/Job.js'

export const seedJobs = [
  {
    title: 'Labour (Helper) Required for Site Work',
    description: 'Need 2-3 general labourers for construction site work. Daily tasks include material movement and basic site assistance.',
    skill: 'helper',
    wagePerDay: 700,
    location: 'NH-58 Industrial Area',
    city: 'haridwar',
    workType: 'Daily',
    workStartDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    requiredWorkers: 3,
    employerName: 'Rajesh Constructions',
    status: 'Open',
  },
  {
    title: 'Mason Required for Residential Construction',
    description: 'Experienced mason needed for brick laying and concrete work. 30 days project in residential complex.',
    skill: 'mason',
    wagePerDay: 900,
    location: 'Jwalapur Main Road',
    city: 'haridwar',
    workType: 'Project',
    workStartDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    requiredWorkers: 1,
    employerName: 'Urban Developers Ltd',
    status: 'Open',
  },
  {
    title: 'Electrician Needed for Wiring Project',
    description: 'Qualified electrician for internal wiring and electrical installation in commercial building. 2-week project.',
    skill: 'electrician',
    wagePerDay: 1000,
    location: 'BHEL Sector 2',
    city: 'haridwar',
    workType: 'Project',
    workStartDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    requiredWorkers: 1,
    employerName: 'TechSpaces Solutions',
    status: 'Open',
  },
  {
    title: 'Plumber for Water Pipeline Installation',
    description: 'Skilled plumber for cold and hot water pipeline installation. Immediate requirement.',
    skill: 'plumber',
    wagePerDay: 850,
    location: 'Ranipur More',
    city: 'haridwar',
    workType: 'Daily',
    workStartDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    requiredWorkers: 1,
    employerName: 'Home Builders',
    status: 'Open',
  },
  {
    title: 'Painter Required for Interior Painting',
    description: 'Need experienced painter for interior wall and ceiling painting in residential apartments.',
    skill: 'painter',
    wagePerDay: 600,
    location: 'Railway Station Road',
    city: 'haridwar',
    workType: 'Daily',
    workStartDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    requiredWorkers: 2,
    employerName: 'Paint & Finish Co',
    status: 'Open',
  },
]

export async function seedJobs_db() {
  const jobCount = await Job.countDocuments()

  if (!jobCount) {
    const jobsWithEmails = seedJobs.map((job) => ({
      ...job,
      employerEmail: 'employer@dlc.com',
    }))

    await Job.insertMany(jobsWithEmails)
  }
}
