import bcrypt from 'bcryptjs'
import DirectoryEntry from '../models/DirectoryEntry.js'
import Job from '../models/Job.js'
import Rating from '../models/Rating.js'
import User from '../models/User.js'
import Worker from '../models/Worker.js'
import { seedJobs } from '../data/jobSeedsData.js'

const seedUsers = [
  { name: 'Rajesh Kumar', email: 'worker@dlc.com', password: '123456', role: 'Worker' },
  { name: 'Sharma Constructions', email: 'employer@dlc.com', password: '123456', role: 'Employer' },
]

const seedWorkers = [
  { code: 'w1', userEmail: 'worker@dlc.com', name: 'राजेश', skill: 'plumber', chowk: 'Ranipur Chowk', distance: 1.2, rating: 4.6, available: true },
  { code: 'w2', name: 'सलीम', skill: 'electrician', chowk: 'BHEL Tiraha', distance: 3.8, rating: 4.4, available: true },
  { code: 'w3', name: 'मुकेश', skill: 'mason', chowk: 'Jwalapur Adda', distance: 5, rating: 4.2, available: true },
  { code: 'w4', name: 'अमित', skill: 'helper', chowk: 'Railway Gate Point', distance: 2.4, rating: 4.1, available: true },
  { code: 'w5', name: 'सुरेश', skill: 'painter', chowk: 'Har Ki Pauri Road', distance: 6.2, rating: 4.8, available: false },
]

const seedDirectory = [
  { name: 'Haridwar Tools Hub', type: 'Hardware Shop', icon: '🏪', area: 'Ranipur More', contact: '+91 98990 11882' },
  { name: 'Shakti Equipment Rental', type: 'Rental Service', icon: '🚜', area: 'Jwalapur', contact: '+91 97555 42010' },
  { name: 'Ganga Paint & Pipe Store', type: 'Hardware Shop', icon: '🛒', area: 'BHEL Sector 2', contact: '+91 98100 11029' },
]

const seedRatings = [
  { workerCode: 'w1', punctuality: 5, skillQuality: 4, paymentBehavior: 5, mutualRespect: 5 },
  { workerCode: 'w2', punctuality: 4, skillQuality: 4, paymentBehavior: 4, mutualRespect: 5 },
  { workerCode: 'w3', punctuality: 4, skillQuality: 5, paymentBehavior: 4, mutualRespect: 4 },
]

const seedEmployerEmail = 'employer@dlc.com'

export async function seedDatabase() {
  const [userCount, workerCount, directoryCount, ratingCount, jobCount] = await Promise.all([
    User.countDocuments(),
    Worker.countDocuments(),
    DirectoryEntry.countDocuments(),
    Rating.countDocuments(),
    Job.countDocuments(),
  ])

  if (!userCount) {
    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
    )
    await User.insertMany(hashedUsers)
  }

  if (!workerCount) {
    await Worker.insertMany(seedWorkers)
  }

  // Backward-compatible migration for older seeded databases.
  await Worker.updateOne(
    { code: 'w1', $or: [{ userEmail: { $exists: false } }, { userEmail: null }, { userEmail: '' }] },
    { $set: { userEmail: 'worker@dlc.com' } },
  )

  if (!directoryCount) {
    await DirectoryEntry.insertMany(seedDirectory)
  }

  if (!ratingCount) {
    await Rating.insertMany(seedRatings)
  }

  const jobsWithEmails = seedJobs.map((job) => ({
    ...job,
    employerEmail: seedEmployerEmail,
  }))

  if (!jobCount) {
    await Job.insertMany(jobsWithEmails)
    return
  }

  const existingSeedTitles = seedJobs.map((job) => job.title)
  await Job.deleteMany({
    employerEmail: seedEmployerEmail,
    title: { $in: existingSeedTitles },
  })

  await Job.insertMany(jobsWithEmails)
}
