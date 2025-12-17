# Habit Tracker

A full-stack habit tracker with gamification features. This project helps users build and track their habits, earn points, and visualize their progress. Built with React, Node.js, PostgreSQL, and JWT-based authentication.

---

## Deployed URLs

- 🚀 **Frontend:** [https://habit-tracker-fawn-omega.vercel.app](https://habit-tracker-fawn-omega.vercel.app)
- 🚀 **Backend:** [https://habit-tracker-nyif.onrender.com/](https://habit-tracker-nyif.onrender.com/) (it may take a few minutes for the service to wake up)

---

## API Documentation

The backend provides interactive API documentation using **Swagger**. You can explore and test all available endpoints directly in your browser:

- [https://habit-tracker-nyif.onrender.com/api-docs](https://habit-tracker-nyif.onrender.com/api-docs)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [API & Authentication](#api--authentication)
- [Deployment Notes](#deployment-notes)
- [User Stories](#user-stories)

---

## Features

- User registration and login
- Create, update, complete, and delete habits
- Set goal dates and mark habits as achieved
- Earn XP points for completing habits and maintaining streaks
- Gamification: achievements, badges, rewards
- Notifications and reminders (email and/or push)
- Progress visualization and reports (stretch goal)
- AI integration (stretch goal)

---

## Tech Stack

- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token), httpOnly cookies
- **Other:** Vercel (frontend hosting), Render (backend hosting)

---

## Environment Variables

| Name                     | Description                       | Example Value               | Required | Notes                                                        |
| ------------------------ | --------------------------------- | --------------------------- | -------- | ------------------------------------------------------------ |
| `PORT`                   | Port for backend server           | `5000`                      | Yes      | Backend only                                                 |
| `PGHOST`                 | PostgreSQL server host            | `localhost`                 | Yes      | Backend only                                                 |
| `PGDATABASE`             | PostgreSQL database name          | `habitdb`                   | Yes      | Backend only                                                 |
| `PGUSER`                 | PostgreSQL user                   | `postgres`                  | Yes      | Backend only                                                 |
| `PGPASSWORD`             | PostgreSQL user password          | `yourpassword`              | Yes      | Backend only                                                 |
| `JWT_SECRET_KEY`         | Secret key for signing JWT tokens | `your_jwt_secret`           | Yes      | Backend only                                                 |
| `BASE_URL`               | Deployed url for backend service  | `https://habit-tracker.com` | Yes      | Backend only                                                 |
| `OPENAI_API_KEY`         | OpenAI API Key                    | `your_openai_apikey`        | Yes      | Backend only                                                 |
| `REACT_APP_API_BASE_URL` | Backend API base URL for frontend | `http://localhost:5000`     | No       | Frontend only. Optional for local run; defaults to localhost |

**Notes:**

- `REACT_APP_API_BASE_URL` is only needed if your backend is not running on `http://localhost:5000` during local development. For production, set it to your deployed backend URL.
- You may add other environment variables as needed for email, third-party integrations, etc.
- You can use either `DATABASE_URL` or the individual `PGHOST`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` variables for PostgreSQL connection.

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL

### Backend Setup

1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file (see `.env.example` if available):
   - `PORT=5000`
   - `JWT_SECRET_KEY=your_jwt_secret`
   - ...
4. Run database migrations (if any):
   ```bash
   # Example using a migration tool or psql
   # psql -U user -d dbname -f src/db/migrations/create_user_habit_tables.sql
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your backend API URL (optional for local run):
   ```env
   REACT_APP_API_BASE_URL=https://your-backend-url.com
   ```
4. Start the frontend:
   ```bash
   npm start
   ```

---

## API & Authentication

- The backend issues a JWT token as an **httpOnly, secure cookie** (`authToken`) after login/signup.
- The frontend does **not** store the token in localStorage/sessionStorage; it relies on the cookie for authentication.
- All API requests requiring authentication must be sent with `withCredentials: true`.
- The backend sets cookies with:
  - `httpOnly: true`
  - `secure: true` (requires HTTPS)
  - `sameSite: "None"` (for cross-site cookies)
- When logging out, the backend clears the cookie with the same options.

---

## Deployment Notes

- **CORS:** The backend only allows requests from specific origins (see `allowedOrigins` in backend `index.ts`). Update this list to match your deployed frontend URL exactly (including protocol and subdomain).
- **HTTPS:** Both frontend and backend must be served over HTTPS for cookies to work with `secure: true` and `sameSite: "None"`.
- **Frontend Hosting:** Vercel, Netlify, or similar
- **Backend Hosting:** Render, Heroku, Railway, or similar

---

## User Stories

- **User Auth and Profiles**
  - Sign up, login, manage profile (name, email)
- **Habit Management**
  - Create, complete, update, delete habits
- **Notification and Reminders**
  - Email or push notification/reminder
- **Gamification**
  - Create achievement and badges, earn XP points and reward

## ☁️ AWS Migration

This application is being migrated to AWS serverless architecture!

**AWS Infrastructure Repository:** [habit-tracker-aws](https://github.com/ctheara/habit-tracker-aws)

The AWS version includes:

- Serverless backend with Lambda + API Gateway
- Frontend hosted on S3 + CloudFront
- Infrastructure as Code with CloudFormation
- CI/CD pipeline with CodePipeline
