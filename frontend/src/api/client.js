const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

function getAuthToken() {
  return localStorage.getItem('dlc-auth-token')
}

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const errorText = await response.text()
    try {
      const parsed = JSON.parse(errorText)
      throw new Error(parsed.message || 'Request failed')
    } catch {
      throw new Error(errorText || 'Request failed')
    }
  }

  return response.json()
}

export function loginUser(payload) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function registerUser(payload) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getCurrentUser() {
  return request('/auth/me')
}

export function getWorkers({ radius = 5, skill = 'all' } = {}) {
  const query = new URLSearchParams({ radius: String(radius), skill })
  return request(`/workers?${query.toString()}`)
}

export function getMyWorkerProfile() {
  return request('/workers/me')
}

export function updateMyAvailability(available) {
  return request('/workers/me/availability', {
    method: 'PATCH',
    body: JSON.stringify({ available }),
  })
}

export function updateAvailability(id, available) {
  return request(`/workers/${id}/availability`, {
    method: 'PATCH',
    body: JSON.stringify({ available }),
  })
}

export function getDirectory() {
  return request('/directory')
}

export function getTrustSummary() {
  return request('/ratings/summary')
}
