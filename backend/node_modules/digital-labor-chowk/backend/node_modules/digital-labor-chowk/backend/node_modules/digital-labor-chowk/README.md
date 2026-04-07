# Digital Labor Chowk

Mobile-first MERN demo for daily wage workers and employers. Built for college presentation, but structured like a real product.

## What it does

- Worker can register/login and mark availability
- Employer can view nearby available workers
- Search/filter by skill
- Basic rating summary
- Local directory listings
- English-first UI with Hindi labels support
- Demo-ready register/login flow

## Folder Structure

### Frontend

- `frontend/src/components/` reusable UI components
- `frontend/src/pages/` page-level screens
- `frontend/src/services/` API/service layer placeholder
- `frontend/src/hooks/` custom hooks
- `frontend/src/context/` auth context

### Backend

- `backend/src/routes/` API routes
- `backend/src/config/` database connection logic
- `backend/src/controllers/` project structure placeholder
- `backend/src/models/` project structure placeholder
- `backend/src/middleware/` project structure placeholder
- `backend/src/utils/` helpers
- `backend/src/data/` demo seed data

## Frontend Pages

- Home
- Login
- Register
- Workers dashboard
- Employers dashboard
- Directory
- About

## Core Features

### Authentication

- Login and signup screens
- Role selection: Worker / Employer
- Demo-first auth with persistent local state for presentation

### Worker Dashboard

- Large availability button
- 12-hour active status
- Location-aware search flow

### Employer Dashboard

- Nearby worker list
- Skill filtering: plumber, electrician, painter, mason, helper

### Rating System

- Simple 1–5 star trust summary

### UI

- Mobile-first layout
- Large buttons and cards
- Minimal text + icons
- Loader and empty states

## Backend API

- `GET /api/health`
- `GET /api/workers?radius=5&skill=plumber`
- `PATCH /api/workers/:id/availability`
- `GET /api/directory`
- `GET /api/ratings/summary`
- `POST /api/ratings`

## Local Setup

### 1. Install dependencies

```bash
npm install --prefix frontend
npm install --prefix backend
```

### 2. Run backend

```bash
npm run dev:backend
```

### 3. Run frontend

```bash
npm run dev:frontend
```

Frontend: http://localhost:5173

Backend: http://localhost:5000

## Demo Login

- Worker: worker@dlc.com / 123456
- Employer: employer@dlc.com / 123456

You can also create a new account from the Register page.

## Docker

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- Backend: http://localhost:5000

## Deployment

### Backend on Render or Railway

1. Push repo to GitHub
2. Create backend service
3. Set environment variables from `backend/.env.example`
4. Use the backend start command

### Frontend on Vercel or Netlify

1. Import the `frontend` folder
2. Set `VITE_API_BASE_URL` to deployed backend URL
3. Deploy as SPA

### Database on MongoDB Atlas

1. Create cluster
2. Add database user and IP allowlist
3. Paste connection string into `MONGODB_URI`

## College Demo Script

Use this flow while presenting:

1. Open Home page and explain the problem statement.
2. Show Login / Register.
3. Register a new account or use demo credentials.
4. Open Workers page and show availability toggle.
5. Open Employers page and show nearby worker filtering.
6. Open Directory and Ratings sections.
7. Mention deployment support and MongoDB Atlas readiness.

## Notes

- The app is intentionally simple and demo-friendly.
- The current backend uses seed data so it works without MongoDB too.
- If MongoDB Atlas is configured, you can extend it to store real records.
