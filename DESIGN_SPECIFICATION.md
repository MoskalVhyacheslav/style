# Style DNA MVP — Design Specification

## 1. Project Structure

```
style-dna-mvp/
├── frontend/                    # Next.js 14 (App Router)
│   ├── app/
│   │   ├── (auth)/             # Auth routes
│   │   ├── (onboarding)/       # Onboarding & quiz
│   │   ├── results/            # Style results
│   │   ├── profile/            # User profile
│   │   └── api/                # API route handlers (proxy to backend)
│   ├── components/
│   ├── lib/
│   └── public/
├── backend/                     # Express.js REST API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   │   ├── style-engine.js  # Rule-based style matching
│   │   │   └── moodboard.js     # Unsplash integration
│   │   ├── middleware/
│   │   └── models/
│   └── config/
├── shared/                      # Shared types & constants
│   └── style-definitions.js    # Style categories, quiz options
└── DESIGN_SPECIFICATION.md
```

---

## 2. Main UI Components

| Component | Purpose |
|-----------|---------|
| `WelcomeScreen` | Hero with CTA, value proposition |
| `AuthForm` | Email/password + Google OAuth |
| `ProfileForm` | Name, age, height, weight, body type |
| `QuizProgressBar` | Linear progress indicator |
| `QuizStep` | Single quiz question with options |
| `LoadingAnimation` | Style generation animation |
| `StyleProfileCard` | Style name + description |
| `OutfitMoodboard` | Grid of outfit images |
| `ResultsDashboard` | Full results layout |
| `ActionBar` | Save, Share, Download PDF buttons |

---

## 3. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register with email/password |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/google` | Google OAuth callback |
| GET | `/api/users/me` | Get current user profile |
| PUT | `/api/users/me` | Update user profile |
| POST | `/api/quiz/submit` | Submit quiz answers |
| GET | `/api/results/:userId` | Get user's style results |
| POST | `/api/results/save` | Save results |
| GET | `/api/moodboard` | Fetch outfit images (Unsplash) |
| POST | `/api/export/pdf` | Generate PDF of results |

---

## 4. Style-Matching Logic (Rule-Based)

### Style Categories (Predefined)

| Style ID | Name | Description | Quiz Triggers |
|----------|------|-------------|---------------|
| `minimal_scandinavian` | Minimal Scandinavian | Clean lines, neutral palette, understated elegance | minimal, casual, office, medium budget |
| `smart_casual` | Smart Casual | Polished yet relaxed | smart, office, freelance, medium/high budget |
| `street_urban` | Street Urban | Bold, trend-driven, sneaker culture | street, creative, student, low/medium budget |
| `classic_traditional` | Classic Traditional | Timeless, tailored, heritage | classic, office, high budget |
| `creative_eclectic` | Creative Eclectic | Mix of patterns, bold colors | creative styles, freelance, creative dress code |
| `relaxed_modern` | Relaxed Modern | Comfortable, contemporary basics | casual, minimal, student, low budget |

### Matching Algorithm

1. **Score each style** based on user answers (preferred styles, lifestyle, budget, brands)
2. **Weights**: preferred_styles=40%, lifestyle=30%, budget=20%, brands=10%
3. **Select top match** or hybrid if scores are close
4. **Generate outfit keywords** from style + body type for Unsplash search

---

## 5. Example JSON Response (Style Results)

```json
{
  "userId": "usr_abc123",
  "styleProfile": {
    "id": "smart_casual",
    "name": "Smart Casual",
    "description": "Polished yet relaxed. Your wardrobe balances refinement with comfort—think tailored chinos, quality knitwear, and versatile blazers. Perfect for professionals who value both style and ease.",
    "keywords": ["smart casual menswear", "tailored casual outfit", "business casual"]
  },
  "outfits": [
    {
      "id": "outfit_1",
      "title": "Weekend Brunch",
      "images": [
        {
          "url": "https://images.unsplash.com/...",
          "alt": "Navy blazer with white tee"
        },
        {
          "url": "https://images.unsplash.com/...",
          "alt": "Chinos and loafers"
        }
      ]
    },
    {
      "id": "outfit_2",
      "title": "Office Ready",
      "images": [
        {
          "url": "https://images.unsplash.com/...",
          "alt": "Oxford shirt and chinos"
        }
      ]
    }
  ],
  "generatedAt": "2025-02-01T12:00:00Z"
}
```

---

## 6. Results Page UI Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (logo, profile icon)                                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  YOUR STYLE PROFILE                                  │    │
│  │  ┌───────────────────────────────────────────────┐  │    │
│  │  │  "Smart Casual"                                │  │    │
│  │  │  Polished yet relaxed. Your wardrobe...        │  │    │
│  │  └───────────────────────────────────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  [Save]  [Share]  [Download PDF]                     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  OUTFIT MOODBOARDS                                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │ Outfit 1│ │ Outfit 2│ │ Outfit 3│ │ Outfit 4│ │ Outfit 5││
│  │  [img]  │ │  [img]  │ │  [img]  │ │  [img]  │ │  [img]  ││
│  │  [img]  │ │  [img]  │ │  [img]  │ │  [img]  │ │  [img]  ││
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Database Schema (MongoDB)

### User
```javascript
{
  _id, email, passwordHash, googleId,
  name, age, height, weight, bodyType,
  createdAt, updatedAt
}
```

### QuizAnswer
```javascript
{
  _id, userId,
  preferredStyles: [], lifestyle: [], favoriteBrands: [], budget: "",
  submittedAt
}
```

### StyleResult
```javascript
{
  _id, userId, quizAnswerId,
  styleProfile: { id, name, description, keywords },
  outfits: [{ id, title, images: [{ url, alt }] }],
  saved: Boolean,
  shareToken: String,
  createdAt
}
```

---

## 8. Tech Stack Summary

- **Frontend**: Next.js 14, React 18, Tailwind CSS, NextAuth.js
- **Backend**: Express.js, MongoDB (Mongoose), JWT
- **External**: Unsplash API, jsPDF (PDF generation)
- **Deploy**: Vercel (frontend), Railway/Render (backend)
