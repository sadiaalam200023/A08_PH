# StudioSpace – Creative Studio Booking Platform

StudioSpace is a web-based platform that connects creators with creative spaces. Users can explore and book studios for photography, music production, podcast recording, video shoots, and other creative projects. Studio owners can also list, manage, and update their available spaces.

## Live Demo

- **Frontend:** https://a08-ph.vercel.app/
- **Backend API:** https://a08-ph-server.vercel.app/

## Features

### Authentication
- User registration and login using Better Auth.
- Google authentication.
- Protected pages for authenticated users.
- User session management.
- Sign out functionality.

### Studio Discovery
- Browse all available creative studios.
- Filter studios by category:
  - Photo Studios
  - Sound Stages
  - Podcast Rooms
  - Music Suites
  - Art Workshops
- View featured studios on the homepage.
- View detailed studio information, including images, location, pricing, capacity, amenities, and host information.

### Studio Management
- Add new studio listings.
- View personal studio listings.
- Update existing studio information.
- Delete studio listings with confirmation.

### Booking Management
- Select a booking date and number of hours.
- Calculate rental costs and security deposits.
- Submit studio booking requests.
- View personal bookings.
- Track booking statuses:
  - Pending
  - Confirmed
  - Completed
  - Cancelled
- Cancel eligible pending bookings.

### User Interface
- Responsive design for different screen sizes.
- Consistent visual design and navigation.
- Toast notifications for user actions.
- Dedicated homepage sections explaining the booking process and host support.

## Technology Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- MongoDB Node.js Driver
- CORS

### Authentication
- Better Auth
- Google OAuth

### Deployment
- Vercel (Frontend)
- Vercel (Backend)
- MongoDB Atlas (Database)

## Project Architecture

StudioSpace uses a separate frontend and backend architecture.

| Component | Technology |
|---|---|
| Frontend | Next.js + TypeScript |
| Backend | Express.js |
| Database | MongoDB Atlas |
| Authentication | Better Auth |
| Frontend Hosting | Vercel |
| Backend Hosting | Vercel |

The frontend communicates with the Express backend through REST API endpoints. Studio and booking information is stored in MongoDB.

