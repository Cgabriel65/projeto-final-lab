# BONFIRE — Collaborative Writing Platform

A minimalist platform for writers to share short stories, poems, and chronicles, and receive feedback from the community. The focus is on writing and reading, without distractions.

**ODS 4 — Quality Education**: This project contributes to SDG 4 by providing an open platform for literary expression and peer feedback, fostering reading habits, creative writing skills, and constructive community engagement.

---

##  Production URL

- **Frontend:** https://bonfire-1n8zkw7kc-cgabriel65s-projects.vercel.app
- **Backend API:** https://backend-projeto-lab.onrender.com

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

### Likes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/texts/:id/likes` | Get like count for a text | No |
| GET | `/texts/:id/likes/:userId` | Check if user liked a text | No |
| POST | `/texts/:id/likes` | Like a text | Yes |
| DELETE | `/texts/:id/likes` | Unlike a text | Yes |

### Authors
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/authors/:id` | Get author profile with their texts | No |

### Profile
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/profile/:id` | Get own profile | Yes |
| PUT | `/profile/:id` | Update username and bio | Yes |
| GET | `/profile/:id/liked-texts` | Get texts liked by user | Yes |

---

##  Implemented Features

- User registration and login with email and password (Supabase Auth)
- Full CRUD for texts (create, list, detail, edit, delete)
- Filter texts by genre (Short Story, Poem, Column, Other)
- Like/unlike system for texts
- Comment system per text
- Public author profile with all published texts
- Personal profile page with bio editing and liked texts
- Row Level Security (RLS) policies on all tables
- CI/CD pipeline with GitHub Actions (lint + build + test + deploy)
- 3 unit tests passing

---

##  Database Schema

```sql
profiles (id, username, bio, created_at)
texts    (id, title, body, genre, author_id, created_at, updated_at)
comments (id, body, author_id, text_id, created_at)
likes    (id, user_id, text_id, created_at)
```

---

##  Design Decision

**Reusable TextForm component**: Instead of creating separate components for creating and editing texts, a single `TextForm` component handles both cases. When a `textId` is present in the route, it switches to edit mode — loading existing data and calling `PUT`. Otherwise it renders an empty form and calls `POST`. This reduces code duplication and is easier to maintain.


---

## Screenshots


---

## CI/CD

This project uses GitHub Actions for continuous integration and deployment:

- ✅ `build-and-lint` — runs on every push to `development` and `main`: lint, build and unit tests for both backend and frontend
- ✅ `deploy` — runs only on `main` after `build-and-lint` passes: deploys backend to Render and frontend to Vercel


![CI/CD Badge](https://github.com/Cgabriel65/projeto-final-lab/actions/workflows/ci-cd.yml/badge.svg)
