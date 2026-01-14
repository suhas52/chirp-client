# Chirp

Chirp is a full-stack social media frontend built with React and TypeScript. It allows users to share short posts, upload images, interact through likes and retweets, follow other users, and manage their profiles. The project is designed as a portfolio-grade application showcasing modern frontend architecture, state management, form validation, and API integration.

---

## Features

### Authentication & User Management
- User registration and login
- Session-based authentication (cookies)
- Guest access with limited functionality
- Logout support
- Profile editing (avatar, name, bio)
- Follow and unfollow users

### Posts
- Create text posts with optional image uploads
- Infinite scrolling feed
- Individual post view
- Like and unlike posts
- Retweet and undo retweets

### Comments
- Comment on posts
- Paginated/infinite comment loading
- Form validation with user feedback

### Profiles
- View own profile
- View other users’ profiles
- Follow status awareness
- User statistics (followers/following)
- User-specific post feeds

### UI & UX
- Responsive layout
- Skeleton loaders for better perceived performance
- Dark and light theme support (persisted in localStorage)
- Accessible dialogs and dropdowns

---

## Tech Stack

### Core
- React
- TypeScript
- Vite

### Routing
- React Router

### State & Data Fetching
- TanStack Query (React Query)
- Infinite queries for feeds and comments
- Optimistic UI updates for likes and retweets

### Forms & Validation
- React Hook Form
- Zod (schema-based validation)

### Styling
- Tailwind CSS
- Utility helpers (`clsx`, `tailwind-merge`)
- Component-driven UI (cards, dialogs, dropdowns, avatars)

### API & Networking
- Axios
- Centralized API client with credentials support

---

## Project Structure

src/
├── app.tsx # Application routes
├── main.tsx # App bootstrap and providers
├── lib/
│ ├── axiosApi.ts # Axios instance
│ ├── env.ts # Environment validation
│ ├── getUserObject.ts # Current user fetcher
│ ├── theme.ts # Theme utilities
│ ├── userQuery.ts # Shared user query config
│ └── utils.ts # Utility helpers
├── types.ts # Shared TypeScript interfaces
├── components/
│ ├── landing-page/
│ ├── edit-profile/
│ ├── home-page/
│ ├── navbar/
│ └── user-profile/

---

## Routing Overview

| Route | Description |
|------|-------------|
| `/` | Landing page |
| `/register` | User registration |
| `/login` | User login |
| `/home` | Main feed |
| `/post/:postId` | Individual post view |
| `/profile` | Logged-in user profile |
| `/profile/:userId` | Other user profile |

---

## Environment Variables

The application validates environment variables at startup using Zod.

Required variables:

 - VITE_SERVER_URL=<backend_url>
 - VITE_SERVER_PORT=<backend_port>



If validation fails, the application throws an error during initialization.

---

## Data Fetching Strategy

- Centralized user query with caching and stale time
- Infinite queries for posts and comments
- Manual cache updates for likes and retweets
- Query invalidation on mutations (posts, profile updates, follows)

---

## Theme Handling

- Dark and light themes supported
- Theme state persisted in `localStorage`
- Applied globally via the root HTML class

---

## Error Handling

- Client-side validation via Zod
- Server error feedback integrated into forms
- Disabled actions for unauthenticated users
- Graceful loading and empty states

---

## Purpose

This project is intended as a portfolio application demonstrating:
- Scalable React application structure
- Real-world data fetching patterns
- Form handling and validation
- State synchronization with a backend API
- Clean, maintainable TypeScript code

---

## License

This project is for educational and portfolio purposes.
