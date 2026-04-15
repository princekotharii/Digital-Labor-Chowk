# Digital Labor Chowk - Real-World Production Workflow

This document explains how the project works in real life, how workers are helped, and how to explain it clearly in a viva.

## 1. Problem We Solve

Daily wage workers lose earning opportunities because:
- Employers cannot quickly discover verified nearby workers.
- Worker availability is not updated in real time.
- There is low trust in punctuality, payment, and behavior.

Digital Labor Chowk solves this with a simple platform where workers can mark availability and employers can discover suitable workers by skill and radius.

## 2. End-to-End System Workflow

1. Worker registers with `name + email + password + role`.
2. Backend creates:
- User account (`User` model).
- Worker profile (`Worker` model) linked by `userEmail`.
3. Worker logs in and receives JWT token.
4. Frontend stores token and sends it in `Authorization: Bearer <token>` for protected APIs.
5. Worker opens dashboard and toggles availability.
6. Backend stores availability window (`availableUntil` for 12 hours).
7. Employer searches workers by `radius + skill`.
8. Backend returns available workers sorted by rating with pagination metadata.
9. Employer can rate experience after work.
10. Rating summary improves trust score visibility for future hiring.

## 3. Production-Ready Backend APIs

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (JWT protected)

### Workers
- `GET /api/workers?radius=5&skill=plumber&page=1&limit=10`
- `GET /api/workers/me` (Worker JWT required)
- `PATCH /api/workers/me/availability` (Worker JWT required)
- `PATCH /api/workers/:id/availability` (backward compatibility)

### Directory and Ratings
- `GET /api/directory`
- `GET /api/ratings/summary`
- `POST /api/ratings`

### Health
- `GET /api/health`

## 4. Real-World Worker Impact

How worker is helped:

1. Visibility increase:
- Worker can be discovered by nearby employers when available.

2. Faster hiring:
- Employer filter by skill and distance reduces wait time.

3. Trust and repeat opportunities:
- Ratings create transparent reputation.

4. Daily control:
- Worker controls whether they are visible today.

5. Local ecosystem support:
- Directory helps workers access nearby tools and rentals quickly.

## 5. Production Design Choices (Explain to Sir)

1. JWT-based authentication:
- Stateless, scalable for mobile + web clients.

2. Role-based access control:
- Worker-only endpoints are protected via middleware (`requireAuth`, `requireRole`).

3. Input validation:
- Auth, worker filters, and rating values are validated to avoid bad data.

4. Pagination support:
- Worker listing includes paging metadata for large datasets.

5. Backward compatibility:
- Existing legacy flows still work while newer protected endpoints are added.

6. Fail-safe startup:
- App can run with fallback data if MongoDB is unavailable, and full mode when DB is configured.

## 6. Request Flow Example

### Worker Availability Update

1. Frontend calls `PATCH /api/workers/me/availability` with `{ "available": true }`.
2. Backend validates JWT.
3. Backend finds worker profile by `userEmail`.
4. Backend updates `available = true`, sets `availableUntil = now + 12h`.
5. Frontend gets updated worker object and shows success.

### Employer Search Flow

1. Frontend calls `GET /api/workers?radius=5&skill=plumber&page=1&limit=10`.
2. Backend validates filters.
3. Backend filters `available workers` + `distance <= radius` + `skill`.
4. Backend returns worker list + pagination object.

## 7. Frontend-Backend Integration (What to Say in Presentation)

"Frontend directly calls backend APIs. It is not static data UI."

- Login/Register screen calls backend auth endpoints.
- Workers page calls protected worker endpoints.
- Employers page fetches workers from backend with filters.
- Directory page fetches listings from backend.
- Trust panel fetches rating summary from backend.

## 8. Viva Q&A Quick Answers

Q: How does this help workers in real life?
A: It increases daily job visibility, reduces idle waiting, improves trust via ratings, and allows workers to control availability in one tap.

Q: How do you ensure secure access?
A: JWT authentication, role checks in middleware, and protected worker-specific APIs.

Q: Can this scale?
A: Yes. Pagination, stateless auth, model-based architecture, and route separation are already in place. We can add Redis caching and queue-based notifications as next phase.

Q: Is this only for a presentation?
A: It is presentation-friendly but designed with production patterns, so it can be extended to city-scale deployment.

## 9. Suggested Next Production Upgrades

1. Real geolocation coordinates + map service integration.
2. OTP phone authentication for low-digital-literacy workers.
3. WhatsApp/SMS job alerts.
4. Admin moderation panel.
5. Audit logging + rate limiting + refresh token rotation.
6. CI/CD pipelines, staging environment, and automated tests.
