# Style DNA MVP

A personal style recommendation platform that helps users define their clothing style and receive visual outfit recommendations.

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGODB_URI, JWT_SECRET
npm run dev
```

Backend runs on **http://localhost:4000**

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local: set NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev
```

Frontend runs on **http://localhost:3000**

### 3. Optional: Unsplash API

For live outfit images, get a free key at [Unsplash Developers](https://unsplash.com/developers) and add to backend `.env`:

```
UNSPLASH_ACCESS_KEY=your-key
```

Without it, the app uses demo image placeholders.

---

## User Flow

1. **Welcome** → Intro to the service
2. **Auth** → Sign up / Login (email + password)
3. **Profile setup** → Name, age, height, weight, body type
4. **Style quiz** → Preferred styles, lifestyle, budget
5. **Results** → Personal style name, description, 5–10 outfit moodboards
6. **Actions** → Save, Share link, Download PDF

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/users/me` | Get profile (auth) |
| PUT | `/api/users/me` | Update profile (auth) |
| POST | `/api/quiz/submit` | Submit quiz (auth) |
| GET | `/api/results` | Get results (auth) |
| GET | `/api/results/share/:token` | Get results by share token |
| POST | `/api/results/save` | Save results (auth) |

---

## Project Structure

```
style-dna-mvp/
├── frontend/          # Next.js 14 + Tailwind
├── backend/           # Express + MongoDB
├── shared/            # Style definitions & matching logic
├── DESIGN_SPECIFICATION.md
└── README.md
```

---

## MVP Acceptance Criteria

- [x] User can register
- [x] User can complete the full quiz
- [x] Personal style generated (name + description)
- [x] 5+ visual outfit recommendations
- [x] User can save results
- [x] Responsive (mobile + desktop)
