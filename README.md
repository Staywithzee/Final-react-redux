# Lumière Hotel

A luxury hotel booking SPA built with React + Redux Toolkit.

## Team Members
- [Ratchanon Katsakoon]
- [Photsawee Tantiwattanachaikul]

## Live URL
[https://lumiere-hotel.vercel.app](https://lumiere-hotel.vercel.app)

## Features
- Browse luxury rooms with real-time search & filter
- Full room CRUD via Admin panel
- Booking flow with date selection and price calculation
- Dining & Gallery pages with lightbox
- Loading skeletons + error handling on all async operations

## Tech Stack
React 18 · Redux Toolkit · RTK Query · React Router v6 · CSS Modules · Vite · Vercel

## Local Setup
```bash
git clone <repo-url>
cd lumiere-hotel
npm install
cp .env.example .env
# Edit .env and add your mockapi.io URL
npm run dev
```

## API
mockapi.io — resource: `/rooms` — base URL stored in `VITE_API_URL` (`.env`)

## Project Structure
```
src/
├── app/store.js                    # Redux store (configureStore)
├── features/
│   ├── rooms/                      # RTK Query API + selectors + pages
│   ├── booking/                    # Booking slice + selectors + page
│   ├── admin/                      # Admin CRUD pages
│   └── ui/                         # UI slice (search, filter, notifications)
├── components/                     # Shared components (Navbar, RoomCard, etc.)
├── pages/                          # Static pages (Home, Dining, Gallery, 404)
└── hooks/useDebounce.js
```

## Academic Rubric Coverage
| Criterion | Points | Coverage |
|-----------|--------|----------|
| Project Setup & Architecture | 10 | Feature-folder structure, store.js, .env |
| UI & React Components | 15 | Functional components, CSS Modules, conditional rendering |
| React Router & Navigation | 10 | 10 routes, useParams, Link/NavLink, 404 page |
| State Management | 25 | bookingSlice + uiSlice + RTK Query |
| Data Fetching & API | 20 | RTK Query CRUD, loading skeletons, error messages |
| Forms & User Interaction | 10 | Controlled form, validation, inline errors |
| Deployment | 10 | Vercel + env vars |
| **BONUS RTK Query** | +3 | createApi with providesTags/invalidatesTags |
| **BONUS createSelector** | +3 | selectFilteredRooms, selectTotalNights, selectTotalPrice |
