import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Worker from '../models/Worker.js'

function normalizeRole(role) {
  if (role === 'Worker' || role === 'worker') {
    return 'Worker'
  }

  if (role === 'Employer' || role === 'employer') {
    return 'Employer'
  }

  return null
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET || 'digital-labor-chowk-secret',
    { expiresIn: '7d' },
  )
}

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'name, email, password and role are required' })
    }

    const normalizedRole = normalizeRole(role)
    if (!normalizedRole) {
      return res.status(400).json({ message: 'role must be Worker or Employer' })
    }

    if (String(name).trim().length < 2) {
      return res.status(400).json({ message: 'name must be at least 2 characters long' })
    }

    if (String(password).length < 6) {
      return res.status(400).json({ message: 'password must be at least 6 characters long' })
    }

    const normalizedEmail = String(email).toLowerCase().trim()
    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ message: 'Please provide a valid email address' })
    }

    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return res.status(409).json({ message: 'Account already exists with this email.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: normalizedRole,
    })

    if (normalizedRole === 'Worker') {
      const existingWorkerProfile = await Worker.findOne({ userEmail: normalizedEmail })

      if (!existingWorkerProfile) {
        const nextCode = `w${Date.now().toString().slice(-6)}`

        await Worker.create({
          code: nextCode,
          userEmail: normalizedEmail,
          name: String(name).trim(),
          skill: 'helper',
          chowk: 'Unassigned Chowk',
          distance: 0,
          rating: 0,
          available: false,
          availableUntil: null,
        })
      }
    }

    const token = signToken(user)
    return res.status(201).json({ user: sanitizeUser(user), token })
  } catch (error) {
    return res.status(500).json({ message: 'Could not register user', error: error.message })
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' })
    }

    const normalizedEmail = String(email).toLowerCase().trim()
    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ message: 'Please provide a valid email address' })
    }

    const user = await User.findOne({ email: normalizedEmail })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = signToken(user)
    return res.json({ user: sanitizeUser(user), token })
  } catch (error) {
    return res.status(500).json({ message: 'Could not login user', error: error.message })
  }
}

export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.auth.userId).lean()

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.json({ user: sanitizeUser(user) })
  } catch (error) {
    return res.status(500).json({ message: 'Could not load current user', error: error.message })
  }
}
