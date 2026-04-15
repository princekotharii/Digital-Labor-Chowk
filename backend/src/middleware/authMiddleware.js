import jwt from 'jsonwebtoken'

function readBearerToken(authHeader) {
  if (!authHeader || typeof authHeader !== 'string') {
    return null
  }

  const [scheme, token] = authHeader.split(' ')
  if (scheme !== 'Bearer' || !token) {
    return null
  }

  return token
}

export function requireAuth(req, res, next) {
  const token = readBearerToken(req.headers.authorization)
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'digital-labor-chowk-secret')
    req.auth = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    }
    return next()
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.auth) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({ message: 'You do not have permission to access this resource' })
    }

    return next()
  }
}
