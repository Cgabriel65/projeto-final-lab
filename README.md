# [App Name] — Collaborative Writing Platform

A minimalist platform for writers to share short stories, poems, and chronicles, and receive feedback from the community. The focus is on writing and reading, without distractions.

**ODS 4 — Quality Education**: This project contributes to SDG 4 by providing an open platform for literary expression and peer feedback, fostering reading habits, creative writing skills, and constructive community engagement.

---

##  Production URL

- **Backend API:** https://backend-projeto-lab.onrender.com
- **Frontend:** Coming soon

---

##  Tech Stack

| Layer | Technology | Hosting |
|---|---|---|
| Frontend | Angular 21+ with TypeScript | Vercel (coming soon) |
| Backend | Node.js 24+ with Express | Render.com |
| Database | Supabase (PostgreSQL) | Supabase Cloud |
| Auth | Supabase Auth (JWT) | Supabase Cloud |
| Repository | Git + GitHub | GitHub |
| CI/CD | GitHub Actions | GitHub Actions |

---

##  Running Locally

### Prerequisites
- Node.js 24+
- npm

### Backend

```bash
# Clone the repository
git clone https://github.com/Cgabriel65/projeto-final-lab.git
cd projeto-final-lab/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Fill in your values in .env

# Run in development mode
npm run dev

# Or build and run
npm run build
npm start
```

### Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## Environment Variables

Create a `.env` file in the `backend` folder based on `.env.example`:

```env
SUPABASE_URL=
SUPABASE_SERVICE_KEY=
PORT=3000
```


---

## API Endpoints

Base URL: `https://backend-projeto-lab.onrender.com`

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login | No |

### Texts
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/texts` | List all texts (newest first) | No |
| POST | `/texts` | Create a new text | Yes |
| GET | `/texts/:id` | Get text detail | No |
| PUT | `/texts/:id` | Update a text | Yes |
| DELETE | `/texts/:id` | Delete a text | Yes |

### Comments
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/texts/:id/comments` | List comments for a text | No |
| POST | `/texts/:id/comments` | Add a comment to a text | Yes |

### Authors
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/authors/:id` | Get author profile with their texts | No |

---

##  Implemented Features

- User registration and login with email and password (Supabase Auth)
- Full CRUD for texts (create, list, detail, edit, delete)
- Comment system per text
- Author profile with all published texts
- Row Level Security (RLS) policies on all tables
- CI/CD pipeline with GitHub Actions (lint + build + deploy)

---

##  Database Schema

```sql
profiles (id, username, bio, created_at)
texts    (id, title, body, genre, author_id, created_at, updated_at)
comments (id, body, author_id, text_id, created_at)
```

---

##  Design Decision



---

## Screenshots


---

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- ✅ Lint (backend + frontend)
- ✅ Build (backend + frontend)
- ✅ Auto-deploy to Render on push to `main`

![CI/CD Badge](https://github.com/Cgabriel65/projeto-final-lab/actions/workflows/ci-cd.yml/badge.svg)
